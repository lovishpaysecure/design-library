'use strict';

var chunkDSVJBX5L_cjs = require('./chunk-DSVJBX5L.cjs');
var chunkQCVPZXSW_cjs = require('./chunk-QCVPZXSW.cjs');
var React4 = require('react');
var reactFontawesome = require('@fortawesome/react-fontawesome');
var freeSolidSvgIcons = require('@fortawesome/free-solid-svg-icons');
var styled4 = require('styled-components');
var dateFns = require('date-fns');
var tokens = require('@paysecure-design/tokens');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React4__default = /*#__PURE__*/_interopDefault(React4);
var styled4__default = /*#__PURE__*/_interopDefault(styled4);

var SidebarContainer = styled4__default.default.div`
  width: ${({ $collapsed, tokens }) => $collapsed ? tokens.collapsedWidth : tokens.width};
  background: ${({ tokens }) => tokens.background};
  border-right: 1px solid ${({ tokens }) => tokens.borderColor};
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  box-shadow: ${({ tokens }) => tokens.boxShadow};
`;
var SidebarHeader = styled4__default.default.div`
  height: ${({ tokens }) => tokens.headerHeight};
  display: flex;
  align-items: center;
  position: relative;
  background: ${({ tokens }) => tokens.headerBg};
`;
var LogoContainer = styled4__default.default.div`
  height: ${({ tokens }) => tokens.headerHeight};
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${({ $collapsed, tokens }) => $collapsed ? tokens.logoPaddingCollapsed : tokens.logoPadding};
  transition: all 0.3s ease;
  overflow: hidden;
  justify-content: ${({ $collapsed, tokens }) => $collapsed ? tokens.logoJustifyCollapsed : tokens.logoJustify};
`;
var ToggleSidebarButton = styled4__default.default.button`
  width: 28px;
  height: 28px;
  position: absolute;
  right: -12px;
  top: 60%;
  transform: translateY(-50%);
  background: ${({ tokens }) => tokens.toggleBg};
  border: 1px solid ${({ tokens }) => tokens.toggleBorder};
  border-radius: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ tokens }) => tokens.toggleColor};
  z-index: 1001;
  box-shadow: ${({ tokens }) => tokens.toggleBoxShadow};
  transition: all 0.2s ease;
  padding: 0;
`;
var SidebarContent = styled4__default.default.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0;
  display: flex;
  flex-direction: column;
  scrollbar-width: thin;
  scrollbar-color: #ddd transparent;
