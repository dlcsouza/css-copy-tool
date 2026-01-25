// Background service worker for CSS Copy Tool

chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-inspector') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'toggle' });
      }
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'copyToClipboard') {
    // Handle clipboard operations if needed
    sendResponse({ success: true });
  }
});
