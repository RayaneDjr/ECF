import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Footer.css";

const Footer = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      const response = await axios.get("http://localhost:3001/schedule");

      const assignSchedule = (response) => {
        let allSchedule = [];

        response.data.forEach((day) => {
          const daySchedule = {};

          if (day.close) {
            daySchedule.day = day.day;
            daySchedule.message = "fermé";
          }

          if (day.allDayOpeningTime) {
            daySchedule.day = day.day;
            const keys = ["allDayOpeningTime", "allDayClosingTime"];
            const times = [];
            for (const key of keys) {
              if (new Date(`2000-01-01T${day[key]}`).getMinutes() !== 0) {
                const formatedTime =
                  new Date(`2000-01-01T${day[key]}`).getHours() +
                  "h" +
                  new Date(`2000-01-01T${day[key]}`).getMinutes();
                times.push(formatedTime);
              } else {
                const formatedTime =
                  new Date(`2000-01-01T${day[key]}`).getHours() + "h";
                times.push(formatedTime);
              }
            }
            daySchedule.message = (
              <span>
                {times[0]} - {times[1]}
              </span>
            );
          }

          if (day.morningOpeningTime) {
            daySchedule.day = day.day;
            const keys = [
              "morningOpeningTime",
              "morningClosingTime",
              "eveningOpeningTime",
              "eveningClosingTime",
            ];
            const times = [];
            for (const key of keys) {
              if (new Date(`2000-01-01T${day[key]}`).getMinutes() !== 0) {
                const formatedTime =
                  new Date(`2000-01-01T${day[key]}`).getHours() +
                  "h" +
                  new Date(`2000-01-01T${day[key]}`).getMinutes();
                times.push(formatedTime);
              } else {
                const formatedTime =
                  new Date(`2000-01-01T${day[key]}`).getHours() + "h";
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
        console.log(allSchedule);
        setSchedule(allSchedule);
      };

      assignSchedule(response);
    };

    fetchSchedule();
  }, []);

  return (
    <div className='footer'>
      <h2>Nos horaires d'ouvertures</h2>
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