`;

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
function useTokens(componentType, defaultTokens4) {
  const [tokens, setTokens] = React4.useState(defaultTokens4);
  React4.useEffect(() => {
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

// src/components/Sidebar/Sidebar.tsx
var defaultTokens = {
  sidebar: {
    width: "250px",
    collapsedWidth: "80px",
    background: "#fff",
    borderColor: "#eee",
    boxShadow: "2px 0 4px rgba(0,0,0,0.05)",
    headerHeight: "64px",
    headerBg: "#fff",
    logoPadding: "0 20px",
    logoPaddingCollapsed: "0 10px",
    logoJustify: "flex-start",
    logoJustifyCollapsed: "center",
    toggleBg: "#fff",
    toggleBorder: "#eee",
    toggleColor: "#666",
    toggleBoxShadow: "0 2px 4px rgba(0,0,0,0.1)"
  }
};
var SearchBar = ({ isCollapsed, value, onChange, onFocus, onExpandClick }) => /* @__PURE__ */ React4__default.default.createElement("div", { style: {
  padding: "20px 20px",
  background: "#fff",
  position: "sticky",
  top: 0,
  zIndex: 2,
  display: "flex",
  alignItems: "center",
  height: 36
} }, /* @__PURE__ */ React4__default.default.createElement("div", { style: { position: "relative", width: "100%", display: "flex", alignItems: "center" } }, isCollapsed ? /* @__PURE__ */ React4__default.default.createElement(
  "button",
  {
    style: { width: 36, height: 36, border: "1px solid #eee", borderRadius: "20%", background: "#fff", color: "#666", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" },
    onClick: onExpandClick,
    type: "button",
    "aria-label": "Expand search"
  },
  /* @__PURE__ */ React4__default.default.createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faSearch })
) : /* @__PURE__ */ React4__default.default.createElement("div", { style: { position: "relative", width: "100%", display: "flex", alignItems: "center", height: 48 } }, /* @__PURE__ */ React4__default.default.createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faSearch, style: { position: "absolute", left: 12, color: "#666", fontSize: 14, pointerEvents: "none", top: "50%", transform: "translateY(-50%)" } }), /* @__PURE__ */ React4__default.default.createElement(
  "input",
  {
    type: "text",
    placeholder: "Search...",
    style: { width: "100%", height: 36, padding: "8px 12px 8px 36px", border: "1px solid #eee", borderRadius: 25, fontSize: 14, marginLeft: 0 },
    value,
    onChange: (e) => onChange(e.target.value),
    onFocus
  }
))));
var NavigationItem = ({ item, isCollapsed, activeSubmenu, onSubmenuClick }) => {
  const isSubmenuOpen = activeSubmenu === item.label;
  if (item.header) {
    return !isCollapsed ? /* @__PURE__ */ React4__default.default.createElement("div", { style: { padding: "12px 20px", marginTop: "10px" } }, /* @__PURE__ */ React4__default.default.createElement(chunkQCVPZXSW_cjs.Typography, { variant: "caption", weight: "semibold", style: { color: "#666", textTransform: "uppercase" } }, item.label)) : null;
  }
  return /* @__PURE__ */ React4__default.default.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ React4__default.default.createElement(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
        padding: isCollapsed ? 12 : "12px 12px",
        color: isSubmenuOpen || item.active ? "#5022bd" : "#666",
        cursor: "pointer",
        transition: "all 0.3s ease",
        position: "relative",
        whiteSpace: "nowrap",
        marginBottom: 4,
        background: isSubmenuOpen || item.active ? "#efefef" : void 0,
        borderRadius: isSubmenuOpen || item.active ? 10 : void 0,
        justifyContent: isCollapsed ? "center" : void 0
      },
      onClick: () => item.submenu && onSubmenuClick(item.label)
    },
    item.icon && /* @__PURE__ */ React4__default.default.createElement("span", { style: { display: "flex", alignItems: "center", marginRight: isCollapsed ? 0 : 8 } }, item.icon),
    !isCollapsed && /* @__PURE__ */ React4__default.default.createElement(chunkQCVPZXSW_cjs.Typography, { variant: "body2", weight: "semibold", style: { flex: 1, marginRight: 10, color: "inherit" } }, item.label),
    !isCollapsed && item.submenu && /* @__PURE__ */ React4__default.default.createElement(
      reactFontawesome.FontAwesomeIcon,
      {
        icon: isSubmenuOpen ? freeSolidSvgIcons.faChevronDown : freeSolidSvgIcons.faChevronRight,
        style: { marginLeft: "auto", fontSize: 12, transition: "transform 0.3s ease", transform: isSubmenuOpen ? "rotate(180deg)" : void 0 }
      }
    )
  ), !isCollapsed && item.submenu && isSubmenuOpen && /* @__PURE__ */ React4__default.default.createElement("div", { style: { borderRadius: "0 0 10px 10px", marginBottom: 4, overflow: "hidden" } }, item.submenu.map((subItem, index) => /* @__PURE__ */ React4__default.default.createElement("div", { key: index, style: { display: "flex", alignItems: "center", padding: "10px 12px 10px 40px", color: "#666", cursor: "pointer", transition: "all 0.3s ease" } }, subItem.icon && /* @__PURE__ */ React4__default.default.createElement("span", { style: { display: "flex", alignItems: "center", marginRight: 8, opacity: 0.8 } }, subItem.icon), /* @__PURE__ */ React4__default.default.createElement(chunkQCVPZXSW_cjs.Typography, { variant: "body2", style: { color: "inherit" } }, subItem.label)))));
};
var Sidebar = ({ menuItems, logo, collapsed, onToggleCollapse, onMenuClick, tokens: tokensProp }) => {
  const [searchValue, setSearchValue] = React4.useState("");
  const [activeSubmenu, setActiveSubmenu] = React4.useState(null);
  const tokens = useTokens("sidebar", defaultTokens);
  const mergedTokens = tokensProp || tokens;
  const handleSearchFocus = () => {
    if (collapsed) {
      onToggleCollapse();
    }
  };
  const handleSubmenuClick = (label) => {
    setActiveSubmenu(activeSubmenu === label ? null : label);
  };
  const filterMenuItems = (items) => {
    const q = searchValue.trim().toLowerCase();
    if (!q)
      return items;
    const filtered = [];
    let lastHeader = null;
    for (const item of items) {
      if (item.header) {
        lastHeader = item;
        continue;
      }
      const labelMatch = item.label.toLowerCase().includes(q);
      if (item.submenu) {
        const anySubMatch = item.submenu.some((sub) => sub.label.toLowerCase().includes(q));
        if (labelMatch || anySubMatch) {
          if (lastHeader) {
            filtered.push(lastHeader);
            lastHeader = null;
          }
          filtered.push({ ...item, submenu: item.submenu });
        }
      } else {
        if (labelMatch) {
          if (lastHeader) {
            filtered.push(lastHeader);
            lastHeader = null;
          }
          filtered.push(item);
        }
      }
    }
    return filtered;
  };
  const filteredMenuItems = filterMenuItems(menuItems);
  return /* @__PURE__ */ React4__default.default.createElement(SidebarContainer, { $collapsed: collapsed, tokens: mergedTokens.sidebar }, /* @__PURE__ */ React4__default.default.createElement(SidebarHeader, { tokens: mergedTokens.sidebar }, /* @__PURE__ */ React4__default.default.createElement(LogoContainer, { $collapsed: collapsed, tokens: mergedTokens.sidebar }, logo), /* @__PURE__ */ React4__default.default.createElement(
    ToggleSidebarButton,
    {
      onClick: onToggleCollapse,
      type: "button",
      "aria-label": collapsed ? "Expand sidebar" : "Collapse sidebar",
      tokens: mergedTokens.sidebar
    },
    /* @__PURE__ */ React4__default.default.createElement(reactFontawesome.FontAwesomeIcon, { icon: collapsed ? freeSolidSvgIcons.faChevronRight : freeSolidSvgIcons.faChevronLeft })
  )), /* @__PURE__ */ React4__default.default.createElement(SidebarContent, null, /* @__PURE__ */ React4__default.default.createElement(
    SearchBar,
    {
      isCollapsed: collapsed,
      value: searchValue,
      onChange: setSearchValue,
      onFocus: handleSearchFocus,
      onExpandClick: onToggleCollapse
    }
  ), /* @__PURE__ */ React4__default.default.createElement("nav", { style: { padding: "0px 20px 20px 20px", flex: 1 } }, filteredMenuItems.map((item, index) => /* @__PURE__ */ React4__default.default.createElement(
    NavigationItem,
    {
      key: index,
      item,
      isCollapsed: collapsed,
      activeSubmenu,
      onSubmenuClick: handleSubmenuClick
    }
  )))));
};
var HeaderBar = styled4__default.default.div`
  height: ${({ tokens }) => tokens.height};
  width: 100%;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
