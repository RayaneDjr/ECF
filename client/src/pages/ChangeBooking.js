import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ChangeBooking = () => {
  const { id } = useParams();
  const [reservationTimes, setReservationTimes] = useState([]);
  const navigate = useNavigate();
  const [settingsReceived, setSettingsReceived] = useState(false);
  const [bookingReceived, setBookingReceived] = useState(false);
  const [currentBooking, setCurrentBooking] = useState({});
  const [initalValues, setInitialValues] = useState({ date: new Date() });
  const [settings, setSettings] = useState([]);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const assignTimes = async (selectedDate) => {
    try {
      const response = await axios.get("http://localhost:3001/schedule");
      const date = new Date(selectedDate);
      const bookings = await axios.get(
        `http://localhost:3001/bookings/byDate/${date.toISOString()}`
      );
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
            times.push({
              value: i.toLocaleTimeString(),
              time: formatedTime,
              people: 0,
            });
          } else {
            const formatedTime = i.getHours() + "h";
            times.push({
              value: i.toLocaleTimeString(),
              time: formatedTime,
              people: 0,
            });
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
            times.push({
              value: i.toLocaleTimeString(),
              time: formatedTime,
              people: 0,
            });
          } else {
            const formatedTime = i.getHours() + "h";
            times.push({
              value: i.toLocaleTimeString(),
              time: formatedTime,
              people: 0,
            });
          }
        }

        for (
          let i = eveningOpeningTime;
          i <= eveningClosingTime;
          i.setMinutes(i.getMinutes() + 15)
        ) {
          if (i.getMinutes() !== 0) {
            const formatedTime = i.getHours() + "h" + i.getMinutes();
            times.push({
              value: i.toLocaleTimeString(),
              time: formatedTime,
              people: 0,
            });
          } else {
            const formatedTime = i.getHours() + "h";
            times.push({
              value: i.toLocaleTimeString(),
              time: formatedTime,
              people: 0,
            });
          }
        }
      }

      bookings.data.forEach((booking) => {
        const bookingTime = new Date(`2020-01-01T${booking.time}`);
        const end = new Date(`2020-01-01T${booking.time}`);
        end.setMinutes(end.getMinutes() + settings[0].timeToEat);

        for (let i = bookingTime; i < end; i.setMinutes(i.getMinutes() + 15)) {
          times.forEach((time) => {
            if (time.value === i.toLocaleTimeString()) {
              time.people += booking.guests + 1;
            }
          });
        }
      });

      const currentBookingTime = new Date(`2020-01-01T${currentBooking.time}`);
      const end = new Date(`2020-01-01T${currentBooking.time}`);
      end.setMinutes(end.getMinutes() + settings[0].timeToEat);

      for (
        let i = currentBookingTime;
        i < end;
        i.setMinutes(i.getMinutes() + 15)
      ) {
        times.forEach((time) => {
          if (time.value === i.toLocaleTimeString()) {
            time.people -= currentBooking.guests + 1;
          }
        });
      }
      setReservationTimes(times);
    } catch (error) {
      console.error("Unable to fetch schedule or bookings:", error);
    }
  };

  const onSubmit = (values) => {
    const data = values;
    data.date = data.date.toISOString().split("T")[0];
    axios
      .put(`http://localhost:3001/bookings/${currentBooking.id}`, data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.error("Error in submit:", error));
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("Vous devez saisir un prénom"),
    lastname: Yup.string().required("Vous devez saisir un nom"),
    email: Yup.string()
      .email("Vous devez saisir une addresse email valide")
      .required("Vous devez saisir une addresse email valide"),
    date: Yup.date().required("Vous devez choisir une date"),
    time: Yup.string().required("Vous devez choisir une heure"),
    guests: Yup.number("Vous devez saisir un nombre entre 0 et 10")
      .min(0, "Vous devez saisir un nombre entre 0 et 9")
      .max(9, "Vous devez saisir un nombre entre 0 et 9")
      .required("Vous devez saisir un nombre entre 0 et 9")
      .typeError("Vous devez saisir un nombre entre 0 et 9"),
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get("http://localhost:3001/settings");
        setSettings(response.data);
        setSettingsReceived(true);
      } catch (error) {
        console.error("Unable to fetch settings:", error);
      }
    };

    fetchSettings();
  }, []);

  useEffect(() => {
    if (settingsReceived) {
      const fetchBookings = async (date) => {
        try {
          const response = await axios.get(
            `http://localhost:3001/bookings/byId/${id}`,
            {
              headers: {
                accessToken: localStorage.getItem("accessToken"),
              },
            }
          );
          setInitialValues({
            firstname: response.data.firstname,
            lastname: response.data.lastname,
            email: response.data.email,
            date: new Date(response.data.date),
            time: response.data.time,
            guests: response.data.guests,
            allergies: response.data.allergies,
            UserId: response.data.id,
          });
          setCurrentBooking(response.data);
          setBookingReceived(true);
        } catch (error) {
          console.error("Unable to fetch bookings", error);
        }
      };

      fetchBookings();
    }
  }, [settingsReceived, id]);

  useEffect(() => {
    if (bookingReceived) {
      assignTimes(currentBooking.date);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingReceived]);

  return (
    <Formik
      enableReinitialize
      initialValues={initalValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ handleChange, values, setValues }) => (
        <Form className='box reservationFormContainer'>
          <h2>Réserver</h2>

          <div className='inputContainer'>
            <label>Prénom:</label>
            <ErrorMessage name='firstname' component='span' className='error' />
            <Field type='text' name='firstname' />
          </div>

          <div className='inputContainer'>
            <label>Nom:</label>
            <ErrorMessage name='lastname' component='span' className='error' />
            <Field type='text' name='lastname' />
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
              value={values.date.toISOString().split("T")[0]}
              min={tomorrow.toISOString().split("T")[0]}
              onChange={(e) => {
                handleChange(e);
                setValues({ ...values, date: new Date(e.target.value) });
                assignTimes(e.target.value, values, setValues);
              }}
            />
          </div>

          <div className='inputContainer'>
            {reservationTimes.length === 1 ? (
              <>
                <ErrorMessage name='time' component='span' className='error' />
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
                            {reservationTime.people < settings[0].maxGuests && (
                              <div>
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
                            )}
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
            <ErrorMessage name='guests' component='span' className='error' />
            <Field type='number' name='guests' />
          </div>

          <div className='inputContainer'>
            <label>Allergies:</label>
            <Field type='text' name='allergies' />
          </div>

          <button type='submit' className='submit'>
            Réserver
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ChangeBooking;
