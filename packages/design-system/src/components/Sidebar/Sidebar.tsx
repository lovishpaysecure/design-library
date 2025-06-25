import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faSearch, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { SidebarProps, MenuItemConfig, SubMenuItemConfig, SidebarTokens } from './Sidebar.types';
import { SidebarContainer, SidebarHeader, LogoContainer, ToggleSidebarButton, SidebarContent } from '../../styles/Sidebar.styles';
import { useTokens } from '../../hooks/useTokens';
import { Typography } from '../Typography/Typography';
import { sidebarTokens } from './Sidebar.tokens';

const SearchBar: React.FC<{
  isCollapsed: boolean;
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onExpandClick: () => void;
}> = ({ isCollapsed, value, onChange, onFocus, onExpandClick }) => (
  <div style={{
    padding:'20px 20px',
    background: '#fff',
    position: 'sticky',
    top: 0,
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    height: 36,
  }}>
    <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}>
      {isCollapsed ? (
        <button 
          style={{ width: 36, height: 36, border: '1px solid #eee', borderRadius: '20%', background: '#fff', color: '#666', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}
          onClick={onExpandClick}
          type="button"
          aria-label="Expand search"
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      ) : (
        <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', height: 48 }}>
          <FontAwesomeIcon icon={faSearch} style={{ position: 'absolute', left: 12, color: '#666', fontSize: 14, pointerEvents: 'none', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search..."
            style={{ width: '100%', height: 36, padding: '8px 12px 8px 36px', border: '1px solid #eee', borderRadius: 25, fontSize: 14, marginLeft: 0 }}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={onFocus}
          />
        </div>
      )}
    </div>
  </div>
);

const NavigationItem: React.FC<{ 
  item: MenuItemConfig;
  isCollapsed: boolean;
  activeSubmenu: string | null;
  onSubmenuClick: (label: string) => void;
  onItemClick?: (item: MenuItemConfig | SubMenuItemConfig, isSubItem?: boolean) => void;
}> = ({ item, isCollapsed, activeSubmenu, onSubmenuClick, onItemClick }) => {
  const isSubmenuOpen = activeSubmenu === item.label;

  if (item.header) {
    return !isCollapsed ? (
      <div style={{ padding: '12px 20px', marginTop: '10px' }}>
        <Typography variant="caption" weight="semibold" style={{ color: '#666', textTransform: 'uppercase' }}>
          {item.label}
        </Typography>
      </div>
    ) : null;
  }

  const handleMainItemClick = () => {
    if (item.submenu) {
      onSubmenuClick(item.label);
    } else {
      onItemClick?.(item, false);
    }
  };

  const handleSubItemClick = (subItem: SubMenuItemConfig) => {
    onItemClick?.(subItem, true);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: isCollapsed ? 12 : '12px 12px',
          color: isSubmenuOpen || item.active ? '#5022bd' : '#666',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          position: 'relative',
          whiteSpace: 'nowrap',
          marginBottom: 4,
          background: isSubmenuOpen || item.active ? '#efefef' : undefined,
          borderRadius: isSubmenuOpen || item.active ? 10 : undefined,
          justifyContent: isCollapsed ? 'center' : undefined
        }}
        onClick={handleMainItemClick}
      >
        {item.icon && <span style={{ display: 'flex', alignItems: 'center', marginRight: isCollapsed ? 0 : 8 }}>{item.icon}</span>}
        {!isCollapsed && (
          <Typography variant="body2" weight="semibold" style={{ flex: 1, marginRight: 10, color: 'inherit' }}>
            {item.label}
          </Typography>
        )}
        {!isCollapsed && item.submenu && (
          <FontAwesomeIcon 
            icon={isSubmenuOpen ? faChevronDown : faChevronRight} 
            style={{ marginLeft: 'auto', fontSize: 12, transition: 'transform 0.3s ease', transform: isSubmenuOpen ? 'rotate(180deg)' : undefined }} 
          />
        )}
      </div>
      {!isCollapsed && item.submenu && isSubmenuOpen && (
        <div style={{ borderRadius: '0 0 10px 10px', marginBottom: 4, overflow: 'hidden' }}>
          {item.submenu.map((subItem, index) => (
            <div 
              key={index} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '10px 12px 10px 40px', 
                color: subItem.active ? '#5022bd' : '#666', 
                cursor: 'pointer', 
                transition: 'all 0.3s ease',
                background: subItem.active ? '#f0f0f0' : undefined,
                borderRadius: subItem.active ? 8 : undefined
              }}
              onClick={() => handleSubItemClick(subItem)}
            >
              {subItem.icon && <span style={{ display: 'flex', alignItems: 'center', marginRight: 8, opacity: 0.8 }}>{subItem.icon}</span>}
              <Typography variant="body2" style={{ color: 'inherit' }}>
                {subItem.label}
              </Typography>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps & { tokens?: SidebarTokens }> = ({ menuItems, logo, collapsed, onToggleCollapse, onMenuClick, tokens: tokensProp }) => {
  const [searchValue, setSearchValue] = useState('');
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const tokens = useTokens<SidebarTokens>('sidebar', sidebarTokens);
  const mergedTokens = tokensProp || tokens;

  const handleSearchFocus = () => {
    if (collapsed) {
      onToggleCollapse();
    }
  };

  const handleSubmenuClick = (label: string) => {
    setActiveSubmenu(activeSubmenu === label ? null : label);
  };

  // Filter menu items by searchValue (simple label match)
  const filterMenuItems = (items: MenuItemConfig[]): MenuItemConfig[] => {
    const q = searchValue.trim().toLowerCase();
    if (!q) return items;
    const filtered: MenuItemConfig[] = [];
    let lastHeader: MenuItemConfig | null = null;
    for (const item of items) {
      if (item.header) {
        lastHeader = item;
        continue;
      }
      const labelMatch = item.label.toLowerCase().includes(q);
      if (item.submenu) {
        const anySubMatch = item.submenu.some(sub => sub.label.toLowerCase().includes(q));
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

  return (
    <SidebarContainer $collapsed={collapsed} tokens={mergedTokens.sidebar}>
      <SidebarHeader tokens={mergedTokens.sidebar}>
        <LogoContainer $collapsed={collapsed} tokens={mergedTokens.sidebar}>
          {logo}
        </LogoContainer>
        <ToggleSidebarButton 
          onClick={onToggleCollapse}
          type="button"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          tokens={mergedTokens.sidebar}
        >
          <FontAwesomeIcon icon={collapsed ? faChevronRight : faChevronLeft} />
        </ToggleSidebarButton>
      </SidebarHeader>
      <SidebarContent>
        <SearchBar
          isCollapsed={collapsed}
          value={searchValue}
          onChange={setSearchValue}
          onFocus={handleSearchFocus}
          onExpandClick={onToggleCollapse}
        />
        <nav style={{ padding:'0px 20px 20px 20px', flex: 1 }}>
          {filteredMenuItems.map((item, index) => (
            <NavigationItem 
              key={index} 
              item={item} 
              isCollapsed={collapsed}
              activeSubmenu={activeSubmenu}
              onSubmenuClick={handleSubmenuClick}
              onItemClick={onMenuClick}
            />
          ))}
        </nav>
      </SidebarContent>
    </SidebarContainer>
  );
};

export default Sidebar; 