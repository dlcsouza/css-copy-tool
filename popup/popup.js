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

  // Toggle inspector
  toggleBtn.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    chrome.storage.local.get(['isActive'], (result) => {
      const newState = !result.isActive;
      
      chrome.storage.local.set({ isActive: newState });
      
      chrome.tabs.sendMessage(tab.id, { 
        action: newState ? 'activate' : 'deactivate' 
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
