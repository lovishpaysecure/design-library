export { Button, useTokens } from './chunk-CM26Q5CI.js';
export { Typography } from './chunk-7G77ZRSR.js';
import React, { useState, useEffect } from 'react';
import { TokenManager } from '@design-system/tokens';

var ThemeProvider = ({ tokenUrl, children }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchTokens() {
      try {
        const response = await fetch(tokenUrl);
        if (!response.ok)
          throw new Error("Failed to fetch tokens");
        const tokens = await response.json();
        await TokenManager.getInstance().processTokens(tokens);
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
  return /* @__PURE__ */ React.createElement(React.Fragment, null, children);
};

export { ThemeProvider };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map