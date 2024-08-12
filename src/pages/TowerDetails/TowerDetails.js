import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TowerDetails.module.scss';
import backButtonImage from '../../assets/buttons/back.png';
import logo from '../../assets/logo/edotco-wlogo.png';
import editIcon from '../../assets/buttons/edit.png';
import deleteIcon from '../../assets/buttons/delete.png';

const TowerDetails = () => {
  const [towers, setTowers] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8800/api/towers')
      .then((response) => response.json())
      .then((data) => setTowers(data))
      .catch((error) => console.error('Error fetching towers:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:8800/api/created_equipments')
      .then((response) => response.json())
      .then((data) => setEquipments(data))
      // .then((data) => {
      //   const equipmentNames = data.map(equipment => equipment.name);
      //   setEquipments(equipmentNames);
      // })
      .catch((error) => console.error('Error fetching equipments:', error));
  }, []);

  const handleEdit = (tower) => {
    navigate(`/edit-tower/${tower.creation_id}`);
  };

  const handleDelete = (tower) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this tower?");
    if (confirmDelete) {
      fetch(`http://localhost:8800/api/towers/${tower.creation_id}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then(() => {
          setTowers(towers.filter((t) => t.creation_id !== tower.creation_id));
        })
        .catch((error) => console.error('Error deleting tower:', error));
    }
  };
  
  const handleBackClick = () => {
    navigate('/add-new-tower');
  };

  const getTowerEquipments = (towerCreationId) => {
    return equipments
      .filter((equipment) => equipment.creation_id === towerCreationId)
      .map((equipment) => equipment.name)
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
                <th>Height(m)</th>
                <th>Equipments</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {towers.map((tower) => (
                <tr key={tower.creation_id}>
                  <td>{tower.creation_id}</td>
                  <td>{tower.longitude}</td>
                  <td>{tower.latitude}</td>
                  <td>{tower.tower_name}</td>
                  <td>{tower.height}</td>
                  <td>{getTowerEquipments(tower.creation_id)}</td>
                  <td>{tower.status}</td>
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
