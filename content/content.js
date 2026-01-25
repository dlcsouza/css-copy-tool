// CSS Copy Tool - Content Script

(function() {
  'use strict';

  let isActive = false;
  let currentElement = null;
  let overlay = null;
  let settings = {
    format: 'css',
    properties: ['colors', 'typography', 'spacing', 'borders', 'layout', 'effects']
  };

  // Property categories
  const PROPERTY_CATEGORIES = {
    colors: {
      title: 'Colors & Backgrounds',
      props: ['color', 'background-color', 'background-image', 'background']
    },
    typography: {
      title: 'Typography',
      props: ['font-family', 'font-size', 'font-weight', 'font-style', 'line-height', 'letter-spacing', 'text-align', 'text-decoration', 'text-transform']
    },
    spacing: {
      title: 'Spacing',
      props: ['margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left', 'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left']
    },
    borders: {
      title: 'Borders & Radius',
      props: ['border', 'border-width', 'border-style', 'border-color', 'border-radius', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius']
    },
    layout: {
      title: 'Layout',
      props: ['display', 'position', 'top', 'right', 'bottom', 'left', 'width', 'height', 'max-width', 'max-height', 'min-width', 'min-height', 'flex', 'flex-direction', 'justify-content', 'align-items', 'gap', 'grid-template-columns', 'grid-template-rows']
    },
    effects: {
      title: 'Effects',
      props: ['box-shadow', 'text-shadow', 'opacity', 'transform', 'transition', 'filter', 'backdrop-filter']
    }
  };

  // Tailwind mapping (simplified)
  const TAILWIND_MAP = {
    'display': { 'flex': 'flex', 'block': 'block', 'inline': 'inline', 'inline-block': 'inline-block', 'grid': 'grid', 'none': 'hidden' },
    'position': { 'relative': 'relative', 'absolute': 'absolute', 'fixed': 'fixed', 'sticky': 'sticky' },
    'text-align': { 'left': 'text-left', 'center': 'text-center', 'right': 'text-right', 'justify': 'text-justify' },
    'font-weight': { '100': 'font-thin', '200': 'font-extralight', '300': 'font-light', '400': 'font-normal', '500': 'font-medium', '600': 'font-semibold', '700': 'font-bold', '800': 'font-extrabold', '900': 'font-black' },
    'flex-direction': { 'row': 'flex-row', 'column': 'flex-col', 'row-reverse': 'flex-row-reverse', 'column-reverse': 'flex-col-reverse' },
    'justify-content': { 'flex-start': 'justify-start', 'center': 'justify-center', 'flex-end': 'justify-end', 'space-between': 'justify-between', 'space-around': 'justify-around', 'space-evenly': 'justify-evenly' },
    'align-items': { 'flex-start': 'items-start', 'center': 'items-center', 'flex-end': 'items-end', 'stretch': 'items-stretch', 'baseline': 'items-baseline' }
  };

  // Load settings
  function loadSettings() {
    chrome.storage.local.get(['format', 'properties'], (result) => {
      if (result.format) settings.format = result.format;
      if (result.properties) settings.properties = result.properties;
    });
  }

  // Initialize
  function init() {
    loadSettings();
    
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      switch (request.action) {
        case 'activate':
          activate();
          break;
        case 'deactivate':
          deactivate();
          break;
        case 'toggle':
          isActive ? deactivate() : activate();
          break;
        case 'updateSettings':
          loadSettings();
          break;
      }
      sendResponse({ success: true });
    });
  }

  // Activate inspector
  function activate() {
    if (isActive) return;
    isActive = true;
    
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('click', handleClick, true);
    document.addEventListener('keydown', handleKeyDown);
    
    showToast('CSS Inspector activated - Click any element');
  }

  // Deactivate inspector
  function deactivate() {
    if (!isActive) return;
    isActive = false;
    
    document.removeEventListener('mouseover', handleMouseOver);
    document.removeEventListener('mouseout', handleMouseOut);
    document.removeEventListener('click', handleClick, true);
    document.removeEventListener('keydown', handleKeyDown);
    
    if (currentElement) {
      currentElement.classList.remove('css-copy-tool-highlight');
      currentElement = null;
    }
    
    removeOverlay();
    showToast('CSS Inspector deactivated');
  }

  // Handle mouse over
  function handleMouseOver(e) {
    if (!isActive) return;
    if (e.target.closest('.css-copy-tool-overlay')) return;
    
    if (currentElement) {
      currentElement.classList.remove('css-copy-tool-highlight');
    }
    
    currentElement = e.target;
    currentElement.classList.add('css-copy-tool-highlight');
  }

  // Handle mouse out
  function handleMouseOut(e) {
    if (!isActive) return;
    if (e.target.closest('.css-copy-tool-overlay')) return;
    
    if (currentElement && !e.relatedTarget?.closest('.css-copy-tool-overlay')) {
      // Keep highlight until clicking elsewhere
    }
  }

  // Handle click
  function handleClick(e) {
    if (!isActive) return;
    if (e.target.closest('.css-copy-tool-overlay')) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    if (currentElement) {
      showOverlay(currentElement);
    }
  }

  // Handle keyboard
  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      deactivate();
      chrome.storage.local.set({ isActive: false });
    }
  }

  // Get computed styles
  function getComputedStyles(element) {
    const computed = window.getComputedStyle(element);
    const styles = {};
    
    settings.properties.forEach(category => {
      if (PROPERTY_CATEGORIES[category]) {
        const cat = PROPERTY_CATEGORIES[category];
        styles[category] = {
          title: cat.title,
          props: {}
        };
        
        cat.props.forEach(prop => {
          const value = computed.getPropertyValue(prop);
          if (value && value !== 'none' && value !== 'normal' && value !== 'auto' && value !== '0px' && value !== 'rgba(0, 0, 0, 0)') {
            styles[category].props[prop] = value;
          }
        });
        
        // Remove empty categories
        if (Object.keys(styles[category].props).length === 0) {
          delete styles[category];
        }
      }
    });
    
    return styles;
  }

  // Convert to CSS string
  function toCSS(styles, selector = '.element') {
    let css = `${selector} {\n`;
    
    Object.values(styles).forEach(category => {
      Object.entries(category.props).forEach(([prop, value]) => {
        css += `  ${prop}: ${value};\n`;
      });
    });
    
    css += '}';
    return css;
  }

  // Convert to Tailwind classes
  function toTailwind(styles) {
    const classes = [];
    
    Object.values(styles).forEach(category => {
      Object.entries(category.props).forEach(([prop, value]) => {
        if (TAILWIND_MAP[prop] && TAILWIND_MAP[prop][value]) {
          classes.push(TAILWIND_MAP[prop][value]);
        } else {
          // Add arbitrary value syntax
          const propName = prop.replace(/-([a-z])/g, g => g[1].toUpperCase());
          classes.push(`[${prop}:${value.replace(/\s+/g, '_')}]`);
        }
      });
    });
    
    return classes.join(' ');
  }

  // Convert to inline styles
  function toInline(styles) {
    let inline = '';
    
    Object.values(styles).forEach(category => {
      Object.entries(category.props).forEach(([prop, value]) => {
        inline += `${prop}: ${value}; `;
      });
    });
    
    return inline.trim();
  }

  // Show overlay
  function showOverlay(element) {
    removeOverlay();
    
    const styles = getComputedStyles(element);
    const rect = element.getBoundingClientRect();
    
    overlay = document.createElement('div');
    overlay.className = 'css-copy-tool-overlay';
    
    // Position overlay
    let top = rect.bottom + 10;
    let left = rect.left;
    
    if (top + 400 > window.innerHeight) {
      top = rect.top - 410;
    }
    if (left + 400 > window.innerWidth) {
      left = window.innerWidth - 410;
    }
    if (top < 10) top = 10;
    if (left < 10) left = 10;
    
    overlay.style.top = `${top}px`;
    overlay.style.left = `${left}px`;
    
    // Build content
    const tagName = element.tagName.toLowerCase();
    const className = element.className && typeof element.className === 'string' 
      ? `.${element.className.split(' ')[0]}` 
      : '';
    const id = element.id ? `#${element.id}` : '';
    
    let html = `
      <div class="css-copy-tool-header">
        <h4>CSS Properties</h4>
        <span class="css-copy-tool-element-info">${tagName}${id}${className}</span>
      </div>
      <div class="css-copy-tool-content">
    `;
    
    Object.entries(styles).forEach(([key, category]) => {
      html += `
        <div class="css-copy-tool-section">
          <div class="css-copy-tool-section-title">${category.title}</div>
      `;
      
      Object.entries(category.props).forEach(([prop, value]) => {
        const isColor = prop.includes('color') || prop === 'background';
        const colorPreview = isColor && value.match(/^(#|rgb|hsl)/) 
          ? `<span class="css-copy-tool-color-preview" style="background: ${value}"></span>` 
          : '';
        
        html += `
          <div class="css-copy-tool-property" data-prop="${prop}" data-value="${value}">
            <span class="css-copy-tool-prop-name">${prop}</span>
            <span class="css-copy-tool-prop-value">${colorPreview}${value}</span>
          </div>
        `;
      });
      
      html += '</div>';
    });
    
    html += `
      </div>
      <div class="css-copy-tool-actions">
        <button class="css-copy-tool-btn css-copy-tool-btn-secondary" data-action="copy-single">
          Copy Selected
        </button>
        <button class="css-copy-tool-btn css-copy-tool-btn-primary" data-action="copy-all">
          Copy All
        </button>
      </div>
    `;
    
    overlay.innerHTML = html;
    document.body.appendChild(overlay);
    
    // Event listeners for overlay
    let selectedProps = new Set();
    
    overlay.querySelectorAll('.css-copy-tool-property').forEach(el => {
      el.addEventListener('click', () => {
        el.classList.toggle('selected');
        const prop = el.dataset.prop;
        const value = el.dataset.value;
        
        if (selectedProps.has(prop)) {
          selectedProps.delete(prop);
        } else {
          selectedProps.set(prop, value);
        }
      });
    });
    
    overlay.querySelector('[data-action="copy-all"]').addEventListener('click', () => {
      let output;
      switch (settings.format) {
        case 'tailwind':
          output = toTailwind(styles);
          break;
        case 'inline':
          output = toInline(styles);
          break;
        default:
          output = toCSS(styles);
      }
      copyToClipboard(output);
    });
    
    overlay.querySelector('[data-action="copy-single"]').addEventListener('click', () => {
      if (selectedProps.size === 0) {
        showToast('Select properties first');
        return;
      }
      
      const selected = {};
      selected.custom = { title: 'Selected', props: Object.fromEntries(selectedProps) };
      
      let output;
      switch (settings.format) {
        case 'tailwind':
          output = toTailwind(selected);
          break;
        case 'inline':
          output = toInline(selected);
          break;
        default:
          output = toCSS(selected);
      }
      copyToClipboard(output);
    });
  }

  // Remove overlay
  function removeOverlay() {
    if (overlay) {
      overlay.remove();
      overlay = null;
    }
  }

  // Copy to clipboard
  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      showToast('Copied to clipboard!');
    } catch (err) {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showToast('Copied to clipboard!');
    }
  }

  // Show toast notification
  function showToast(message) {
    const existing = document.querySelector('.css-copy-tool-toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = 'css-copy-tool-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('hiding');
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }

  // Initialize
  init();
})();
