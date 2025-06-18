'use strict';

var chunk3BMWW4FX_cjs = require('./chunk-3BMWW4FX.cjs');
var chunk3Z33FTZD_cjs = require('./chunk-3Z33FTZD.cjs');
var React = require('react');
var reactFontawesome = require('@fortawesome/react-fontawesome');
var freeSolidSvgIcons = require('@fortawesome/free-solid-svg-icons');
var styled2 = require('styled-components');
var tokens = require('@paysecure-design/tokens');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);
var styled2__default = /*#__PURE__*/_interopDefault(styled2);

var SidebarContainer = styled2__default.default.div`
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
var SidebarHeader = styled2__default.default.div`
  height: ${({ tokens }) => tokens.headerHeight};
  display: flex;
  align-items: center;
  position: relative;
  background: ${({ tokens }) => tokens.headerBg};
`;
var LogoContainer = styled2__default.default.div`
  height: ${({ tokens }) => tokens.headerHeight};
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${({ $collapsed, tokens }) => $collapsed ? tokens.logoPaddingCollapsed : tokens.logoPadding};
  transition: all 0.3s ease;
  overflow: hidden;
  justify-content: ${({ $collapsed, tokens }) => $collapsed ? tokens.logoJustifyCollapsed : tokens.logoJustify};
`;
var ToggleSidebarButton = styled2__default.default.button`
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
var SidebarContent = styled2__default.default.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0;
  display: flex;
  flex-direction: column;
  scrollbar-width: thin;
  scrollbar-color: #ddd transparent;
`;

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
var SearchBar = ({ isCollapsed, value, onChange, onFocus, onExpandClick }) => /* @__PURE__ */ React__default.default.createElement("div", { style: {
  padding: "20px 20px",
  background: "#fff",
  position: "sticky",
  top: 0,
  zIndex: 2,
  display: "flex",
  alignItems: "center",
  height: 36
} }, /* @__PURE__ */ React__default.default.createElement("div", { style: { position: "relative", width: "100%", display: "flex", alignItems: "center" } }, isCollapsed ? /* @__PURE__ */ React__default.default.createElement(
  "button",
  {
    style: { width: 36, height: 36, border: "1px solid #eee", borderRadius: "20%", background: "#fff", color: "#666", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" },
    onClick: onExpandClick,
    type: "button",
    "aria-label": "Expand search"
  },
  /* @__PURE__ */ React__default.default.createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faSearch })
) : /* @__PURE__ */ React__default.default.createElement("div", { style: { position: "relative", width: "100%", display: "flex", alignItems: "center", height: 48 } }, /* @__PURE__ */ React__default.default.createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faSearch, style: { position: "absolute", left: 12, color: "#666", fontSize: 14, pointerEvents: "none", top: "50%", transform: "translateY(-50%)" } }), /* @__PURE__ */ React__default.default.createElement(
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
    return !isCollapsed ? /* @__PURE__ */ React__default.default.createElement("div", { style: { padding: "12px 20px", fontSize: "12px", fontWeight: 600, color: "#666", textTransform: "uppercase", marginTop: "10px" } }, item.label) : null;
  }
  return /* @__PURE__ */ React__default.default.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ React__default.default.createElement(
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
        fontSize: 14,
        fontWeight: 600,
        background: isSubmenuOpen || item.active ? "#efefef" : void 0,
        borderRadius: isSubmenuOpen || item.active ? 10 : void 0,
        justifyContent: isCollapsed ? "center" : void 0
      },
      onClick: () => item.submenu && onSubmenuClick(item.label)
    },
    item.icon && /* @__PURE__ */ React__default.default.createElement("span", { style: { display: "flex", alignItems: "center", marginRight: isCollapsed ? 0 : 8 } }, item.icon),
    !isCollapsed && /* @__PURE__ */ React__default.default.createElement("span", { style: { flex: 1, marginRight: 10 } }, item.label),
    !isCollapsed && item.submenu && /* @__PURE__ */ React__default.default.createElement(
      reactFontawesome.FontAwesomeIcon,
      {
        icon: isSubmenuOpen ? freeSolidSvgIcons.faChevronDown : freeSolidSvgIcons.faChevronRight,
        style: { marginLeft: "auto", fontSize: 12, transition: "transform 0.3s ease", transform: isSubmenuOpen ? "rotate(180deg)" : void 0 }
      }
    )
  ), !isCollapsed && item.submenu && isSubmenuOpen && /* @__PURE__ */ React__default.default.createElement("div", { style: { borderRadius: "0 0 10px 10px", marginBottom: 4, overflow: "hidden" } }, item.submenu.map((subItem, index) => /* @__PURE__ */ React__default.default.createElement("div", { key: index, style: { display: "flex", alignItems: "center", padding: "10px 12px 10px 40px", color: "#666", cursor: "pointer", transition: "all 0.3s ease", fontSize: 14 } }, subItem.icon && /* @__PURE__ */ React__default.default.createElement("span", { style: { display: "flex", alignItems: "center", marginRight: 8, opacity: 0.8 } }, subItem.icon), /* @__PURE__ */ React__default.default.createElement("span", null, subItem.label)))));
};
var Sidebar = ({ menuItems, logo, collapsed, onToggleCollapse, onMenuClick, tokens: tokensProp }) => {
  const [searchValue, setSearchValue] = React.useState("");
  const [activeSubmenu, setActiveSubmenu] = React.useState(null);
  const tokens = chunk3BMWW4FX_cjs.useTokens("sidebar", defaultTokens);
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
  return /* @__PURE__ */ React__default.default.createElement(SidebarContainer, { $collapsed: collapsed, tokens: mergedTokens.sidebar }, /* @__PURE__ */ React__default.default.createElement(SidebarHeader, { tokens: mergedTokens.sidebar }, /* @__PURE__ */ React__default.default.createElement(LogoContainer, { $collapsed: collapsed, tokens: mergedTokens.sidebar }, logo), /* @__PURE__ */ React__default.default.createElement(
    ToggleSidebarButton,
    {
      onClick: onToggleCollapse,
      type: "button",
      "aria-label": collapsed ? "Expand sidebar" : "Collapse sidebar",
      tokens: mergedTokens.sidebar
    },
    /* @__PURE__ */ React__default.default.createElement(reactFontawesome.FontAwesomeIcon, { icon: collapsed ? freeSolidSvgIcons.faChevronRight : freeSolidSvgIcons.faChevronLeft })
  )), /* @__PURE__ */ React__default.default.createElement(SidebarContent, null, /* @__PURE__ */ React__default.default.createElement(
    SearchBar,
    {
      isCollapsed: collapsed,
      value: searchValue,
      onChange: setSearchValue,
      onFocus: handleSearchFocus,
      onExpandClick: onToggleCollapse
    }
  ), /* @__PURE__ */ React__default.default.createElement("nav", { style: { padding: "0px 20px 20px 20px", flex: 1 } }, filteredMenuItems.map((item, index) => /* @__PURE__ */ React__default.default.createElement(
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
var HeaderBar = styled2__default.default.div`
  height: ${({ tokens }) => tokens.height};
  width: 100%;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ tokens }) => tokens.background};
