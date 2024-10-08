import React, { useState, useEffect } from 'react';
import './evento.css';

function Evento() {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const modal = document.getElementById("myModal");
    const btn = document.getElementById("myBtn");
    const span = document.getElementsByClassName("close")[0];

    btn.addEventListener('click', () => {
      setModalVisible(true);
    });

    span.addEventListener('click', () => {
      setModalVisible(false);
    });

    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        setModalVisible(false);
      }
    });

    return () => {
      btn.removeEventListener('click', () => {});
      span.removeEventListener('click', () => {});
      window.removeEventListener('click', () => {});
    };
  }, []);

  return (
    <div>
      <button id="myBtn" onClick={() => setModalVisible(true)}>Open Modal</button>
      <div id="myModal" style={{ display: modalVisible ? 'block' : 'none' }}>
        <span className="close" onClick={() => setModalVisible(false)}>×</span>
        <div className='modal-content'>
            <h2> Aggiungi Evento </h2>
            <p> qui metteremo il form </p>
            
            <form>
                <div>
                <label for="titolo"> Titolo evento</label>
                <input type='text' name='titolo'/>
                </div>
                <div>
                <label for="data"> Data evento</label>
                <input type="date" name="data" />
                </div>
            </form>

        </div>
      </div>
    </div>
  );
};

export default Evento;