import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Footer.css";

const Footer = () => {
  const [schedule, setSchedule] = useState([]);

  const assignSchedule = (data) => {
    let allSchedule = [];

    data.forEach((data) => {
      const daySchedule = { day: data.day };

      if (data.close) {
        daySchedule.message = "fermé";
      }

      if (data.allDayOpeningTime) {
        const keys = ["allDayOpeningTime", "allDayClosingTime"];
        const times = [];
        for (const key of keys) {
          if (new Date(`2000-01-01T${data[key]}`).getMinutes() !== 0) {
            const formatedTime =
              new Date(`2000-01-01T${data[key]}`).getHours() +
              "h" +
              new Date(`2000-01-01T${data[key]}`).getMinutes();
            times.push(formatedTime);
          } else {
            const formatedTime =
              new Date(`2000-01-01T${data[key]}`).getHours() + "h";
            times.push(formatedTime);
          }
        }
        daySchedule.message = (
          <span>
            {times[0]} - {times[1]}
          </span>
        );
      }

      if (data.morningOpeningTime) {
        const keys = [
          "morningOpeningTime",
          "morningClosingTime",
          "eveningOpeningTime",
          "eveningClosingTime",
        ];
        const times = [];
        for (const key of keys) {
          if (new Date(`2000-01-01T${data[key]}`).getMinutes() !== 0) {
            const formatedTime =
              new Date(`2000-01-01T${data[key]}`).getHours() +
              "h" +
              new Date(`2000-01-01T${data[key]}`).getMinutes();
            times.push(formatedTime);
          } else {
            const formatedTime =
              new Date(`2000-01-01T${data[key]}`).getHours() + "h";
            times.push(formatedTime);
          }
        }
        daySchedule.message = (
          <>
            <span>
              {times[0]} - {times[1]}
            </span>
            <span>
              {times[2]} - {times[3]}
            </span>
          </>
        );
      }

      allSchedule = [...allSchedule, daySchedule];
    });
    setSchedule(allSchedule);
  };

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get("http://localhost:3001/schedule");
        assignSchedule(response.data);
      } catch (error) {
        console.error("Unable to fetch schedule:", error);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <div className='footer'>
      <h3>Nos horaires d'ouvertures</h3>
      <div className='scheduleContainer'>
        {schedule.map((day, index) => {
          return (
            <div key={index} className='scheduleItem'>
              <div className='day'>{day.day}:</div>
              <div className='message'>{day.message}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Footer;
