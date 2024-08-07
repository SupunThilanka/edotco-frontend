import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
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

  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    setTowerTypes(menuItems.towerTypes);
    setLocations(menuItems.locations);
    setEquipments(menuItems.equipments);
  }, []);

  const handleTowerTypeChange = (event) => {
    const selectedType = event.target.value;
    setSelectedTowerType(selectedType);
    console.log('Selected Tower Type:', selectedType); // Debugging line
  
    // Find the selected tower type info from the menuItems JSON file.
    const selectedTypeInfo = menuItems.towerTypes.find(item => item.type === selectedType);
    // console.log('Selected Tower Type Info:', selectedTypeInfo.image); // Debugging line
    if (selectedTypeInfo) {
      try {
        const imagePath = require(`../../assets/Towers/${selectedTypeInfo.image}`); //set the tower image the path relevant to the tower type
        console.log('Selected Image Path:', imagePath); // Debugging line
        setSelectedTowerImage(imagePath);
      } catch (error) {
        console.error('Error loading image:', error);
      }
    }
  };
// Add the handleDeselectOption function
  const handleDeselectOption = (option) => {
    setSelectedEquipments((prevSelectedEquipments) => prevSelectedEquipments.filter(item => item !== option));
  };

  const handleBackClick = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className={styles.AddNewTower}>
      <header className={styles.AddNewTowerHeader}>
        <h1 className={styles.Title}>Tower Managment wizard</h1>
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
              <label htmlFor="equipment">Equipments</label>
              <CustomMultiSelectDropdown // Replace the select element with the custom dropdown component
                options={equipments}
                selectedOptions={selectedEquipments}
                setSelectedOptions={setSelectedEquipments}
                label="Select Equipments"
              />
            </div>
            <div className={styles.SelectedEquipments}>
              <ul>
                {selectedEquipments.map((equipment, index) => (
                  <li key={index}>
                    {equipment}
                    <button
                      type="button"
                      className={styles.CloseButton}
                      onClick={() => handleDeselectOption(equipment)}
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <button type="submit" className={styles.MenuButton}>Submit</button>
            <button type="button" className={styles.BackButton} onClick={handleBackClick}>Back</button> {/* Back Button */}
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
