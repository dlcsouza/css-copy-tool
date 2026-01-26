describe('CSS Extractor', () => {
  let element;

  beforeEach(() => {
    document.body.innerHTML = '<div id="test" style="color: red; font-size: 16px; padding: 10px;"></div>';
    element = document.getElementById('test');
  });

  test('should get computed styles from element', () => {
    const styles = window.getComputedStyle(element);
    expect(styles).toBeDefined();
    expect(styles.color).toBeDefined();
  });

  test('should extract color property', () => {
    const styles = window.getComputedStyle(element);
    expect(styles.color).toBeTruthy();
  });

  test('should extract font-size property', () => {
    const styles = window.getComputedStyle(element);
    expect(styles.fontSize).toBe('16px');
  });

  test('should extract padding property', () => {
    const styles = window.getComputedStyle(element);
    expect(styles.padding).toBe('10px');
  });
});

describe('CSS Formatter', () => {
  test('should format as CSS block', () => {
    const props = { color: 'red', fontSize: '16px' };
    const css = Object.entries(props)
      .map(([k, v]) => '  ' + k.replace(/([A-Z])/g, '-$1').toLowerCase() + ': ' + v + ';')
      .join('\n');
    
    expect(css).toContain('color: red;');
    expect(css).toContain('font-size: 16px;');
  });

  test('should format as inline style', () => {
    const props = { color: 'red', fontSize: '16px' };
    const inline = Object.entries(props)
      .map(([k, v]) => k.replace(/([A-Z])/g, '-$1').toLowerCase() + ': ' + v)
      .join('; ');
    
    expect(inline).toBe('color: red; font-size: 16px');
  });
});
