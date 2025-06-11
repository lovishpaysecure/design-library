'use strict';

var React = require('react');
var styled = require('styled-components');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var styled__default = /*#__PURE__*/_interopDefault(styled);

// src/components/Button/Button.tsx

// src/utils/mockTokenManager.ts
var TokenManager = class {
  constructor() {
    this.subscribers = /* @__PURE__ */ new Map();
    this.state = {
      components: {}
    };
  }
  static getInstance() {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }
  subscribe(componentType, callback) {
    if (!this.subscribers.has(componentType)) {
      this.subscribers.set(componentType, []);
    }
    this.subscribers.get(componentType)?.push(callback);
    return () => {
      const callbacks = this.subscribers.get(componentType);
      if (callbacks) {
        const index = callbacks.indexOf(callback);
        if (index > -1) {
          callbacks.splice(index, 1);
        }
      }
    };
  }
  preloadTokens(componentTypes) {
  }
};

// src/hooks/useTokens.ts
function useTokens(componentType, defaultTokens) {
  const [tokens, setTokens] = React.useState(defaultTokens);
  React.useEffect(() => {
    const manager = TokenManager.getInstance();
    const unsubscribe = manager.subscribe(componentType, (state) => {
      if (state.components[componentType]) {
        setTokens(state.components[componentType].value);
      }
    });
    manager.preloadTokens([componentType]);
    return unsubscribe;
  }, [componentType]);
  return tokens;
}

// src/components/Button/Button.tsx
var StyledButton = styled__default.default.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: inherit;
  font-weight: 500;
  transition: all 0.2s ease;
  width: ${(props) => props.$fullWidth ? "100%" : "auto"};
  padding: ${(props) => {
  switch (props.$size) {
    case "small":
      return "8px 16px";
    case "large":
      return "16px 24px";
    default:
      return "12px 20px";
  }
}};
  font-size: ${(props) => {
  switch (props.$size) {
    case "small":
      return "14px";
    case "large":
      return "18px";
    default:
      return "16px";
  }
}};

  ${(props) => {
  switch (props.$variant) {
    case "primary":
      return `
          background: #0066FF;
          color: #FFFFFF;
          &:hover:not(:disabled) {
            background: #0052CC;
          }
        `;
    case "secondary":
      return `
          background: #F5F5F5;
          color: #333333;
          &:hover:not(:disabled) {
            background: #E5E5E5;
          }
        `;
    case "tertiary":
      return `
          background: transparent;
          color: #0066FF;
          border: 1px solid #0066FF;
          &:hover:not(:disabled) {
            background: #F0F7FF;
          }
        `;
    case "ghost":
      return `
          background: transparent;
          color: #666666;
          &:hover:not(:disabled) {
            background: #F5F5F5;
          }
        `;
    default:
      return "";
  }
}}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
var Button = React__default.default.forwardRef(
  ({ variant = "primary", size = "medium", fullWidth, children, ...props }, ref) => {
    const buttonRef = React.useRef(null);
    const finalRef = ref || buttonRef;
    const tokens = useTokens("button", {
      variants: {
        primary: {
          background: "#0066FF",
          color: "#FFFFFF",
          hover: {
            background: "#0052CC"
          }
        },
        secondary: {
          background: "#F5F5F5",
          color: "#333333",
          hover: {
            background: "#E5E5E5"
          }
        },
        tertiary: {
          background: "transparent",
          color: "#0066FF",
          border: "1px solid",
          borderColor: "#0066FF",
          hover: {
            background: "#F0F7FF"
          }
        },
        ghost: {
          background: "transparent",
          color: "#666666",
          hover: {
            background: "#F5F5F5"
          }
        }
      },
      sizes: {
        small: {
          padding: "8px 16px",
          fontSize: "14px"
        },
        medium: {
          padding: "12px 20px",
          fontSize: "16px"
        },
        large: {
          padding: "16px 24px",
          fontSize: "18px"
        }
      }
    });
    React.useEffect(() => {
      if (!finalRef.current)
        return;
      const button = finalRef.current;
      const variantTokens = tokens.variants[variant];
      const sizeTokens = tokens.sizes[size];
      Object.entries(variantTokens).forEach(([prop, value]) => {
        if (prop === "hover")
          return;
        if (typeof value === "string") {
          button.style.setProperty(`--button-${prop}`, value);
        }
      });
      Object.entries(sizeTokens).forEach(([prop, value]) => {
        if (typeof value === "string") {
          button.style.setProperty(`--button-${prop}`, value);
        }
      });
      const hoverStyles = variantTokens.hover;
      const originalStyles = Object.entries(variantTokens).reduce((acc, [prop, value]) => {
        if (prop !== "hover" && typeof value === "string") {
          acc[prop] = value;
        }
        return acc;
      }, {});
      const handleMouseEnter = () => {
        Object.entries(hoverStyles).forEach(([prop, value]) => {
          if (typeof value === "string") {
            button.style.setProperty(`--button-${prop}`, value);
          }
        });
      };
      const handleMouseLeave = () => {
        Object.entries(originalStyles).forEach(([prop, value]) => {
          button.style.setProperty(`--button-${prop}`, value);
        });
      };
      button.addEventListener("mouseenter", handleMouseEnter);
      button.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        button.removeEventListener("mouseenter", handleMouseEnter);
        button.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, [variant, size, tokens, finalRef]);
    return /* @__PURE__ */ React__default.default.createElement(
      StyledButton,
      {
        ref: finalRef,
        $variant: variant,
        $size: size,
        $fullWidth: fullWidth,
        ...props
      },
      children
    );
  }
);

exports.Button = Button;
exports.useTokens = useTokens;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=chunk-LERGU4OD.cjs.map