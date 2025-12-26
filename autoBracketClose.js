/**
 * brackets-auto-closer
 */
function autoBracketClose(element, options = {}) {
  const pairs = options.pairs || {
    "(": ")",
    "{": "}",
    "[": "]",
    "'": "'",
    '"': '"'
  };

  element.addEventListener("keydown", function (e) {
    // empty pair deletion
    if (e.key === "Backspace") {
      const pos = element.selectionStart;
      const value = element.value;
      const prev = value[pos - 1];
      const next = value[pos];

      if (pairs[prev] === next) {
        e.preventDefault();
        element.value =
          value.slice(0, pos - 1) +
          value.slice(pos + 1);
        element.selectionStart = element.selectionEnd = pos - 1;
        return;
      }
    }
    // brackets auto close
    const open = e.key;
    const close = pairs[open];
    if (!close) return;

    e.preventDefault();

    const start = element.selectionStart;
    const end = element.selectionEnd;
    const value = element.value;

    element.value =
      value.slice(0, start) +
      open +
      close +
      value.slice(end);

    element.selectionStart = element.selectionEnd = start + 1;
  });
}
// global exposure
window.autoBracketClose = autoBracketClose;
