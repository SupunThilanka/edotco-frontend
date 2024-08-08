import React, { useState, useEffect, useRef } from 'react';
import styles from './CustomDropdown.module.scss';

export default function CustomMultiSelectDropdown({ options, selectedOptions, setSelectedOptions, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // Add state for search query
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setSearchQuery(''); // Reset search query when toggling dropdown
  };

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
      setSearchQuery(''); // Reset search query when clicking outside
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update search query state
  };

  const handleKeyPress = (event) => {
    setSearchQuery(prev => prev + event.key); // Update search query with key press
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.DropdownContainer} ref={dropdownRef} onKeyPress={handleKeyPress}>
      <label className={styles.DropdownLabel} onClick={toggleDropdown}>
        {label}
        <span className={`${styles.DropdownIndicator} ${isOpen ? styles.DropdownIndicatorOpen : ''}`}></span>
      </label>
      {isOpen && (
        <div className={styles.DropdownMenu}>
          <input
            type="text"
            className={styles.SearchInput}
            placeholder="Type to search..."
            value={searchQuery}
            onChange={handleSearchChange}
            autoFocus
          />
          {filteredOptions.map((option, index) => (
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
