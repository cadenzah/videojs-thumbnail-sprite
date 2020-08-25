function applyStyle(parent: HTMLElement, style: any) {
  const keys = Object.keys(style);
  keys.map((key) => {
    const value = style[key];

    if (value !== '')
      parent.style.setProperty(key, value);
    else // remove preiously set style which is not included this time
      parent.style.removeProperty(key);
  })
}

export default applyStyle;
