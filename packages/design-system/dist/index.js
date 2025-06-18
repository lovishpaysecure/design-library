import { useTokens } from './chunk-CM26Q5CI.js';
export { Button, useTokens } from './chunk-CM26Q5CI.js';
export { Typography } from './chunk-7G77ZRSR.js';
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faSearch, faChevronDown, faUser, faEnvelope, faKey, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import styled2 from 'styled-components';
import { TokenManager } from '@paysecure-design/tokens';

var SidebarContainer = styled2.div`
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
var SidebarHeader = styled2.div`
  height: ${({ tokens }) => tokens.headerHeight};
  display: flex;
  align-items: center;
  position: relative;
  background: ${({ tokens }) => tokens.headerBg};
`;
var LogoContainer = styled2.div`
  height: ${({ tokens }) => tokens.headerHeight};
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${({ $collapsed, tokens }) => $collapsed ? tokens.logoPaddingCollapsed : tokens.logoPadding};
  transition: all 0.3s ease;
  overflow: hidden;
  justify-content: ${({ $collapsed, tokens }) => $collapsed ? tokens.logoJustifyCollapsed : tokens.logoJustify};
`;
var ToggleSidebarButton = styled2.button`
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
var SidebarContent = styled2.div`
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
var SearchBar = ({ isCollapsed, value, onChange, onFocus, onExpandClick }) => /* @__PURE__ */ React.createElement("div", { style: {
  padding: "20px 20px",
  background: "#fff",
  position: "sticky",
  top: 0,
  zIndex: 2,
  display: "flex",
  alignItems: "center",
  height: 36
} }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", width: "100%", display: "flex", alignItems: "center" } }, isCollapsed ? /* @__PURE__ */ React.createElement(
  "button",
  {
    style: { width: 36, height: 36, border: "1px solid #eee", borderRadius: "20%", background: "#fff", color: "#666", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" },
    onClick: onExpandClick,
    type: "button",
    "aria-label": "Expand search"
  },
  /* @__PURE__ */ React.createElement(FontAwesomeIcon, { icon: faSearch })
) : /* @__PURE__ */ React.createElement("div", { style: { position: "relative", width: "100%", display: "flex", alignItems: "center", height: 48 } }, /* @__PURE__ */ React.createElement(FontAwesomeIcon, { icon: faSearch, style: { position: "absolute", left: 12, color: "#666", fontSize: 14, pointerEvents: "none", top: "50%", transform: "translateY(-50%)" } }), /* @__PURE__ */ React.createElement(
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
    return !isCollapsed ? /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 20px", fontSize: "12px", fontWeight: 600, color: "#666", textTransform: "uppercase", marginTop: "10px" } }, item.label) : null;
  }
  return /* @__PURE__ */ React.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ React.createElement(
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
    item.icon && /* @__PURE__ */ React.createElement("span", { style: { display: "flex", alignItems: "center", marginRight: isCollapsed ? 0 : 8 } }, item.icon),
    !isCollapsed && /* @__PURE__ */ React.createElement("span", { style: { flex: 1, marginRight: 10 } }, item.label),
    !isCollapsed && item.submenu && /* @__PURE__ */ React.createElement(
      FontAwesomeIcon,
      {
        icon: isSubmenuOpen ? faChevronDown : faChevronRight,
        style: { marginLeft: "auto", fontSize: 12, transition: "transform 0.3s ease", transform: isSubmenuOpen ? "rotate(180deg)" : void 0 }
      }
    )
  ), !isCollapsed && item.submenu && isSubmenuOpen && /* @__PURE__ */ React.createElement("div", { style: { borderRadius: "0 0 10px 10px", marginBottom: 4, overflow: "hidden" } }, item.submenu.map((subItem, index) => /* @__PURE__ */ React.createElement("div", { key: index, style: { display: "flex", alignItems: "center", padding: "10px 12px 10px 40px", color: "#666", cursor: "pointer", transition: "all 0.3s ease", fontSize: 14 } }, subItem.icon && /* @__PURE__ */ React.createElement("span", { style: { display: "flex", alignItems: "center", marginRight: 8, opacity: 0.8 } }, subItem.icon), /* @__PURE__ */ React.createElement("span", null, subItem.label)))));
};
var Sidebar = ({ menuItems, logo, collapsed, onToggleCollapse, onMenuClick, tokens: tokensProp }) => {
  const [searchValue, setSearchValue] = useState("");
  const [activeSubmenu, setActiveSubmenu] = useState(null);
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
  return /* @__PURE__ */ React.createElement(SidebarContainer, { $collapsed: collapsed, tokens: mergedTokens.sidebar }, /* @__PURE__ */ React.createElement(SidebarHeader, { tokens: mergedTokens.sidebar }, /* @__PURE__ */ React.createElement(LogoContainer, { $collapsed: collapsed, tokens: mergedTokens.sidebar }, logo), /* @__PURE__ */ React.createElement(
    ToggleSidebarButton,
    {
      onClick: onToggleCollapse,
      type: "button",
      "aria-label": collapsed ? "Expand sidebar" : "Collapse sidebar",
      tokens: mergedTokens.sidebar
    },
    /* @__PURE__ */ React.createElement(FontAwesomeIcon, { icon: collapsed ? faChevronRight : faChevronLeft })
  )), /* @__PURE__ */ React.createElement(SidebarContent, null, /* @__PURE__ */ React.createElement(
    SearchBar,
    {
      isCollapsed: collapsed,
      value: searchValue,
      onChange: setSearchValue,
      onFocus: handleSearchFocus,
      onExpandClick: onToggleCollapse
    }
  ), /* @__PURE__ */ React.createElement("nav", { style: { padding: "0px 20px 20px 20px", flex: 1 } }, filteredMenuItems.map((item, index) => /* @__PURE__ */ React.createElement(
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
var HeaderBar = styled2.div`
  height: ${({ tokens }) => tokens.height};
  width: 100%;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ tokens }) => tokens.background};
