'use strict';

var chunk3BMWW4FX_cjs = require('./chunk-3BMWW4FX.cjs');
var chunk3Z33FTZD_cjs = require('./chunk-3Z33FTZD.cjs');
var React = require('react');
var tokens = require('@paysecure-design/tokens');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

var ThemeProvider = ({ tokenUrl, children }) => {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    async function fetchTokens() {
      try {
        const response = await fetch(tokenUrl);
        if (!response.ok)
          throw new Error("Failed to fetch tokens");
        const tokens$1 = await response.json();
        await tokens.TokenManager.getInstance().processTokens(tokens$1);
      } catch (e) {
        console.warn("Token fetch failed, using defaults.", e);
      } finally {
        setLoading(false);
      }
    }
    fetchTokens();
  }, [tokenUrl]);
  if (loading)
    return null;
  return /* @__PURE__ */ React__default.default.createElement(React__default.default.Fragment, null, children);
};

Object.defineProperty(exports, 'Button', {
  enumerable: true,
  get: function () { return chunk3BMWW4FX_cjs.Button; }
});
Object.defineProperty(exports, 'useTokens', {
  enumerable: true,
  get: function () { return chunk3BMWW4FX_cjs.useTokens; }
});
Object.defineProperty(exports, 'Typography', {
  enumerable: true,
  get: function () { return chunk3Z33FTZD_cjs.Typography; }
});
exports.ThemeProvider = ThemeProvider;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.cjs.map