import React, { MouseEvent as ReactMouseEvent, useEffect, useRef } from "react";
import ContextMenuItem from "./ContextMenuItem";
import styles from "./ClipContextMenu.module.css";

const CONTEXT_MENU_ITEMS = [
  {
    name: "Clip properties",
    id: "context-menu-clip-item",
    index: 0,
  },
  {
    name: "Rename clip",
    id: "context-menu-clip-item",
    index: 1,
  },
  {
    name: "Cut",
    id: "context-menu-clip-item",
    index: 2,
  },
  {
    name: "Copy",
    id: "context-menu-clip-item",
    index: 3,
  },
  {
    name: "Paste",
    id: "context-menu-clip-item",
    index: 4,
  },
  {
    name: "Duplicate",
    id: "context-menu-clip-item",
    index: 5,
  },
  {
    name: "Split cut",
    id: "context-menu-clip-item",
    index: 6,
  },
  {
    name: "Split delete",
    id: "context-menu-clip-item",
    index: 7,
  },
  {
    name: "Split",
    id: "context-menu-clip-item",
    index: 8,
  },
  {
    name: "Export clip",
    id: "context-menu-clip-item",
    index: 9,
  },
  {
    name: "Enable clip stretching",
    id: "context-menu-clip-item",
    index: 10,
  },
  {
    name: "Pitch and speed",
    id: "context-menu-clip-item",
    index: 11,
  },
  {
    name: "Render pitch and speed",
    id: "context-menu-clip-item",
    index: 12,
  },

];

type ClipContextMenuProps = {
  handleToggleContextMenu: () => void;
}

export default function ClipContextMenu({handleToggleContextMenu}:ClipContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  // Assuming you have a function to close the menu in your context

  // Handle clicks outside the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        handleToggleContextMenu();
      }
    };

    // Add event listener to the document
    document.addEventListener("mousedown", handleClickOutside);
    
    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleToggleContextMenu]);

  const handleMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  
  const handleClick = (e: ReactMouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div 
      ref={menuRef}
      id="clip-context-menu" 
      className={styles.container}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      {CONTEXT_MENU_ITEMS.map((item, index) => (
        <ContextMenuItem id={`${item.id}-${item.index}`} key={index}>{item.name}</ContextMenuItem>
      ))}
    </div>
  );
}