`;
var Title = styled2.h1`
  font-size: ${({ tokens }) => tokens.titleFontSize};
  font-weight: ${({ tokens }) => tokens.titleFontWeight};
  color: ${({ tokens }) => tokens.titleColor};
  margin: 0;
`;
var Actions = styled2.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
var UserMenuContainer = styled2.div`
  position: relative;
  display: flex;
  align-items: center;
`;
var UserButton = styled2.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 8px;
  background: ${({ tokens }) => tokens.userBg};
  cursor: pointer;
  transition: all 0.2s ease;
`;
var UserAvatar = styled2.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #eee;
  overflow: hidden;
  margin-right: 8px;
`;
var UserDetails = styled2.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
var UserRole = styled2.span`
  font-size: ${({ tokens }) => tokens.userRoleFontSize};
  color: ${({ tokens }) => tokens.userRoleColor};
  margin-left: 4px;
`;
var UserMenu = styled2.div`
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
var UserMenuItem = styled2.button`
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
var Divider = styled2.div`
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
  { label: "Profile", icon: /* @__PURE__ */ React.createElement(FontAwesomeIcon, { icon: faUser }), onClick: () => {
  }, disabled: true },
  { label: "My Messages", icon: /* @__PURE__ */ React.createElement(FontAwesomeIcon, { icon: faEnvelope }), onClick: () => {
  }, disabled: true },
  { label: "Change Password", icon: /* @__PURE__ */ React.createElement(FontAwesomeIcon, { icon: faKey }), onClick: () => {
  }, disabled: true },
  { label: "Logout", icon: /* @__PURE__ */ React.createElement(FontAwesomeIcon, { icon: faSignOutAlt }), onClick: onLogout }
];
var Header = ({ title, actions, user, tokens: tokensProp, onLogout, userMenuOptions }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const userRef = useRef(null);
  const tokens = useTokens("header", defaultTokens2);
  const mergedTokens = tokensProp || tokens;
  const menuOptions = userMenuOptions || defaultMenuOptions(onLogout);
  useEffect(() => {
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
  return /* @__PURE__ */ React.createElement(HeaderBar, { tokens: mergedTokens.header }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } }, title && (typeof title === "string" ? /* @__PURE__ */ React.createElement(Title, { tokens: mergedTokens.header }, title) : title)), /* @__PURE__ */ React.createElement(Actions, null, user && /* @__PURE__ */ React.createElement(UserMenuContainer, { ref: userRef }, /* @__PURE__ */ React.createElement(UserButton, { tokens: mergedTokens.header, onClick: () => setMenuOpen((open) => !open) }, /* @__PURE__ */ React.createElement(UserAvatar, null, user.avatar), /* @__PURE__ */ React.createElement(UserDetails, null, /* @__PURE__ */ React.createElement("span", null, user.name), user.role && /* @__PURE__ */ React.createElement(UserRole, { tokens: mergedTokens.header }, user.role)), /* @__PURE__ */ React.createElement(FontAwesomeIcon, { icon: faChevronDown, style: { marginLeft: 8, fontSize: 16 } })), menuOpen && /* @__PURE__ */ React.createElement(UserMenu, { tokens: mergedTokens.header }, menuOptions.slice(0, -1).map((option, idx) => /* @__PURE__ */ React.createElement(
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
  )), /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement(
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

export { Header_default as Header, Sidebar, ThemeProvider };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map