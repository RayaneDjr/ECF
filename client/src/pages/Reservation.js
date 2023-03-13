import React, { useState } from "react";
import axios from "axios";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import "../styles/Reservation.css";

const Reservation = () => {
  const [reservationTimes, setReservationTimes] = useState([]);

  const assignTimes2 = async (e) => {
    const response = await axios.get("http://localhost:3001/schedule");
    const date = new Date(e.target.value);
    const times = [];

    const goodDay = response.data.filter(
      (item) =>
        item.day === date.toLocaleDateString("fr-FR", { weekday: "long" })
    );

    const data = goodDay[0];
    if (data.close) {
      times.push("fermé");
    }

    if (data.allDayOpeningTime) {
      const openingTime = new Date(`2000-01-01T${data.allDayOpeningTime}`);
      const closingTime = new Date(`2000-01-01T${data.allDayClosingTime}`);

      for (
        let i = openingTime;
        i <= closingTime;
        i.setMinutes(i.getMinutes() + 15)
      ) {
        if (i.getMinutes() !== 0) {
          const formatedTime = i.getHours() + "h" + i.getMinutes();
          times.push(formatedTime);
        } else {
          const formatedTime = i.getHours() + "h";
          times.push(formatedTime);
        }
      }
    }

    if (data.morningOpeningTime) {
      const morningOpeningTime = new Date(
        `2000-01-01T${data.morningOpeningTime}`
      );
      const morningClosingTime = new Date(
        `2000-01-01T${data.morningClosingTime}`
      );
      const eveningOpeningTime = new Date(
        `2000-01-01T${data.eveningOpeningTime}`
      );
      const eveningClosingTime = new Date(
        `2000-01-01T${data.eveningClosingTime}`
      );

      for (
        let i = morningOpeningTime;
        i <= morningClosingTime;
        i.setMinutes(i.getMinutes() + 15)
      ) {
        if (i.getMinutes() !== 0) {
          const formatedTime = i.getHours() + "h" + i.getMinutes();
          times.push(formatedTime);
        } else {
          const formatedTime = i.getHours() + "h";
          times.push(formatedTime);
        }
      }

      for (
        let i = eveningOpeningTime;
        i <= eveningClosingTime;
        i.setMinutes(i.getMinutes() + 15)
      ) {
        if (i.getMinutes() !== 0) {
          const formatedTime = i.getHours() + "h" + i.getMinutes();
          times.push(formatedTime);
        } else {
          const formatedTime = i.getHours() + "h";
          times.push(formatedTime);
        }
      }
    }

    console.log(times);
    setReservationTimes(times);
  };

  return (
    <div className='reservationContainer'>
      <Header />
      <div>
        <form className='reservationForm'>
          <label>Nom:</label>
          <input type='text' name='lastname' />

          <label>Prénom:</label>
          <input type='text' name='firstname' />

          <label>Email:</label>
          <input type='email' name='email' />

          <label>Date:</label>
          <input
            type='date'
            name='date'
            min={new Date().toISOString().split("T")[0]}
            onChange={assignTimes2}
          />

          <div>
            {/* <input type='radio' name='time' id='12' />
            <label htmlFor='12'>12h</label> */}
            {reservationTimes.length === 1 ? (
              <>
                <div>Fermé</div>
              </>
            ) : (
              <>
                {reservationTimes.length > 1 && <label>Heure:</label>}
                {reservationTimes.map((reservationTime) => {
                  return (
                    <div key={reservationTime}>
                      <input type='radio' name='time' id={reservationTime} />
                      <label htmlFor={reservationTime}>{reservationTime}</label>
                    </div>
                  );
                })}
              </>
            )}
          </div>

          <label>Nombre de convives:</label>
          <input type='number' name='guests' />

          <label>Allergies:</label>
          <input type='text' name='allergies' />

          <button
            type='button'
            className='createReservation'
            onClick={() => console.log(reservationTimes)}>
            Réserver
          </button>
        </form>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Reservation;
