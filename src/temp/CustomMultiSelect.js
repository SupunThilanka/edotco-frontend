import React, { useState, useRef, useEffect } from 'react';
import styles from './CustomMultiSelect.module.scss';

const CustomMultiSelectSearchableDropdown = ({ options, selectedOptions, setSelectedOptions, label }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelectOption = (option) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleDeselectOption = (option) => {
    setSelectedOptions(selectedOptions.filter(item => item !== option));
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.MultiSelectSearchableDropdown} ref={dropdownRef}>
      <label>{label}</label>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.SearchInput}
        onClick={handleToggleDropdown}
      />
      {isDropdownOpen && (
        <ul className={styles.OptionsList}>
          {filteredOptions.map((option, index) => (
            <li key={index} onClick={() => handleSelectOption(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
      <div className={styles.SelectedOptions}>
        <ul>
          {selectedOptions.map((option, index) => (
            <li key={index}>
              {option}
              <button type="button" onClick={() => handleDeselectOption(option)}>
                &times;
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomMultiSelectSearchableDropdown;
