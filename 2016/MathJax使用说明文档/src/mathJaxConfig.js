
// MathJax 配置信息

window.MathJax = {
  showProcessingMessages: false,
  messageStyle: "none",
  tex2jax: {
    inlineMath: [['$', '$'], ["\\(", "\\)"]],
    processEscapes: true
  },
  "fast-preview": {disabled: true},
  CommonHTML: { linebreaks: { automatic: true } },
  "HTML-CSS": { linebreaks: { automatic: true } //This controls the automatic breaking of expressions:
                          // when false, only linebreak="newline" is processed;
                          // when true, line breaks are inserted automatically in long expressions.
    ,extensions: ["handle-floats.js"] // cause equation numbers to overlap the floating content. To avoid this
},
  SVG: { linebreaks: { automatic: true } },
  TeX: { noErrors: { disabled: true } },
  MathMenu: {
    styles: {
      ".MathJax_Menu": {"z-index":2001}
    }
  },
  AuthorInit: function () {
    MathJax.Hub.Register.StartupHook("MathMenu Ready",function () {MathJax.Menu.BGSTYLE["z-index"] = 2000;});
    MathJax.Hub.processSectionDelay = 0;
  }
}
