import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './AddNewTower.module.scss';
import TowerTypeDropdown from '../../components/CustomDropdown/TowerTypeDropdown';
import EquipmentSelectDropdown from '../../components/CustomDropdown/EquipmentSelectDropdown';
import backButtonImage from '../../assets/buttons/back.png';
import homeButtonImage from '../../assets/buttons/home.png';
import logo from '../../assets/logo/edotco-wlogo.png';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
// import { Select } from '@mui/material';

export default function EditTower() {
  const { id } = useParams(); // Get the tower ID from URL parameters
  const [towerTypes, setTowerTypes] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [selectedTowerType, setSelectedTowerType] = useState('');
  const [selectedTowerImage, setSelectedTowerImage] = useState('');
  const [selectedEquipments, setSelectedEquipments] = useState([]);
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [height, setHeight] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Fetch tower types from the API
    fetch('http://localhost:8800/api/tower-types')
      .then((response) => response.json())
      .then((data) => setTowerTypes(data))
      .catch((error) => console.error('Error fetching tower types:', error));

    // Fetch equipments from the API
    fetch('http://localhost:8800/api/equipments')
      .then((response) => response.json())
      .then((data) => setEquipments(data))
      .catch((error) => console.error('Error fetching equipments:', error));

    // Fetch the existing tower data
    fetch(`http://localhost:8800/api/towers/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedTowerType(data.tower_name);
        setLongitude(data.longitude);
        setLatitude(data.latitude);
        setHeight(data.height);
        const imagePath = require(`../../assets/Towers/${data.tower_image}`);
        setSelectedTowerImage(imagePath);
      })
      .catch((error) => console.error('Error fetching tower data:', error));

    // Fetch the equipments for the tower
    fetch(`http://localhost:8800/api/towers/${id}/equipments`)
      .then((response) => response.json())
      .then((data) => {
        const equipmentNames = data.map(equipment => equipment.name);
        setSelectedEquipments(equipmentNames);
        })
      .catch((error) => console.error('Error fetching tower equipments:', error));
  }, [id]);

  const handleTowerTypeChange = (event) => {
    const selectedType = event.target.value;
    setSelectedTowerType(selectedType);
    setSelectedTowerImage('');

    const selectedTypeInfo = towerTypes.find((item) => item.name === selectedType);
    if (selectedTypeInfo) {
      try {
        const imagePath = require(`../../assets/Towers/${selectedTypeInfo.image_location}`);
        setSelectedTowerImage(imagePath);
      } catch (error) {
        console.error('Error loading image:', error);
      }
    } else {
      setSelectedTowerImage('');
    }
  };

  const handleBackClick = () => {
    navigate('/tower-details');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleSave = (event) => {
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

    fetch(`http://localhost:8800/api/towers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Successfully updated tower:', data);
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
          navigate('/tower-details'); // Navigate back to the details page
        }, 1000);
      })
      .catch((error) => {
        console.error('Error updating tower:', error)
        Swal.fire({
          title: 'Error Creating Tower',
          html: `It is possible due to the following reasons:<br>
            <br>1. A tower might be already exists in this location (Latitude & Longitude).
            <br>2. Latitude, Longitude & Height must be a number.
            <br>3. Any missing fields.`,
          icon: 'error',
          customClass: {
            popup: styles['custom-swal-popup'],
            title: styles['custom-swal-title'],
            htmlContainer: styles['custom-swal-content'], // This applies your custom content styles
            confirmButton: styles['custom-swal-confirm-button'],
          },
          backdrop: `rgba(0,0,0,0.4)`, // Custom background overlay color
        });
    });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to delete this tower? This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      customClass: {
        popup: styles['custom-swal-popup'],
        title: styles['custom-swal-title'],
        htmlContainer: styles['custom-swal-content'],
        confirmButton: styles['custom-swal-confirm-button'],
        cancelButton: styles['custom-swal-cancel-button'],
      },
      backdrop: `rgba(0,0,0,0.4)`,
    });
  
    if (result.isConfirmed) {
      fetch(`http://localhost:8800/api/towers/${id}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Successfully deleted tower:', data);
          navigate('/tower-details'); // Navigate back to the details page
        })
        .catch((error) => console.error('Error deleting tower:', error));
    } else {
      console.log('Tower deletion was canceled');
    }
  };

  return (
    <div className={styles.AddNewTower}>
      <header className={styles.AddNewTowerHeader}>
        <div className={styles.HeaderContent}>
        <Link className={styles.Logo} to="/">
            <img src={logo} alt="Logo" className={styles.Logo} />
        </Link>
          <button onClick={handleHomeClick} className={styles.HomeButton}>
            <img src={homeButtonImage} alt="Back" className={styles.BackButtonImage} />
          </button>
          <button onClick={handleBackClick} className={styles.BackButton}>
            <img src={backButtonImage} alt="Back" className={styles.BackButtonImage} />
          </button>
          <h1 className={styles.Title}>Edit Tower</h1>
        </div>
        <div className={styles.Divider}></div>
        {showSuccessMessage && (
          <div className={styles.SuccessMessage}>
            Successfully Updated Tower
          </div>
        )}
        <div className={styles.Content}>
          <form className={styles.Form} onSubmit={handleSave}>
            <TowerTypeDropdown
              towerTypes={towerTypes}
              selectedTowerType={selectedTowerType}
              onTowerTypeChange={handleTowerTypeChange}
            />
            <div className={styles.FormGroup}>
              <label htmlFor="location" className={styles.Label}>Location</label>
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
                <label htmlFor="height" className={styles.SmallLabel}>
                  Height (meters)
                </label>
                <input
                  type="text"
                  id="height"
                  name="height"
                  className={styles.Input}
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
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
              Save
            </button>
            <button type="button" onClick={handleDelete} className={styles.MenuButton}>
              Delete
            </button>
          </form>
          <div className={styles.ImageContainer}>
            {selectedTowerImage && (
              <img
                src={selectedTowerImage}
                alt={selectedTowerType}
                className={`${styles.TowerImage}`}
              />
            )}
            {!selectedTowerImage && (
              <div className={styles.Placeholder}>No Tower Selected</div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
