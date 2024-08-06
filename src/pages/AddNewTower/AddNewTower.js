import React, { useState, useEffect } from 'react';
import styles from './AddNewTower.module.scss'; // Import the new SCSS file
import CustomMultiSelectDropdown from '../../components/CustomDropdown/CustomDropdown'; // Import the custom dropdown component
import menuItems from './menuItems.json'; // Import the JSON file

export default function AddNewTower() {
  const [towerTypes, setTowerTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [selectedTowerType, setSelectedTowerType] = useState('');
  const [selectedTowerImage, setSelectedTowerImage] = useState('');
  const [selectedEquipments, setSelectedEquipments] = useState([]);

  useEffect(() => {
    setTowerTypes(menuItems.towerTypes);
    setLocations(menuItems.locations);
    setEquipments(menuItems.equipments);
  }, []);

  const handleTowerTypeChange = (event) => {
    const selectedType = event.target.value;
    setSelectedTowerType(selectedType);
    console.log('Selected Tower Type:', selectedType); // Debugging line
  
    const selectedTypeInfo = menuItems.towerTypes.find(item => item.type === selectedType);
    console.log('Selected Tower Type Info:', selectedTypeInfo.image); // Debugging line
    if (selectedTypeInfo) {
      try {
        const imagePath = require(`../../assets/Towers/${selectedTypeInfo.image}`);
        console.log('Selected Image Path:', imagePath); // Debugging line
        setSelectedTowerImage(imagePath);
      } catch (error) {
        console.error('Error loading image:', error);
      }
    }
  };

  return (
    <div className={styles.AddNewTower}>
      <header className={styles.AddNewTowerHeader}>
        <h1 className={styles.Title}>Add New Tower</h1>
        <div className={styles.Content}>
          <form className={styles.Form}>
            <div className={styles.FormGroup}>
              <label htmlFor="towerType">Tower Type</label>
              <select id="towerType" name="towerType" className={styles.Select} onChange={handleTowerTypeChange}>
                <option value="">Select Tower Type</option>
                {towerTypes.map((type, index) => (
                  <option key={index} value={type.type}>{type.type}</option>
                ))}
              </select>
            </div>
            <div className={styles.FormGroup}>
              <label htmlFor="location">Location</label>
              <select id="location" name="location" className={styles.Select}>
                <option value="">Select Location</option>
                {locations.map((location, index) => (
                  <option key={index} value={location}>{location}</option>
                ))}
              </select>
            </div>
            <div className={styles.FormGroup}>
              <label htmlFor="location">Equipments</label>
              <CustomMultiSelectDropdown
                options={equipments}
                selectedOptions={selectedEquipments}
                setSelectedOptions={setSelectedEquipments}
                label="Select Equipments"
              />
            </div>
            <div className={styles.SelectedEquipments}>
              <ul>
                {selectedEquipments.map((equipment, index) => (
                  <li key={index}>{equipment}</li>
                ))}
              </ul>
            </div>
            <button type="submit" className={styles.MenuButton}>Submit</button>
          </form>
          <div className={styles.ImageContainer}>
            {selectedTowerImage && (
              <img src={selectedTowerImage} alt={selectedTowerType} className={styles.TowerImage} />
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
