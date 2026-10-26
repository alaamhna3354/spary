(() => {
  const SCALE = parseFloat(getComputedStyle(document.documentElement)
    .getPropertyValue('--kufi-type-scale')) || 0.92;
  const roots = ['screen', 'dock', 'sheet']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const hasDirectText = el => Array.from(el.childNodes).some(node =>
    node.nodeType === Node.TEXT_NODE && node.textContent.trim()
  );

  function scaleText(root) {
    const elements = [root, ...root.querySelectorAll('*')].filter(el => {
      if (el.dataset.kufiScaled) return false;
      if (/^(SVG|PATH|USE|IMG)$/.test(el.tagName)) return false;
      return hasDirectText(el) || /^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName);
    });

    const sizes = elements.map(el => [el, parseFloat(getComputedStyle(el).fontSize)]);
    sizes.forEach(([el, size]) => {
      if (!Number.isFinite(size)) return;
      el.style.fontSize = `${(size * SCALE).toFixed(2)}px`;
      el.dataset.kufiScaled = 'true';
    });
  }

  function apply() {
    roots.forEach(scaleText);
  }

  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      apply();
    });
  };

  roots.forEach(root => new MutationObserver(schedule).observe(root, {
    childList: true,
    subtree: true
  }));

  apply();
})();
