describe('Tailwind Converter', () => {
  const cssToTailwind = (prop, value) => {
    const map = {
      'display: flex': 'flex',
      'display: block': 'block',
      'display: inline': 'inline',
      'display: none': 'hidden',
      'position: relative': 'relative',
      'position: absolute': 'absolute',
      'position: fixed': 'fixed',
      'text-align: center': 'text-center',
      'text-align: left': 'text-left',
      'text-align: right': 'text-right',
      'font-weight: bold': 'font-bold',
      'font-weight: 700': 'font-bold',
      'font-weight: 400': 'font-normal',
    };
    return map[`${prop}: ${value}`] || null;
  };

  test('should convert display: flex', () => {
    expect(cssToTailwind('display', 'flex')).toBe('flex');
  });

  test('should convert display: none to hidden', () => {
    expect(cssToTailwind('display', 'none')).toBe('hidden');
  });

  test('should convert position properties', () => {
    expect(cssToTailwind('position', 'relative')).toBe('relative');
    expect(cssToTailwind('position', 'absolute')).toBe('absolute');
  });

  test('should convert text-align', () => {
    expect(cssToTailwind('text-align', 'center')).toBe('text-center');
  });

  test('should convert font-weight', () => {
    expect(cssToTailwind('font-weight', 'bold')).toBe('font-bold');
    expect(cssToTailwind('font-weight', '700')).toBe('font-bold');
  });

  test('should return null for unknown properties', () => {
    expect(cssToTailwind('custom-prop', 'value')).toBeNull();
  });
});
