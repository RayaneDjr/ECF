import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({});

  const onSubmit = (data, { resetForm }) => {
    axios
      .put("http://localhost:3001/settings", data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        resetForm();
        navigate("/administration");
      })
      .catch((error) => console.error("Error in submit", error));
  };

  const validationSchema = Yup.object().shape({
    maxGuests: Yup.number("Vous devez saisir un nombre").required(
      "Vous devez saisir un nombre"
    ),
    timeToEat: Yup.number("Vous devez saisir un nombre").required(
      "Vous devez saisir un nombre"
    ),
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get("http://localhost:3001/settings");
        setInitialValues({
          maxGuests: response.data[0].maxGuests,
          timeToEat: response.data[0].timeToEat,
        });
      } catch (error) {
        console.error("Unable to fetch settings:", error);
      }
    };

    fetchSettings();
  });

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
        <Form className='box'>
          <h2>Paramètres</h2>
          <div className='inputContainer'>
            <label>Capacité du restaurant:</label>
            <ErrorMessage name='maxGuests' component='span' className='error' />
            <Field name='maxGuests' type='number' />
          </div>

          <div className='inputContainer'>
            <label>Temps d'une réservation: (en minutes)</label>
            <ErrorMessage name='timeToEat' component='span' className='error' />
            <Field name='timeToEat' type='number' />
          </div>
          <button type='submit' className='submit'>
            Modifier
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Settings;
