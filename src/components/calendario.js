import React, { useState, useEffect } from 'react';
import Evento from './evento';
import './calendario.css'; // Importa il file CSS per gli stili

const Calendario = () => {
  // Stati per anno, mese e giorni del mese
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [days, setDays] = useState([]);

  // Nomi dei mesi e dei giorni
  const monthNames = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
  ];

  const dayNames = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

  // Funzione che calcola il numero di giorni in un mese
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Funzione che calcola il giorno della settimana del primo giorno del mese
  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  useEffect(() => {
    // Calcola i giorni e gli spazi vuoti per allineare correttamente il calendario
    const daysInMonth = getDaysInMonth(month, year);
    const firstDayOfMonth = getFirstDayOfMonth(month, year) || 7; // Imposta Domenica come 7
    const blankDays = Array(firstDayOfMonth - 1).fill(null); // Spazi vuoti prima del primo giorno
    const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1); // Giorni del mese
    setDays([...blankDays, ...monthDays]); // Unisci spazi vuoti e giorni
  }, [month, year]);

  // Funzione per cambiare mese
  const changeMonth = (direction) => {
    if (direction === 'prev') {
      setMonth((prev) => (prev === 0 ? 11 : prev - 1));
      if (month === 0) setYear((prev) => prev - 1); // Decrementa l'anno se siamo a Gennaio
    } else {
      setMonth((prev) => (prev === 11 ? 0 : prev + 1));
      if (month === 11) setYear((prev) => prev + 1); // Incrementa l'anno se siamo a Dicembre
    }
  };


  return (
    <div className="calendar-container">
      {/* Intestazione con navigazione tra i mesi */}
      <div className="calendar-header">
        <button className="btn btn-outline-primary" onClick={() => changeMonth('prev')}>Mese precedente</button>
        <h2>{monthNames[month]} {year}</h2>
        <Evento/>
        <button className="btn btn-outline-primary" onClick={() => changeMonth('next')}>Mese successivo</button>
      </div>

      {/* Giorni della settimana */}
      <div className="calendar-grid">
        {dayNames.map((day) => (
          <div className="calendar-day-name" key={day}>{day}</div>
        ))}

        {/* Giorni del mese */}
        {days.map((day, index) => (
          <div key={index} className={`calendar-day ${day ? '' : 'empty'}`}>
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendario;
