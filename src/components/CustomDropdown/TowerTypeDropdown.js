import React, { useState, useRef, useEffect } from 'react';
import styles from './TowerTypeDropdown.module.scss';

const TowerTypeDropdown = ({ towerTypes, selectedTowerType, onTowerTypeChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelectOption = (type) => {
    onTowerTypeChange({ target: { value: type.name } });
    setIsDropdownOpen(false);
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

  const getImageSrc = (imagePath) => {
    try {
      return require(`../../assets/Towers/${imagePath}`);
    } catch (error) {
      return 'https://via.placeholder.com/50'; // Placeholder image URL
    }
  };

  return (
    <div className={styles.FormGroup} ref={dropdownRef}>
      <label htmlFor="towerType" className={styles.Label}>Tower Type</label>
      <div className={styles.CustomSelect} onClick={handleToggleDropdown}>
        {selectedTowerType || 'Select Tower Type'}
      </div>
      {isDropdownOpen && (
        <ul className={styles.OptionsList}>
          {towerTypes.map((type) => (
            <li key={type.tower_id} onClick={() => handleSelectOption(type)}>
              <img src={getImageSrc(type.image_location)} alt={type.name} className={styles.TowerImage} />
              <div className={styles.TowerDetails}>
                <h4>
                  {type.name}
                  <span className={styles.HeightRange}>{type.height}</span>
                </h4>
                <p>{type.description}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TowerTypeDropdown;
