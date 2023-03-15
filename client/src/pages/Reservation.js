import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import "../styles/Reservation.css";

const Reservation = () => {
  const [reservationTimes, setReservationTimes] = useState([]);
  const navigate = useNavigate();

  const assignTimes = async (e) => {
    try {
      const response = await axios.get("http://localhost:3001/schedule");
      const date = new Date(e.target.value);
      const times = [];

      const getDay = response.data.filter(
        (day) =>
          day.day === date.toLocaleDateString("fr-FR", { weekday: "long" })
      );

      const day = getDay[0];
      if (day.close) {
        times.push("fermé");
      }

      if (day.allDayOpeningTime) {
        const openingTime = new Date(`2000-01-01T${day.allDayOpeningTime}`);
        const closingTime = new Date(`2000-01-01T${day.allDayClosingTime}`);

        for (
          let i = openingTime;
          i <= closingTime;
          i.setMinutes(i.getMinutes() + 15)
        ) {
          if (i.getMinutes() !== 0) {
            const formatedTime = i.getHours() + "h" + i.getMinutes();
            times.push({ value: i.toLocaleTimeString(), time: formatedTime });
          } else {
            const formatedTime = i.getHours() + "h";
            times.push({ value: i.toLocaleTimeString(), time: formatedTime });
          }
        }
      }

      if (day.morningOpeningTime) {
        const morningOpeningTime = new Date(
          `2000-01-01T${day.morningOpeningTime}`
        );
        const morningClosingTime = new Date(
          `2000-01-01T${day.morningClosingTime}`
        );
        const eveningOpeningTime = new Date(
          `2000-01-01T${day.eveningOpeningTime}`
        );
        const eveningClosingTime = new Date(
          `2000-01-01T${day.eveningClosingTime}`
        );

        for (
          let i = morningOpeningTime;
          i <= morningClosingTime;
          i.setMinutes(i.getMinutes() + 15)
        ) {
          if (i.getMinutes() !== 0) {
            const formatedTime = i.getHours() + "h" + i.getMinutes();
            times.push({ value: i.toLocaleTimeString(), time: formatedTime });
          } else {
            const formatedTime = i.getHours() + "h";
            times.push({ value: i.toLocaleTimeString(), time: formatedTime });
          }
        }

        for (
          let i = eveningOpeningTime;
          i <= eveningClosingTime;
          i.setMinutes(i.getMinutes() + 15)
        ) {
          if (i.getMinutes() !== 0) {
            const formatedTime = i.getHours() + "h" + i.getMinutes();
            times.push({ value: i.toLocaleTimeString(), time: formatedTime });
          } else {
            const formatedTime = i.getHours() + "h";
            times.push({ value: i.toLocaleTimeString(), time: formatedTime });
          }
        }
      }

      console.log(times);
      setReservationTimes(times);
    } catch (error) {
      console.error("Unable to fetch schedule:", error);
    }
  };

  const initalValues = {
    lastname: "",
    firstname: "",
    email: "",
    date: "",
    time: "",
    guests: "",
    allergies: null,
  };

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/bookings", data).then(() => {
      navigate("/");
    });
  };

  const validationSchema = Yup.object().shape({
    lastname: Yup.string().required("Vous devez saisir un nom"),
    firstname: Yup.string().required("Vous devez saisir un prénom"),
    email: Yup.string()
      .email("Vous devez saisir une addresse email valide")
      .required("Vous devez saisir une addresse email valide"),
    date: Yup.date().required("Vous devez choisir une date"),
    time: Yup.string().required("Vous devez choisir une heure"),
    guests: Yup.number("Vous devez saisir un nombre entre 0 et 10")
      .min(0, "Vous devez saisir un nombre entre 0 et 10")
      .max(10, "Vous devez saisir un nombre entre 0 et 10")
      .required("Vous devez saisir le nombre d'invités"),
  });

  return (
    <div className='reservationPageContainer'>
      <Header />
      <div className='reservationContainer'>
        <Formik
          initialValues={initalValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}>
          {({ handleChange, values }) => (
            <Form className='reservationForm'>
              <h2>Réserver</h2>
              <div className='inputContainer'>
                <label>Nom:</label>
                <ErrorMessage
                  name='lastname'
                  component='span'
                  className='error'
                />
                <Field type='text' name='lastname' />
              </div>

              <div className='inputContainer'>
                <label>Prénom:</label>
                <ErrorMessage
                  name='firstname'
                  component='span'
                  className='error'
                />
                <Field type='text' name='firstname' />
              </div>

              <div className='inputContainer'>
                <label>Email:</label>
                <ErrorMessage name='email' component='span' className='error' />
                <Field type='email' name='email' />
              </div>

              <div className='inputContainer'>
                <label>Date:</label>
                <ErrorMessage name='date' component='span' className='error' />
                <Field
                  type='date'
                  name='date'
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => {
                    handleChange(e);
                    assignTimes(e);
                  }}
                />
              </div>

              <div className='inputContainer'>
                {reservationTimes.length === 1 ? (
                  <>
                    <ErrorMessage
                      name='time'
                      component='span'
                      className='error'
                    />
                    <div>Fermé</div>
                  </>
                ) : (
                  <>
                    {reservationTimes.length > 1 && (
                      <>
                        <label>Heure:</label>
                        <ErrorMessage
                          name='time'
                          component='span'
                          className='error'
                        />
                        <div className='timesContainer'>
                          {reservationTimes.map((reservationTime) => {
                            return (
                              <div key={reservationTime.value}>
                                <Field
                                  type='radio'
                                  name='time'
                                  id={reservationTime.value}
                                  value={reservationTime.value}
                                />
                                <label
                                  htmlFor={reservationTime.value}
                                  className='times'>
                                  {reservationTime.time}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>

              <div className='inputContainer'>
                <label>Nombre de convives:</label>
                <ErrorMessage
                  name='guests'
                  component='span'
                  className='error'
                />
                <Field type='number' name='guests' />
              </div>

              <div className='inputContainer'>
                <label>Allergies:</label>
                <Field type='text' name='allergies' />
              </div>

              <button type='submit' className='createReservation'>
                Réserver
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Reservation;
