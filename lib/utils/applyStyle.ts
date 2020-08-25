function applyStyle(parent: HTMLElement, obj: any) {
  const keys = Object.keys(obj);
  keys.map((key) => {
    const value = obj[key];
    const tooltipStyle = parent.style;

    if (value !== '')
      tooltipStyle.setProperty(key, value);
    else
      tooltipStyle.removeProperty(key);
  })
}

export default applyStyle;
