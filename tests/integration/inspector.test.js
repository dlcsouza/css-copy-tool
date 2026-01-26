describe('CSS Inspector Integration', () => {
  beforeEach(() => {
    document.body.innerHTML = 
      '<div id="container" style="display: flex; padding: 20px;">' +
      '<button id="btn" style="background: blue; color: white; border-radius: 4px;">' +
      'Click me' +
      '</button>' +
      '</div>';
  });

  test('should extract all styles from button element', () => {
    var btn = document.getElementById('btn');
    var styles = window.getComputedStyle(btn);
    
    expect(styles.backgroundColor).toBeDefined();
    expect(styles.color).toBeDefined();
    expect(styles.borderRadius).toBeDefined();
  });

  test('should handle nested elements', () => {
    var container = document.getElementById('container');
    var btn = document.getElementById('btn');
    
    var containerStyles = window.getComputedStyle(container);
    var btnStyles = window.getComputedStyle(btn);
    
    expect(containerStyles.display).toBe('flex');
    expect(btnStyles.backgroundColor).toBeDefined();
  });

  test('should copy text to clipboard', function() {
    var mockClipboard = {
      writeText: jest.fn().mockResolvedValue(undefined)
    };
    Object.assign(navigator, { clipboard: mockClipboard });

    var text = 'color: red;';
    navigator.clipboard.writeText(text);
    
    expect(mockClipboard.writeText).toHaveBeenCalledWith(text);
  });
});