`;
var Title = styled2__default.default.h1`
  font-size: ${({ tokens }) => tokens.titleFontSize};
  font-weight: ${({ tokens }) => tokens.titleFontWeight};
  color: ${({ tokens }) => tokens.titleColor};
  margin: 0;
`;
var Actions = styled2__default.default.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
var UserMenuContainer = styled2__default.default.div`
  position: relative;
  display: flex;
  align-items: center;
`;
var UserButton = styled2__default.default.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 8px;
  background: ${({ tokens }) => tokens.userBg};
  cursor: pointer;
  transition: all 0.2s ease;
`;
var UserAvatar = styled2__default.default.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #eee;
  overflow: hidden;
  margin-right: 8px;
`;
var UserDetails = styled2__default.default.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
var UserRole = styled2__default.default.span`
  font-size: ${({ tokens }) => tokens.userRoleFontSize};
  color: ${({ tokens }) => tokens.userRoleColor};
  margin-left: 4px;
`;
var UserMenu = styled2__default.default.div`
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
var UserMenuItem = styled2__default.default.button`
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
var Divider = styled2__default.default.div`
  height: 1px;
  background: #eee;
  margin: 4px 0 4px 0;
  width: 100%;
`;

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
  { label: "Profile", icon: /* @__PURE__ */ React__default.default.createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faUser }), onClick: () => {
  }, disabled: true },
  { label: "My Messages", icon: /* @__PURE__ */ React__default.default.createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faEnvelope }), onClick: () => {
  }, disabled: true },
  { label: "Change Password", icon: /* @__PURE__ */ React__default.default.createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faKey }), onClick: () => {
  }, disabled: true },
  { label: "Logout", icon: /* @__PURE__ */ React__default.default.createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faSignOutAlt }), onClick: onLogout }
];
var Header = ({ title, actions, user, tokens: tokensProp, onLogout, userMenuOptions }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const userRef = React.useRef(null);
  const tokens = chunk3BMWW4FX_cjs.useTokens("header", defaultTokens2);
  const mergedTokens = tokensProp || tokens;
  const menuOptions = userMenuOptions || defaultMenuOptions(onLogout);
  React.useEffect(() => {
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
  return /* @__PURE__ */ React__default.default.createElement(HeaderBar, { tokens: mergedTokens.header }, /* @__PURE__ */ React__default.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } }, title && (typeof title === "string" ? /* @__PURE__ */ React__default.default.createElement(Title, { tokens: mergedTokens.header }, title) : title)), /* @__PURE__ */ React__default.default.createElement(Actions, null, user && /* @__PURE__ */ React__default.default.createElement(UserMenuContainer, { ref: userRef }, /* @__PURE__ */ React__default.default.createElement(UserButton, { tokens: mergedTokens.header, onClick: () => setMenuOpen((open) => !open) }, /* @__PURE__ */ React__default.default.createElement(UserAvatar, null, user.avatar), /* @__PURE__ */ React__default.default.createElement(UserDetails, null, /* @__PURE__ */ React__default.default.createElement("span", null, user.name), user.role && /* @__PURE__ */ React__default.default.createElement(UserRole, { tokens: mergedTokens.header }, user.role)), /* @__PURE__ */ React__default.default.createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faChevronDown, style: { marginLeft: 8, fontSize: 16 } })), menuOpen && /* @__PURE__ */ React__default.default.createElement(UserMenu, { tokens: mergedTokens.header }, menuOptions.slice(0, -1).map((option, idx) => /* @__PURE__ */ React__default.default.createElement(
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
    " ",
    option.label
  )), /* @__PURE__ */ React__default.default.createElement(Divider, null), /* @__PURE__ */ React__default.default.createElement(
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
    " ",
    menuOptions[menuOptions.length - 1].label
  )))));
};
var Header_default = Header;
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
exports.Header = Header_default;
exports.Sidebar = Sidebar;
exports.ThemeProvider = ThemeProvider;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.cjs.map