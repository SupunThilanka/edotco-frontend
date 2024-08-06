import React, { useState, useEffect, useRef } from 'react';
import styles from './CustomDropdown.module.scss';

export default function CustomMultiSelectDropdown({ options, selectedOptions, setSelectedOptions, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionChange = (event) => {
    const { value, checked } = event.target;
    setSelectedOptions((prevSelectedOptions) => {
      if (checked) {
        return [...prevSelectedOptions, value];
      } else {
        return prevSelectedOptions.filter(option => option !== value);
      }
    });
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.DropdownContainer} ref={dropdownRef}>
      <label className={styles.DropdownLabel} onClick={toggleDropdown}>
        {label}
        <span className={`${styles.DropdownIndicator} ${isOpen ? styles.DropdownIndicatorOpen : ''}`}></span>
      </label>
      {isOpen && (
        <div className={styles.DropdownMenu}>
          {options.map((option, index) => (
            <label key={index} className={styles.DropdownItem}>
              <input
                type="checkbox"
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={handleOptionChange}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}