var Actions = styled4__default.default.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
var UserMenuContainer = styled4__default.default.div`
  position: relative;
  display: flex;
  align-items: center;
`;
var UserButton = styled4__default.default.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 8px;
  background: ${({ tokens }) => tokens.userBg};
  cursor: pointer;
  transition: all 0.2s ease;
`;
var UserAvatar = styled4__default.default.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #eee;
  overflow: hidden;
  margin-right: 8px;
`;
var UserDetails = styled4__default.default.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
`;
var UserMenu = styled4__default.default.div`
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  min-width: 180px;
  background: #fff;
  box-shadow: 0 4px 24px rgba(0,0,0,0.12);
  border-radius: 12px;
  z-index: 1001;
  padding: 8px 0;
  display: flex;
  flex-direction: column;
`;
var UserMenuItem = styled4__default.default.button`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  background: none;
  border: none;
  color: ${({ tokens, gray }) => gray ? "#6B7280" : tokens.userMenuItemColor};
  font-weight: ${({ bold }) => bold ? 700 : 400};
  font-size: 15px;
  padding: 10px 20px;
  border-radius: 0;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  text-align: left;
  &:hover:not(:disabled) {
    background: ${({ tokens }) => tokens.userMenuItemHoverBg};
    color: ${({ tokens }) => tokens.userMenuItemHoverColor};
  }
  &:disabled {
    color: #bbb;
    cursor: not-allowed;
    background: none;
    font-weight: 400;
  }
`;
var Divider = styled4__default.default.div`
  height: 1px;
  background: #eee;
  margin: 4px 0 4px 0;
  width: 100%;
`;
var TooltipWrapper = styled4__default.default.div`
  position: relative;
  display: inline-block;
`;
var TooltipBubble = styled4__default.default.div`
  position: absolute;
  z-index: 1000;
  background: #fff;
  color: #5022bd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  padding: 8px 14px;
  ${({ linebreak, maxWidth }) => linebreak && maxWidth ? `max-width: ${maxWidth};` : ""}
  white-space: ${({ linebreak }) => linebreak ? "normal" : "nowrap"};
  overflow-wrap: break-word;
  display: inline-block;
  width: max-content;
  min-width: 40px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s;
  font-size: 14px;
  line-height: 1.4;
  left: 50%;
  transform: translateX(-50%);
  ${({ placement }) => placement === "top" && "bottom: 120%;"}
  ${({ placement }) => placement === "bottom" && `top: 120%; left: 0; right: 0; margin: auto; width: fit-content; transform: none;`}
  ${({ placement }) => placement === "left" && `
    right: 120%;
    left: auto;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 0;
  `}
  ${({ placement }) => placement === "right" && "left: 120%; top: 50%; transform: translateY(-50%);"}
  &.visible {
    opacity: 1;
    pointer-events: auto;
  }
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    ${({ placement }) => placement === "top" && `
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-width: 8px 8px 0 8px;
      border-color: #fff transparent transparent transparent;
    `}
    ${({ placement }) => placement === "bottom" && `
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-width: 0 8px 8px 8px;
      border-color: transparent transparent #fff transparent;
    `}
    ${({ placement }) => placement === "left" && `
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      border-width: 8px 0 8px 8px;
      border-color: transparent transparent transparent #fff;
    `}
    ${({ placement }) => placement === "right" && `
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      border-width: 8px 8px 8px 0;
      border-color: transparent #fff transparent transparent;
    `}
  }
  @media (max-width: 600px) {
    ${({ linebreak }) => linebreak ? "max-width: 95vw;" : ""}
    left: 50%;
    transform: translateX(-50%);
  }
