import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AddNewTower.module.scss';
import TowerTypeDropdown from '../../components/CustomDropdown/TowerTypeDropdown';
import EquipmentSelectDropdown from '../../components/CustomDropdown/EquipmentSelectDropdown';
import backButtonImage from '../../assets/buttons/back.png';
// import eyeImage from '../../assets/buttons/eye.png';
import logo from '../../assets/logo/edotco-wlogo.png'; // Adjust the path as necessary
import { Link } from 'react-router-dom';

export default function AddNewTower() {
  const [towerTypes, setTowerTypes] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [selectedTowerType, setSelectedTowerType] = useState('');
  const [selectedTowerImage, setSelectedTowerImage] = useState('');
  const [selectedEquipments, setSelectedEquipments] = useState([]);
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [height, setheight] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State for success message
  // const [isPreview, setIsPreview] = useState(false);
  const [showPreviewButton, setShowPreviewButton] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Fetch tower types from the API
    fetch('http://localhost:8800/api/tower-types')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched tower types:', data);
        setTowerTypes(data);
      })
      .catch((error) => console.error('Error fetching tower types:', error));

    // Fetch equipments from the API
    fetch('http://localhost:8800/api/equipments')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched equipments:', data);
        setEquipments(data);
      })
      .catch((error) => console.error('Error fetching equipments:', error));
  }, []);

  const handleTowerTypeChange = (event) => {
    const selectedType = event.target.value;
    setSelectedTowerType(selectedType);
    setShowPreviewButton(true);
    setSelectedTowerImage('');
    // setIsPreview(false);

    const selectedTypeInfo = towerTypes.find((item) => item.name === selectedType);
    if (selectedTypeInfo) {
      try {
        const imagePath = require(`../../assets/Towers/${selectedTypeInfo.image_location}`);
        setSelectedTowerImage(imagePath);
        console.log('Selected tower image:', imagePath);
      } catch (error) {
        console.error('Error loading image:', error);
      }
    } else {
      setSelectedTowerImage('');
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const selectedTowerTypeInfo = towerTypes.find((item) => item.name === selectedTowerType);
    const postData = {
      towerType: selectedTowerTypeInfo ? selectedTowerTypeInfo.tower_id : null,
      name: selectedTowerTypeInfo ? selectedTowerTypeInfo.name : null,
      longitude,
      latitude,
      height,
      equipment_Ids: selectedEquipments.map((equipment) => {
        const equipmentItem = equipments.find((e) => e.name === equipment);
        return equipmentItem.equipment_id;
      }),
      equipment_names: selectedEquipments.map((equipment) => {
        const equipmentItem = equipments.find((e) => e.name === equipment);
        return equipmentItem.name;
      }),
    };
  
    fetch('http://localhost:8800/api/towers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Successfully created tower:', data);
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
          navigate('/tower-details'); // Navigate to the new page
        }, 1000);
      })
      .catch((error) => console.error('Error creating tower:', error));
  };
  

  // const togglePreview = () => {
  //   setIsPreview(true); // Set preview state to true
  //   setShowPreviewButton(false); // Hide the preview button after previewing
  // };

  return (
    <div className={styles.AddNewTower}>
      <header className={styles.AddNewTowerHeader}>
        <div className={styles.HeaderContent}>
        <Link className={styles.Logo} to="/">
            <img src={logo} alt="Logo" className={styles.Logo} />
        </Link>
          <button onClick={handleBackClick} className={styles.BackButton}>
            <img src={backButtonImage} alt="Back" className={styles.BackButtonImage} />
          </button>
          <h1 className={styles.Title}>Tower Management Wizard</h1>
        </div>
        <div className={styles.Divider}></div>
        {showSuccessMessage && (
          <div className={styles.SuccessMessage}>
            Successfully Created Tower
          </div>
        )}
        <div className={styles.Content}>
          <form className={styles.Form} onSubmit={handleSubmit}>
            <TowerTypeDropdown
              towerTypes={towerTypes}
              selectedTowerType={selectedTowerType}
              onTowerTypeChange={handleTowerTypeChange}
            />
            <div className={styles.FormGroup}>
              <label htmlFor="location" className={styles.Label}>Location</label>
              <span>
                <label htmlFor="longitude" className={styles.SmallLabel}>
                  Longitude
                </label>
                <input
                  type="text"
                  id="longitude"
                  name="longitude"
                  className={styles.Input}
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                />
              </span>
              <span>
                <label htmlFor="latitude" className={styles.SmallLabel}>
                  Latitude
                </label>
                <input
                  type="text"
                  id="latitude"
                  name="latitude"
                  className={styles.Input}
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                />
              </span>
              <span>
                <label htmlFor="height" className={styles.SmallLabel}>
                  Height (meters)
                </label>
                <input
                  type="text"
                  id="height"
                  name="height"
                  className={styles.Input}
                  value={height}
                  onChange={(e) => setheight(e.target.value)}
                />
              </span>
            </div>
            <EquipmentSelectDropdown
              equipments={equipments}
              selectedEquipments={selectedEquipments}
              setSelectedEquipments={setSelectedEquipments}
              label="Select Equipments"
            />
            <button type="submit" className={styles.MenuButton}>
              Submit
            </button>
          </form>
          <div className={styles.ImageContainer}>
            {selectedTowerImage && (
              <img
                src={selectedTowerImage}
                alt={selectedTowerType}
                className={`${styles.TowerImage} `}  //${!isPreview ? styles.Blur : ''}
              />
            )}
            {/* {showPreviewButton && !isPreview && (
              <button className={styles.PreviewButton} onClick={togglePreview}>
                <img src={eyeImage} alt="Preview" className={styles.PreviewIcon} />
                <div className={styles.PreviewText}>Preview</div>
              </button>
            )} */}
            {!selectedTowerImage && !showPreviewButton && (
              <div className={styles.Placeholder}>No Tower Selected</div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
