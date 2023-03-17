import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import Carte from "../components/Carte";
import * as Yup from "yup";
import "../styles/GererCarte.css";

const GererCarte = () => {
  const [reload, setReload] = useState(false);

  const dishInitialValues = {
    title: "",
    description: "",
    price: "",
    category: "",
  };

  const menuInitialValues = {
    title: "",
    description: "",
    price: "",
    when: "",
  };

  const dishOnSubmit = (data, { resetForm }) => {
    axios
      .post("http://localhost:3001/dishes", data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        resetForm();
        setReload(!reload);
      });
  };

  const menuOnSubmit = (data, { resetForm }) => {
    axios
      .post("http://localhost:3001/menus", data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        resetForm();
        setReload(!reload);
      });
  };

  const dishValidationSchema = Yup.object().shape({
    title: Yup.string().required("Vous devez saisir un titre"),
    description: Yup.string().required("Vous devez saisir une description"),
    price: Yup.number().required("Vous devez saisir un prix"),
    category: Yup.string().required("Vous devez saisir une catégorie"),
  });

  const menuValidationSchema = Yup.object().shape({
    title: Yup.string().required("Vous devez saisir un titre"),
    description: Yup.string().required("Vous devez saisir une description"),
    price: Yup.number().required("Vous devez saisir un prix"),
    when: Yup.string(),
  });

  return (
    <div>
      <div className='formsContainer'>
        <Formik
          enableReinitialize
          initialValues={dishInitialValues}
          onSubmit={dishOnSubmit}
          validationSchema={dishValidationSchema}>
          <Form className='box dishForm'>
            <h2>Ajouter un plat</h2>
            <div className='inputContainer'>
              <label>Titre:</label>
              <ErrorMessage name='title' component='span' className='error' />
              <Field type='text' name='title' />
            </div>

            <div className='inputContainer'>
              <label>Description:</label>
              <ErrorMessage
                name='description'
                component='span'
                className='error'
              />
              <Field type='text' name='description' />
            </div>

            <div className='inputContainer'>
              <label>Prix:</label>
              <ErrorMessage name='price' component='span' className='error' />
              <Field type='number' name='price' />
            </div>

            <div className='inputContainer'>
              <label>Catégorie:</label>
              <ErrorMessage
                name='category'
                component='span'
                className='error'
              />
              <Field type='text' name='category' />
            </div>

            <button type='submit' className='submit'>
              Ajouter
            </button>
          </Form>
        </Formik>

        <Formik
          enableReinitialize
          initialValues={menuInitialValues}
          onSubmit={menuOnSubmit}
          validationSchema={menuValidationSchema}>
          <Form className='box menuForm'>
            <h2>Ajouter un menu</h2>
            <div className='inputContainer'>
              <label>Titre:</label>
              <ErrorMessage name='title' component='span' className='error' />
              <Field type='text' name='title' />
            </div>

            <div className='inputContainer'>
              <label>Description:</label>
              <ErrorMessage
                name='description'
                component='span'
                className='error'
              />
              <Field type='text' name='description' />
            </div>

            <div className='inputContainer'>
              <label>Prix:</label>
              <ErrorMessage name='price' component='span' className='error' />
              <Field type='number' name='price' />
            </div>

            <div className='inputContainer'>
              <label>Quand:</label>
              <ErrorMessage name='when' component='span' className='error' />
              <Field type='text' name='when' />
            </div>

            <button type='submit' className='submit'>
              Ajouter
            </button>
          </Form>
        </Formik>
      </div>
      <div>
        <Carte enableDelete={true} reload={reload} />
      </div>
    </div>
  );
};

export default GererCarte;