`;
var Tooltip = ({
  content,
  children,
  placement = "top",
  delay = 100,
  maxWidth = "450px",
  linebreak = false
}) => {
  const [visible, setVisible] = React4.useState(false);
  const timeout = React4.useRef(null);
  const show = () => {
    timeout.current = setTimeout(() => setVisible(true), delay);
  };
  const hide = () => {
    if (timeout.current)
      clearTimeout(timeout.current);
    setVisible(false);
  };
  return /* @__PURE__ */ React4__default.default.createElement(TooltipWrapper, { onMouseEnter: show, onMouseLeave: hide }, children, /* @__PURE__ */ React4__default.default.createElement(
    TooltipBubble,
    {
      className: visible ? "visible" : "",
      placement,
      maxWidth: linebreak ? maxWidth : void 0,
      linebreak,
      role: "tooltip"
    },
    /* @__PURE__ */ React4__default.default.createElement(chunkQCVPZXSW_cjs.Typography, { variant: "body2", style: { color: "#5022bd" } }, content)
  ));
};

// src/components/Header/Header.tsx
var defaultTokens2 = {
  header: {
    height: "64px",
    background: "#fff",
    titleFontSize: "20px",
    titleFontWeight: 600,
    titleColor: "#333",
    userBg: "#f8f9fa",
    userRoleFontSize: "12px",
    userRoleColor: "#666",
    userMenuBoxShadow: "0 2px 8px rgba(0,0,0,0.12)",
    userMenuBg: "#fff",
    userMenuItemColor: "#5022bd",
    userMenuItemHoverBg: "#f5f5f5",
    userMenuItemHoverColor: "#333"
  }
};
var defaultMenuOptions = (onLogout) => [
  { label: "Profile", icon: /* @__PURE__ */ React4__default.default.createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faUser }), onClick: () => {
  }, disabled: true },
  { label: "My Messages", icon: /* @__PURE__ */ React4__default.default.createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faEnvelope }), onClick: () => {
  }, disabled: true },
  { label: "Change Password", icon: /* @__PURE__ */ React4__default.default.createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faKey }), onClick: () => {
  }, disabled: true },
  { label: "Logout", icon: /* @__PURE__ */ React4__default.default.createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faSignOutAlt }), onClick: onLogout }
];
var Header = ({ title, actions, user, tokens: tokensProp, onLogout, userMenuOptions, tooltipIcon, tooltipContent, tooltipPlacement }) => {
  const [menuOpen, setMenuOpen] = React4.useState(false);
  const userRef = React4.useRef(null);
  const tokens = useTokens("header", defaultTokens2);
  const mergedTokens = tokensProp || tokens;
  const menuOptions = userMenuOptions || defaultMenuOptions(onLogout);
  React4.useEffect(() => {
    if (!menuOpen)
      return;
    function handleClick(e) {
      if (userRef.current && !userRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);
  const renderActions = () => {
    if (!actions)
      return null;
    if (Array.isArray(actions)) {
      return actions.map((action, index) => /* @__PURE__ */ React4__default.default.createElement(
        "button",
        {
          key: index,
          onClick: action.onClick,
          disabled: action.disabled,
          style: {
            background: "none",
            border: "none",
            cursor: action.disabled ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 12px",
            borderRadius: "4px",
            color: mergedTokens.header.titleColor,
            opacity: action.disabled ? 0.6 : 1,
            transition: "background-color 0.2s"
          },
          onMouseEnter: (e) => {
            if (!action.disabled) {
              e.currentTarget.style.backgroundColor = "#f5f5f5";
            }
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }
        },
        action.icon,
        /* @__PURE__ */ React4__default.default.createElement(chunkQCVPZXSW_cjs.Typography, { variant: "body2" }, action.label)
      ));
    }
    return actions;
  };
  return /* @__PURE__ */ React4__default.default.createElement(HeaderBar, { tokens: mergedTokens.header }, /* @__PURE__ */ React4__default.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } }, tooltipIcon && tooltipContent && /* @__PURE__ */ React4__default.default.createElement(Tooltip, { content: tooltipContent, placement: tooltipPlacement }, tooltipIcon), title && (typeof title === "string" ? /* @__PURE__ */ React4__default.default.createElement(chunkQCVPZXSW_cjs.Typography, { variant: "h5", weight: "semibold", style: { color: mergedTokens.header.titleColor } }, title) : title)), /* @__PURE__ */ React4__default.default.createElement(Actions, null, renderActions && renderActions(), user && /* @__PURE__ */ React4__default.default.createElement(UserMenuContainer, { ref: userRef }, /* @__PURE__ */ React4__default.default.createElement(UserButton, { tokens: mergedTokens.header, onClick: () => setMenuOpen((open) => !open) }, /* @__PURE__ */ React4__default.default.createElement(UserAvatar, null, user.avatar), /* @__PURE__ */ React4__default.default.createElement(UserDetails, null, /* @__PURE__ */ React4__default.default.createElement(chunkQCVPZXSW_cjs.Typography, { variant: "body1", weight: "medium" }, user.name), user.role && /* @__PURE__ */ React4__default.default.createElement(chunkQCVPZXSW_cjs.Typography, { variant: "caption", style: { color: mergedTokens.header.userRoleColor } }, user.role)), /* @__PURE__ */ React4__default.default.createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faChevronDown, style: { marginLeft: 8, fontSize: 16 } })), menuOpen && /* @__PURE__ */ React4__default.default.createElement(UserMenu, { tokens: mergedTokens.header }, menuOptions.slice(0, -1).map((option, idx) => /* @__PURE__ */ React4__default.default.createElement(
    UserMenuItem,
    {
      key: option.label,
      tokens: mergedTokens.header,
      onClick: () => {
        setMenuOpen(false);
        if (!option.disabled && option.onClick)
          option.onClick();
      },
      disabled: option.disabled,
      gray: option.label === "Logout"
    },
    option.icon,
    /* @__PURE__ */ React4__default.default.createElement(chunkQCVPZXSW_cjs.Typography, { variant: "body2", style: { color: "inherit" } }, option.label)
  )), /* @__PURE__ */ React4__default.default.createElement(Divider, null), /* @__PURE__ */ React4__default.default.createElement(
    UserMenuItem,
    {
      key: menuOptions[menuOptions.length - 1].label,
      tokens: mergedTokens.header,
      onClick: () => {
        setMenuOpen(false);
        if (menuOptions[menuOptions.length - 1].onClick)
          menuOptions[menuOptions.length - 1].onClick();
      },
      disabled: menuOptions[menuOptions.length - 1].disabled,
      gray: true
    },
    menuOptions[menuOptions.length - 1].icon,
    /* @__PURE__ */ React4__default.default.createElement(chunkQCVPZXSW_cjs.Typography, { variant: "body2", style: { color: "inherit" } }, menuOptions[menuOptions.length - 1].label)
  )))));
};
var Header_default = Header;
var getTokenValue = (tokens, path, defaultValue = "") => {
  if (!tokens?.datePicker)
    return defaultValue;
  return tokens.datePicker[path] || defaultValue;
};
var DatePickerContainer = styled4__default.default.div`
  position: relative;
  display: inline-block;
