import React, { useState, useEffect, useRef, useCallback } from "react";
import { usePlayheadContext } from "@/context/PlayheadContext";
import styles from "./PlayheadCursor.module.css";
import Icon from "../Icon";

export default function PlayheadCursor() {
  const { playheadPosition, setPlayheadPosition } = usePlayheadContext();
  const [isDragging, setIsDragging] = useState(false);
  const initialMouseX = useRef(0);
  const initialPlayheadPosition = useRef(playheadPosition);

  // Start at 12px and move in 14px increments for each playhead position
  const position = 12 + playheadPosition * 14;

  // Option 1: Use useCallback to memoize the function
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;

    // Calculate the difference in mouse movement
    const mouseDelta = e.clientX - initialMouseX.current;
    const newPosition = Math.max(0, initialPlayheadPosition.current + Math.floor(mouseDelta / 14));

    // Update the playhead position with the new position, ensuring it doesn't go below 0
    setPlayheadPosition(newPosition);
  }, [isDragging, setPlayheadPosition]);

  // Option 2: Alternatively, you could move the function inside useEffect
  useEffect(() => {
    // Ensure dragging works even when mouse is released outside the component
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    initialMouseX.current = e.clientX; // Store the initial mouse position
    initialPlayheadPosition.current = playheadPosition; // Store the initial playhead position
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging, handleMouseMove]);

  return (
    <div
      className={styles.container}
      style={{ left: `${position}px` }} // Apply the calculated position
      onMouseDown={handleMouseDown} // Start dragging when mouse is down
    >
      <div className={styles.playhead}>
        <Icon code="&#xF478;" size={16} />
      </div>
      <span className={styles.stalk} />
    </div>
  );
}