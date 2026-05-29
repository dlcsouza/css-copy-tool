// Popup script for CSS Copy Tool

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggleBtn');
  const formatRadios = document.querySelectorAll('input[name="format"]');
  const propCheckboxes = document.querySelectorAll('input[name="props"]');

  // Load saved settings
  chrome.storage.local.get(['isActive', 'format', 'properties'], (result) => {
    if (result.isActive) {
      toggleBtn.classList.add('active');
      toggleBtn.querySelector('.text').textContent = 'Deactivate Inspector';
    }

    if (result.format) {
      const radio = document.querySelector(`input[value="${result.format}"]`);
      if (radio) radio.checked = true;
    }

    if (result.properties) {
      propCheckboxes.forEach((cb) => {
        cb.checked = result.properties.includes(cb.value);
      });
    }
  });

  // Função para injetar o content script via scripting API (fallback)
  async function ensureContentScript(tabId) {
    try {
      await chrome.scripting.executeScript({
        target: { tabId },
        files: ['content/content.js']
      });
      await chrome.scripting.insertCSS({
        target: { tabId },
        files: ['content/content.css']
      });
    } catch (e) {
      // Script já injetado, ignorar erro
    }
  }

  // Toggle inspector
  toggleBtn.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) return;
    
    chrome.storage.local.get(['isActive'], async (result) => {
      const newState = !result.isActive;
      
      chrome.storage.local.set({ isActive: newState });

      // Primeiro garante que o content script está injetado
      await ensureContentScript(tab.id);
      
      // Tenta enviar a mensagem
      chrome.tabs.sendMessage(tab.id, { 
        action: newState ? 'activate' : 'deactivate' 
      }, (response) => {
        if (chrome.runtime.lastError) {
          console.warn('Content script não respondeu, injetando novamente...');
          // Último recurso: injeta um script que dispara um evento customizado
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (action) => {
              window.dispatchEvent(new CustomEvent('css-copy-tool-toggle', { detail: { action } }));
            },
            args: [newState ? 'activate' : 'deactivate']
          });
        }
      });

      if (newState) {
        toggleBtn.classList.add('active');
        toggleBtn.querySelector('.text').textContent = 'Deactivate Inspector';
      } else {
        toggleBtn.classList.remove('active');
        toggleBtn.querySelector('.text').textContent = 'Activate Inspector';
      }
    });
  });

  // Save format preference
  formatRadios.forEach((radio) => {
    radio.addEventListener('change', (e) => {
      chrome.storage.local.set({ format: e.target.value });
      notifyContentScript();
    });
  });

  // Save property preferences
  propCheckboxes.forEach((cb) => {
    cb.addEventListener('change', () => {
      const selectedProps = Array.from(propCheckboxes)
        .filter((c) => c.checked)
        .map((c) => c.value);
      
      chrome.storage.local.set({ properties: selectedProps });
      notifyContentScript();
    });
  });

  function notifyContentScript() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'updateSettings' });
      }
    });
  }
});