`;
var DatePickerTrigger = styled4__default.default.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: ${({ tokens }) => getTokenValue(tokens, "padding", "8px 12px")};
  border: 1px solid ${({ tokens }) => getTokenValue(tokens, "borderColor", "#E5E7EB")};
  border-radius: ${({ tokens }) => getTokenValue(tokens, "borderRadius", "8px")};
  background: ${({ tokens }) => getTokenValue(tokens, "background", "#FFFFFF")};
  color: ${({ tokens }) => getTokenValue(tokens, "color", "#374151")};
  font-size: ${({ tokens }) => getTokenValue(tokens, "fontSize", "14px")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ tokens }) => getTokenValue(tokens, "hoverBackground", "#F3F4F6")};
  }
`;
var DatePickerDropdown = styled4__default.default.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 1000;
  background: ${({ tokens }) => getTokenValue(tokens, "background", "#FFFFFF")};
  border: 1px solid ${({ tokens }) => getTokenValue(tokens, "borderColor", "#E5E7EB")};
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: ${({ $isOpen }) => $isOpen ? "flex" : "none"};
  padding: 16px;
  min-width: 800px;
`;
var PresetList = styled4__default.default.div`
  width: 160px;
  border-right: 1px solid ${({ tokens }) => getTokenValue(tokens, "borderColor", "#E5E7EB")};
  padding-right: 16px;
  margin-right: 16px;
`;
var PresetOption = styled4__default.default.button`
  width: 100%;
  padding: 8px 12px;
  text-align: left;
  border: none;
  background: none;
  color: ${({ tokens }) => getTokenValue(tokens, "color", "#374151")};
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 6px;
  font-size: 14px;

  ${({ $isSelected }) => $isSelected && styled4.css`
      background: #6E41E2;
      color: white;
    `}

  &:hover:not(:disabled) {
    background: ${({ $isSelected }) => $isSelected ? "#6E41E2" : "#F3F4F6"};
  }

  &:disabled {
    color: #9CA3AF;
    cursor: not-allowed;
  }
`;
var CalendarContainer = styled4__default.default.div`
  flex: 1;
  display: flex;
  gap: 32px;
`;
var SingleCalendarContainer = styled4__default.default.div`
  flex: 1;
