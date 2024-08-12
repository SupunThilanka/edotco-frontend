import React, { useState, useRef, useEffect } from 'react';
import styles from './EquipmentSelectDropdown.module.scss';

const EquipmentSelectDropdown = ({ equipments = [], selectedEquipments, setSelectedEquipments, label }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelectOption = (option) => {
    if (!selectedEquipments.includes(option.name)) {
      setSelectedEquipments([...selectedEquipments, option.name]);
      console.log('Selected equipments option.name:', option.name);
    } else {
      setSelectedEquipments(selectedEquipments.filter(item => item !== option.name));
    }
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

  const filteredOptions = searchTerm
    ? equipments.filter(option => option.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : equipments;

  const getImageSrc = (imagePath) => {
    try {
      return require(`../../assets/Equipments/${imagePath}`);
    } catch (error) {
      return 'https://via.placeholder.com/50'; // Placeholder image URL
    }
  };

  return (
    <div className={styles.MultiSelectSearchableDropdown} ref={dropdownRef}>
      <label className={styles.Label}>{label}</label>
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
          {Array.isArray(filteredOptions) && filteredOptions.map((option, index) => (
            <li key={index} onClick={() => handleSelectOption(option)}>
              <input
                type="checkbox"
                checked={selectedEquipments.includes(option.name)}
                readOnly
                className={styles.Checkbox}
              />
              <img src={getImageSrc(option.image_location)} alt={option.name} className={styles.EquipmentImage} />
              <div className={styles.EquipmentDetails}>
                <h4>{option.name}</h4>
                <p>{option.description}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      
      <div className={styles.SelectedOptions}>
        <ul>
          {selectedEquipments.map((optionName, index) => {
            const option = equipments.find(equipment => equipment.name === optionName) || {};
            return (
              <li key={index}>
                <img src={getImageSrc(option.image_location)} alt={option.name} className={styles.EquipmentImage} />
                <div className={styles.EquipmentDetails}>
                  <h4>{option.name}</h4>
                  <p>{option.description}</p>
                </div>
                <button type="button" onClick={() => handleSelectOption({ name: optionName })}>
                  &times;
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default EquipmentSelectDropdown;
