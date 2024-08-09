import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TowerDetails.module.scss';
import backButtonImage from '../../assets/buttons/back.png';
import logo from '../../assets/logo/edotco-wlogo.png'; // Adjust the path as necessary
import editIcon from '../../assets/buttons/edit.png'; // Adjust the path as necessary
import deleteIcon from '../../assets/buttons/delete.png'; // Adjust the path as necessary

const TowerDetails = () => {
  const [towers, setTowers] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/api/towers')
      .then((response) => response.json())
      .then((data) => setTowers(data))
      .catch((error) => console.error('Error fetching towers:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/api/created_equipments')
      .then((response) => response.json())
      .then((data) => setEquipments(data))
      .catch((error) => console.error('Error fetching equipments:', error));
  }, []);

  const handleEdit = (tower) => {
    // Handle edit functionality
  };

  const handleDelete = (tower) => {
    // Handle delete functionality
  };

  const handleBackClick = () => {
    navigate('/add-new-tower');
  };

  const getTowerEquipments = (towerCreationId) => {
    return equipments
      .filter((equipment) => equipment.creation_id === towerCreationId)
      .map((equipment) => equipment.equipment_id)
      .join(', ');
  };

  return (
    <div className={styles.AddNewTower}>
      <header className={styles.AddNewTowerHeader}>
        <div className={styles.HeaderContent}>
          <img src={logo} alt="Logo" className={styles.Logo} />
          <button onClick={handleBackClick} className={styles.BackButton}>
            <img src={backButtonImage} alt="Back" className={styles.BackButtonImage} />
          </button>
          <h1 className={styles.Title}>Edit Tower Details</h1>
        </div>
        <div className={styles.Divider}></div>
        <div className={styles.TowerDetails}>
          <table className={styles.Table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Longitude</th>
                <th>Latitude</th>
                <th>Tower Type</th>
                <th>Height</th>
                <th>Equipments</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {towers.map((tower) => (
                <tr key={tower.creation_id}>
                  <td>{tower.creation_id}</td>
                  <td>{tower.longitude}</td>
                  <td>{tower.latitude}</td>
                  <td>{tower.tower_id}</td>
                  <td>{tower.height}</td>
                  <td>{getTowerEquipments(tower.creation_id)}</td>
                  <td>
                    <button onClick={() => handleEdit(tower)} className={styles.IconButton}>
                      <img src={editIcon} alt="Edit" className={styles.Icon} />
                    </button>
                    <button onClick={() => handleDelete(tower)} className={styles.IconButton}>
                      <img src={deleteIcon} alt="Delete" className={styles.Icon} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </header>
    </div>
  );
};

export default TowerDetails;
