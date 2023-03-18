import axios from "axios";
import React, { useContext, useState } from "react";
import { Reload } from "../helpers/Reload";
import "../styles/Settings.css";

const Settings = () => {
  const { reload, setReload } = useContext(Reload);
  const [day, setDay] = useState("");
  const [when, setWhen] = useState("");
  const [error, setError] = useState(false);
  const [otherError, setOtherError] = useState(false);
  const [allDayOpeningTime, setAllDayOpeningTime] = useState("");
  const [allDayClosingTime, setAllDayClosingTime] = useState("");
  const [morningOpeningTime, setMorningOpeningTime] = useState("");
  const [morningClosingTime, setMorningClosingTime] = useState("");
  const [eveningOpeningTime, setEveningOpeningTime] = useState("");
  const [eveningClosingTime, setEveningClosingTime] = useState("");

  const onBlur = (value) => {
    if (!value) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleDay = (e) => {
    setDay(e.target.value);
    setWhen("");
    setAllDayOpeningTime("");
    setAllDayClosingTime("");
    setMorningOpeningTime("");
    setMorningClosingTime("");
    setEveningOpeningTime("");
    setEveningClosingTime("");
  };

  const handleWhen = (e) => {
    setWhen(e.target.value);
    setAllDayOpeningTime("");
    setAllDayClosingTime("");
    setMorningOpeningTime("");
    setMorningClosingTime("");
    setEveningOpeningTime("");
    setEveningClosingTime("");
  };

  const handleAllDayOT = (e) => {
    if (!e.target.value) {
      setError(true);
    } else {
      setError(false);
      setAllDayOpeningTime(e.target.value);
    }
  };

  const handleAllDayCT = (e) => {
    setAllDayClosingTime(e.target.value);
  };

  const handleMorningOT = (e) => {
    setMorningOpeningTime(e.target.value);
  };

  const handleMorningCT = (e) => {
    setMorningClosingTime(e.target.value);
  };

  const handleEveningOT = (e) => {
    setEveningOpeningTime(e.target.value);
  };

  const handleEveningCT = (e) => {
    setEveningClosingTime(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (when !== "close") {
      if (
        (allDayOpeningTime && allDayClosingTime) ||
        (morningOpeningTime &&
          morningClosingTime &&
          eveningOpeningTime &&
          eveningClosingTime)
      ) {
        setOtherError(false);
        axios
          .put(
            "http://localhost:3001/schedule",
            {
              day,
              close: null,
              allDayOpeningTime,
              allDayClosingTime,
              morningOpeningTime,
              morningClosingTime,
              eveningOpeningTime,
              eveningClosingTime,
            },
            {
              headers: {
                accessToken: localStorage.getItem("accessToken"),
              },
            }
          )
          .then(() => {
            setReload(!reload);
            setDay("");
            setWhen("");
            setAllDayOpeningTime("");
            setAllDayClosingTime("");
            setMorningOpeningTime("");
            setMorningClosingTime("");
            setEveningOpeningTime("");
            setEveningClosingTime("");
          })
          .catch((error) => console.error("Error in submit:", error));
      } else {
        setOtherError(true);
      }
    } else {
      axios
        .put(
          "http://localhost:3001/schedule",
          {
            day,
            close: true,
            allDayOpeningTime,
            allDayClosingTime,
            morningOpeningTime,
            morningClosingTime,
            eveningOpeningTime,
            eveningClosingTime,
          },
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        )
        .then(() => {
          setReload(!reload);
          setDay("");
          setWhen("");
          setAllDayOpeningTime("");
          setAllDayClosingTime("");
          setMorningOpeningTime("");
          setMorningClosingTime("");
          setEveningOpeningTime("");
          setEveningClosingTime("");
        })
        .catch((error) => console.error("Error in submit:", error));
    }
  };

  return (
    <div>
      <form className='box scheduleSettings' onSubmit={onSubmit}>
        <h2>Gérer les horaires</h2>
        <div className='inputContainer'>
          {otherError && <span className='error'>Remplissez les horaires</span>}
          <label>Sélectionner un jour:</label>
          <select name='days' onChange={handleDay} value={day}>
            <option value=''></option>
            <option value='lundi'>lundi</option>
            <option value='mardi'>mardi</option>
            <option value='mercredi'>mercredi</option>
            <option value='jeudi'>jeudi</option>
            <option value='vendredi'>vendredi</option>
            <option value='samedi'>samedi</option>
            <option value='dimanche'>dimanche</option>
          </select>
        </div>
        {day && (
          <div className='inputContainer'>
            <label>Sélectionner quand le restaurant est ouvert</label>
            <select onChange={handleWhen} value={when}>
              <option value=''></option>
              <option value='close'>fermé</option>
              <option value='allDay'>toute la journée</option>
              <option value='morningEvening'>midi/soir</option>
            </select>
          </div>
        )}
        {when === "allDay" && (
          <div className='inputContainer'>
            <label>Entrez les horaires:</label>
            {error && (
              <span className='error'>Entrez correctement les horaires</span>
            )}
            <div>
              <input
                type='time'
                onChange={handleAllDayOT}
                value={allDayOpeningTime}
                onBlur={() => onBlur(allDayOpeningTime)}
              />
              <span> - </span>
              <input
                type='time'
                onChange={handleAllDayCT}
                value={allDayClosingTime}
                onBlur={() => onBlur(allDayClosingTime)}
              />
            </div>
          </div>
        )}
        {when === "morningEvening" && (
          <div className='inputContainer'>
            <label>Entrez les horaires:</label>
            {error && (
              <span className='error'>Entrez correctement les horaires</span>
            )}
            <span className='morningEvening'>Midi:</span>
            <div>
              <input
                type='time'
                onChange={handleMorningOT}
                value={morningOpeningTime}
                onBlur={() => onBlur(morningOpeningTime)}
              />
              <span> - </span>
              <input
                type='time'
                onChange={handleMorningCT}
                value={morningClosingTime}
                onBlur={() => onBlur(morningClosingTime)}
              />
            </div>
            <span className='morningEvening'>Soir:</span>
            <div>
              <input
                type='time'
                onChange={handleEveningOT}
                value={eveningOpeningTime}
                onBlur={() => onBlur(eveningOpeningTime)}
              />
              <span> - </span>
              <input
                type='time'
                onChange={handleEveningCT}
                value={eveningClosingTime}
                onBlur={() => onBlur(eveningClosingTime)}
              />
            </div>
          </div>
        )}
        <button type='submit' className='submit'>
          Modifier
        </button>
      </form>
    </div>
  );
};

export default Settings;