`;
var CalendarHeader = styled4__default.default.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  button {
    padding: 4px;
    background: none;
    border: none;
    cursor: pointer;
    color: #6B7280;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 4px;

    &:hover:not(:disabled) {
      background: #F3F4F6;
      color: #374151;
    }

    &:disabled {
      cursor: not-allowed;
      color: #D1D5DB;
    }
  }
`;
var MonthYearDisplay = styled4__default.default.div`
  font-size: 14px;
  font-weight: 500;
  color: #111827;
  text-align: center;
  flex: 1;
`;
var MonthGrid = styled4__default.default.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;
var WeekDay = styled4__default.default.div`
  text-align: center;
  font-size: 12px;
  color: #6B7280;
  padding: 8px;
  font-weight: 500;
`;
var DayCell = styled4__default.default.button`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  color: #374151;
  position: relative;

  ${({ $isSelected, $isInRange }) => {
  if ($isSelected) {
    return styled4.css`
        background: #6E41E2;
        color: white;
        font-weight: 500;
      `;
  }
  if ($isInRange) {
    return styled4.css`
        background: rgba(110, 65, 226, 0.08);
        color: #374151;
      `;
  }
  return "";
}}

  &:hover:not(:disabled) {
    background: ${({ $isSelected }) => $isSelected ? "#6E41E2" : "rgba(110, 65, 226, 0.08)"};
    color: ${({ $isSelected }) => $isSelected ? "white" : "#374151"};
  }

  &:disabled {
    color: #D1D5DB;
    cursor: not-allowed;
  }
`;
var TimeContainer = styled4__default.default.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #E5E7EB;
  width: 100%;
  gap: 24px;
`;
var TimeSelectContainer = styled4__default.default.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
var TimeSelect = styled4__default.default.select`
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  background: #F8F8F8 url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%236B7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat right 8px center;
  color: #374151;
  font-size: 14px;
  cursor: pointer;
  width: 72px;
  appearance: none;
  text-align: center;

  &:focus {
    outline: none;
    background-color: #F3F4F6;
  }

  &:hover {
    background-color: #F3F4F6;
  }
`;
var TimeSeparator = styled4__default.default.span`
  color: #374151;
  font-size: 14px;
  font-weight: 500;
`;
var ActionButtons = styled4__default.default.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #E5E7EB;
`;
var CancelButton = styled4__default.default.button`
  padding: 8px 16px;
  border: none;
  background: none;
  color: #374151;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 6px;
  min-width: 80px;
  transition: all 0.2s ease;

  &:hover {
    background: #F3F4F6;
  }
`;
var ApplyButton = styled4__default.default.button`
  padding: 8px 16px;
  border: none;
  background: #6E41E2;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 6px;
  min-width: 80px;
  transition: background 0.2s ease;

  &:hover {
    background: #5D35C4;
  }
`;

