function applyStyle(parent: HTMLElement, style: any): void {
  const keys = Object.keys(style);
  keys.map((key) => {
    const value = style[key];

    if (value !== '')
      parent.style.setProperty(key, value);
    else // If key's value is empty, remove that style
      parent.style.removeProperty(key);
  })
}

export default applyStyle;
