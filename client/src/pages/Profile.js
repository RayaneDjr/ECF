import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import "../styles/Inscription.css";
import { AuthContext } from "../helpers/AuthContext";

const Profile = () => {
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);
  const [initalValues, setInitialValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    guests: undefined,
    allergies: undefined,
  });

  const onSubmit = (data) => {
    axios
      .put("http://localhost:3001/users/update", data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          localStorage.setItem("accessToken", response.data.token);
          setAuthState({
            id: response.data.id,
            firstname: response.data.firstname,
            lastname: response.data.lastname,
            email: response.data.email,
            role: response.data.role,
            guests: response.data.guests,
            allergies: response.data.allergies,
            status: true,
          });
          navigate("/");
        }
      })
      .catch((error) => console.error("Error in submit:", error));
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("Vous devez saisir un prénom"),
    lastname: Yup.string().required("Vous devez saisir un nom"),
    oldPassword: Yup.string().required(
      "Vous devez saisir votre ancien mot de passe"
    ),
    email: Yup.string()
      .email("Vous devez saisir une addresse email valide")
      .required("Vous devez saisir une addresse email valide"),
    guests: Yup.number("Vous devez saisir un nombre entre 0 et 10")
      .min(0, "Vous devez saisir un nombre entre 0 et 10")
      .max(10, "Vous devez saisir un nombre entre 0 et 10")
      .required("Vous devez saisir un nombre entre 0 et 10"),
  });

  useEffect(() => {
    setInitialValues({
      firstname: authState.firstname,
      lastname: authState.lastname,
      email: authState.email,
      oldPassword: "",
      newPassword: "",
      guests: authState.guests,
      allergies: authState.allergies,
    });
  }, [authState]);

  return (
    <Formik
      enableReinitialize
      initialValues={initalValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      <Form className='box inscription'>
        <h2>Mon compte</h2>

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
          <label>Ancien mot de passe:</label>
          <ErrorMessage name='oldPassword' component='span' className='error' />
          <Field type='password' name='oldPassword' />
        </div>

        <div className='inputContainer'>
          <label>Nouveau mot de passe:</label>
          <ErrorMessage name='newPassword' component='span' className='error' />
          <Field type='password' name='newPassword' />
        </div>

        <div className='inputContainer'>
          <label>Nombre de convives par défaut:</label>
          <ErrorMessage name='guests' component='span' className='error' />
          <Field type='number' name='guests' />
        </div>

        <div className='inputContainer'>
          <label>Allergies:</label>
          <Field type='text' name='allergies' />
        </div>

        <button type='submit' className='submit'>
          Modifier
        </button>
      </Form>
    </Formik>
  );
};

export default Profile;
