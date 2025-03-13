import React, { MouseEvent as ReactMouseEvent } from "react";
import styles from "./ContextMenuItem.module.css";

type ContextMenuItemProps = {
  id: string;
  children: React.ReactNode;
};

function ContextMenuItem({ id, children }: ContextMenuItemProps) {
  const handleMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleClick = (e: ReactMouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      tabIndex={0}
      id={id}
      className={styles.container}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}

export default ContextMenuItem;
