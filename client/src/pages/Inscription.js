import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import "../styles/Inscription.css";

const Inscription = () => {
  const navigate = useNavigate();

  const initalValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    guests: undefined,
    allergies: undefined,
  };

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/users", data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          navigate("/");
        }
      })
      .catch((error) => console.error("Error in submit:", error));
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("Vous devez saisir un prénom"),
    lastname: Yup.string().required("Vous devez saisir un nom"),
    password: Yup.string().required("Vous devez saisir un mot de passe"),
    email: Yup.string()
      .email("Vous devez saisir une addresse email valide")
      .required("Vous devez saisir une addresse email valide"),
    guests: Yup.number("Vous devez saisir un nombre entre 0 et 9")
      .min(0, "Vous devez saisir un nombre entre 0 et 9")
      .max(9, "Vous devez saisir un nombre entre 0 et 9")
      .required("Vous devez saisir un nombre entre 0 et 9"),
  });

  return (
    <Formik
      initialValues={initalValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      <Form className='box inscription'>
        <h2>Créer un compte</h2>

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
          <label>Mot de passe:</label>
          <ErrorMessage name='password' component='span' className='error' />
          <Field type='password' name='password' />
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
          Créer
        </button>
      </Form>
    </Formik>
  );
};

export default Inscription;
