import React, { useState } from 'react';
import styles from './SnappingDropdown.module.css';
import Icon from '../Icon';

const options = [
  { label: '1/4', value: '1/4' },
  { label: '1/8', value: '1/8' },
  { label: '1/16', value: '1/16' }
];

function SnappingDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: typeof options[0]) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <button
        className={styles.trigger}
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selected.label}
       <Icon code="&#xEF12;" size={16}/>
      </button>
      {isOpen && (
        <ul className={styles.list} role="listbox">
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={selected.value === option.value}
              className={styles.option}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SnappingDropdown;