// src/components/DatePicker/DatePicker.tsx
var defaultTokens3 = {
  datePicker: {
    background: "#FFFFFF",
    borderColor: "#E5E7EB",
    borderRadius: "8px",
    fontSize: "14px",
    padding: "8px 12px",
    color: "#374151",
    hoverBackground: "#F3F4F6",
    selectedBackground: "#5022bd",
    selectedColor: "#FFFFFF",
    disabledColor: "#9CA3AF",
    shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
  }
};
var presetOptions = [
  {
    label: "Today",
    getValue: () => ({
      startDate: /* @__PURE__ */ new Date(),
      endDate: /* @__PURE__ */ new Date()
    })
  },
  {
    label: "Yesterday",
    getValue: () => {
      const yesterday = /* @__PURE__ */ new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return {
        startDate: yesterday,
        endDate: yesterday
      };
    }
  },
  {
    label: "Last 7 days",
    getValue: () => {
      const end = /* @__PURE__ */ new Date();
      const start = /* @__PURE__ */ new Date();
      start.setDate(start.getDate() - 6);
      return { startDate: start, endDate: end };
    }
  },
  {
    label: "This week",
    getValue: () => {
      const today = /* @__PURE__ */ new Date();
      const start = new Date(today);
      start.setDate(today.getDate() - today.getDay());
      return { startDate: start, endDate: today };
    }
  },
  {
    label: "Last 30 days",
    getValue: () => {
      const end = /* @__PURE__ */ new Date();
      const start = /* @__PURE__ */ new Date();
      start.setDate(start.getDate() - 29);
      return { startDate: start, endDate: end };
    }
  },
  {
    label: "This month",
    getValue: () => ({
      startDate: dateFns.startOfMonth(/* @__PURE__ */ new Date()),
      endDate: /* @__PURE__ */ new Date()
    })
  },
  {
    label: "Custom range",
    getValue: () => ({
      startDate: /* @__PURE__ */ new Date(),
      endDate: /* @__PURE__ */ new Date()
    })
  }
];
var DatePicker = ({
  value,
  onChange,
  minDate,
  maxDate,
  disabledDates,
  customTokens,
  onCancel,
  className
}) => {
  const [isOpen, setIsOpen] = React4.useState(false);
  const [selectedPreset, setSelectedPreset] = React4.useState(null);
  const [currentMonth, setCurrentMonth] = React4.useState(/* @__PURE__ */ new Date());
  const [nextMonth, setNextMonth] = React4.useState(dateFns.addMonths(/* @__PURE__ */ new Date(), 1));
  const [selectedRange, setSelectedRange] = React4.useState(value);
  const [startHours, setStartHours] = React4.useState("0");
  const [startMinutes, setStartMinutes] = React4.useState("00");
  const [endHours, setEndHours] = React4.useState("0");
  const [endMinutes, setEndMinutes] = React4.useState("00");
  const containerRef = React4.useRef(null);
  const tokens = useTokens("datePicker", defaultTokens3);
  const finalTokens = customTokens || tokens;
  React4.useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handlePresetClick = (preset) => {
    const range = preset.getValue();
    setSelectedRange(range);
    setSelectedPreset(preset.label);
    const { startDate } = range;
    setCurrentMonth(startDate);
    setNextMonth(dateFns.addMonths(startDate, 1));
  };
  const handleDayClick = (date) => {
    if (selectedPreset !== "Custom range") {
      return;
    }
    if (!selectedRange || !selectedRange.startDate) {
      setSelectedRange({ startDate: date, endDate: date });
      setCurrentMonth(date);
      setNextMonth(dateFns.addMonths(date, 1));
    } else if (!selectedRange.endDate || dateFns.isSameDay(selectedRange.startDate, selectedRange.endDate)) {
      if (dateFns.isBefore(date, selectedRange.startDate)) {
        setSelectedRange({ startDate: date, endDate: selectedRange.startDate });
        setCurrentMonth(date);
        setNextMonth(dateFns.addMonths(date, 1));
      } else {
        setSelectedRange({ startDate: selectedRange.startDate, endDate: date });
        if (date.getMonth() !== currentMonth.getMonth() && date.getMonth() !== nextMonth.getMonth()) {
          setCurrentMonth(dateFns.subMonths(date, 1));
          setNextMonth(date);
        }
      }
    } else {
      setSelectedRange({ startDate: date, endDate: date });
      setCurrentMonth(date);
      setNextMonth(dateFns.addMonths(date, 1));
    }
  };
  const handleMonthNavigation = (direction) => {
    if (direction === "prev") {
      setCurrentMonth(dateFns.subMonths(currentMonth, 1));
      setNextMonth(dateFns.subMonths(nextMonth, 1));
    } else {
      setCurrentMonth(dateFns.addMonths(currentMonth, 1));
      setNextMonth(dateFns.addMonths(nextMonth, 1));
    }
  };
  const renderCalendar = (month, showLeftArrow = true, showRightArrow = true) => {
    const start = dateFns.startOfMonth(month);
    const end = dateFns.endOfMonth(month);
    const days = dateFns.eachDayOfInterval({ start, end });
    return /* @__PURE__ */ React4__default.default.createElement(SingleCalendarContainer, null, /* @__PURE__ */ React4__default.default.createElement(CalendarHeader, null, showLeftArrow && /* @__PURE__ */ React4__default.default.createElement(
      "button",
      {
        onClick: () => handleMonthNavigation("prev"),
        "aria-label": "Previous month",
        disabled: selectedPreset !== "Custom range"
      },
      /* @__PURE__ */ React4__default.default.createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faChevronLeft, size: "sm" })
    ), /* @__PURE__ */ React4__default.default.createElement(MonthYearDisplay, null, dateFns.format(month, "MMMM yyyy")), showRightArrow && /* @__PURE__ */ React4__default.default.createElement(
      "button",
      {
        onClick: () => handleMonthNavigation("next"),
        "aria-label": "Next month",
        disabled: selectedPreset !== "Custom range"
      },
      /* @__PURE__ */ React4__default.default.createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faChevronRight, size: "sm" })
    )), /* @__PURE__ */ React4__default.default.createElement(MonthGrid, null, ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => /* @__PURE__ */ React4__default.default.createElement(WeekDay, { key: day }, day)), Array.from({ length: start.getDay() }, (_, i) => /* @__PURE__ */ React4__default.default.createElement(DayCell, { key: `empty-${i}`, disabled: true, style: { visibility: "hidden" } }, " ")), days.map((day) => {
      const isSelected = selectedRange && (dateFns.isSameDay(day, selectedRange.startDate) || dateFns.isSameDay(day, selectedRange.endDate));
      const isInRange = selectedRange && selectedRange.startDate && selectedRange.endDate && (dateFns.isWithinInterval(day, {
        start: selectedRange.startDate,
        end: selectedRange.endDate
      }) && !dateFns.isSameDay(day, selectedRange.startDate) && !dateFns.isSameDay(day, selectedRange.endDate));
      const isDisabled = selectedPreset !== "Custom range" || // Disable all dates if not in Custom range mode
      minDate && dateFns.isBefore(day, minDate) || maxDate && dateFns.isAfter(day, maxDate) || disabledDates && disabledDates.some((disabled) => dateFns.isSameDay(day, disabled));
      return /* @__PURE__ */ React4__default.default.createElement(
        DayCell,
        {
          key: day.toISOString(),
          onClick: () => !isDisabled && handleDayClick(day),
          $isSelected: isSelected,
          $isInRange: isInRange,
          $isDisabled: isDisabled,
          disabled: isDisabled
        },
        dateFns.format(day, "d")
      );
    })));
  };
  const formatDateRange = (range) => {
    if (!range)
      return "Select date range";
    const { startDate, endDate } = range;
    if (dateFns.isSameDay(startDate, endDate)) {
      return dateFns.format(startDate, "MMM d, yyyy");
    }
    return `${dateFns.format(startDate, "MMM d, yyyy")} - ${dateFns.format(endDate, "MMM d, yyyy")}`;
  };
  return /* @__PURE__ */ React4__default.default.createElement(DatePickerContainer, { ref: containerRef, className }, /* @__PURE__ */ React4__default.default.createElement(DatePickerTrigger, { onClick: () => setIsOpen(!isOpen), tokens: finalTokens }, /* @__PURE__ */ React4__default.default.createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faCalendar }), formatDateRange(selectedRange), /* @__PURE__ */ React4__default.default.createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faChevronDown })), /* @__PURE__ */ React4__default.default.createElement(DatePickerDropdown, { $isOpen: isOpen, tokens: finalTokens }, /* @__PURE__ */ React4__default.default.createElement(PresetList, null, presetOptions.map((preset) => /* @__PURE__ */ React4__default.default.createElement(
    PresetOption,
    {
      key: preset.label,
      onClick: () => handlePresetClick(preset),
      $isSelected: selectedPreset === preset.label
    },
    preset.label
  ))), /* @__PURE__ */ React4__default.default.createElement("div", null, /* @__PURE__ */ React4__default.default.createElement(CalendarContainer, null, renderCalendar(currentMonth, true, false), renderCalendar(nextMonth, false, true)), /* @__PURE__ */ React4__default.default.createElement(TimeContainer, null, /* @__PURE__ */ React4__default.default.createElement(TimeSelectContainer, null, /* @__PURE__ */ React4__default.default.createElement(
    TimeSelect,
    {
      value: startHours,
      onChange: (e) => setStartHours(e.target.value)
    },
    Array.from({ length: 24 }, (_, i) => /* @__PURE__ */ React4__default.default.createElement("option", { key: i, value: i }, i.toString().padStart(2, "0")))
  ), /* @__PURE__ */ React4__default.default.createElement(TimeSeparator, null, ":"), /* @__PURE__ */ React4__default.default.createElement(
    TimeSelect,
    {
      value: startMinutes,
      onChange: (e) => setStartMinutes(e.target.value)
    },
    Array.from({ length: 60 }, (_, i) => /* @__PURE__ */ React4__default.default.createElement("option", { key: i, value: i.toString().padStart(2, "0") }, i.toString().padStart(2, "0")))
  )), /* @__PURE__ */ React4__default.default.createElement(TimeSelectContainer, null, /* @__PURE__ */ React4__default.default.createElement(
    TimeSelect,
    {
      value: endHours,
      onChange: (e) => setEndHours(e.target.value)
    },
    Array.from({ length: 24 }, (_, i) => /* @__PURE__ */ React4__default.default.createElement("option", { key: i, value: i }, i.toString().padStart(2, "0")))
  ), /* @__PURE__ */ React4__default.default.createElement(TimeSeparator, null, ":"), /* @__PURE__ */ React4__default.default.createElement(
    TimeSelect,
    {
      value: endMinutes,
      onChange: (e) => setEndMinutes(e.target.value)
    },
    Array.from({ length: 60 }, (_, i) => /* @__PURE__ */ React4__default.default.createElement("option", { key: i, value: i.toString().padStart(2, "0") }, i.toString().padStart(2, "0")))
  ))), /* @__PURE__ */ React4__default.default.createElement(ActionButtons, null, /* @__PURE__ */ React4__default.default.createElement(CancelButton, { onClick: () => {
    setIsOpen(false);
    onCancel?.();
  } }, "Cancel"), /* @__PURE__ */ React4__default.default.createElement(ApplyButton, { onClick: () => {
    if (selectedRange) {
      const { startDate, endDate } = selectedRange;
      const finalStartDate = new Date(startDate);
      finalStartDate.setHours(parseInt(startHours), parseInt(startMinutes), 0, 0);
      const finalEndDate = new Date(endDate);
      finalEndDate.setHours(parseInt(endHours), parseInt(endMinutes), 0, 0);
      onChange?.({ startDate: finalStartDate, endDate: finalEndDate });
    }
    setIsOpen(false);
  } }, "Apply")))));
};
var ThemeProvider = ({ tokenUrl, children }) => {
  const [loading, setLoading] = React4.useState(true);
  React4.useEffect(() => {
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
  return /* @__PURE__ */ React4__default.default.createElement(React4__default.default.Fragment, null, children);
};

Object.defineProperty(exports, 'Button', {
  enumerable: true,
  get: function () { return chunkDSVJBX5L_cjs.Button; }
});
Object.defineProperty(exports, 'Typography', {
  enumerable: true,
  get: function () { return chunkQCVPZXSW_cjs.Typography; }
});
exports.DatePicker = DatePicker;
exports.Header = Header_default;
exports.Sidebar = Sidebar;
exports.ThemeProvider = ThemeProvider;
exports.Tooltip = Tooltip;
exports.useTokens = useTokens;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.cjs.map