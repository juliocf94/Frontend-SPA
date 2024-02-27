import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import AxiosManager from "../../utils/AxiosManager"; // Importa la clase AxiosManager

function VisitorRegistrationForm({ onDataUpdate }) {
  const [visitorData, setVisitorData] = useState({
    dui: "",
    name: "",
    email: "",
    birth_date: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisitorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    Object.keys(visitorData).forEach((key) => {
      if (!visitorData[key]) {
        errors[key] = "Este campo es obligatorio";
      } else {
        errors[key] = ""; // Limpiar el mensaje de error si el campo no está vacío
      }
    });

    // Validar el número de teléfono
    if (!/^\d{8}$/.test(visitorData.phone)) {
      errors.phone = "El número de teléfono debe tener 8 dígitos";
    }

    // Validar el número de DUI
    if (!/^\d{8}-\d$/.test(visitorData.dui)) {
      errors.dui = "El número de DUI debe tener el formato 00000000-0";
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(visitorData.birth_date)) {
      errors.birth_date = "El formato de fecha debe ser YYYY-MM-DD";
    }

    if (!/^[A-Z\s]+$/.test(visitorData.name)) {
      errors.name = "El nombre debe contener solo letras mayúsculas";
    }

    setErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Crear una instancia de AxiosManager con la URL base de tu backend de Laravel
      const axiosManager = new AxiosManager("http://127.0.0.1:8000/api");

      try {
        // Enviar los datos del formulario al endpoint correspondiente en tu backend
        const response = await axiosManager.post("visitors", visitorData, true);
        console.log("Respuesta del backend:", response);

        // Limpiar el formulario después de enviar los datos
        setVisitorData({
          dui: "",
          name: "",
          email: "",
          birth_date: "",
          phone: "",
        });
        onDataUpdate();
      } catch (error) {
        console.error("Error al enviar los datos:", error);
      }
    } else {
      console.log("Formulario inválido:", errors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="DUI"
            name="dui"
            value={visitorData.dui}
            onChange={handleChange}
            error={Boolean(errors.dui)}
            helperText={errors.dui}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nombre"
            name="name"
            value={visitorData.name}
            onChange={handleChange}
            error={!!errors.name} // Verificar si hay un mensaje de error para el campo 'name'
            helperText={errors.name} // Mostrar el mensaje de error si existe
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            value={visitorData.email}
            onChange={handleChange}
            error={!!errors.email} // Verificar si hay un mensaje de error para el campo 'email'
            helperText={errors.email} // Mostrar el mensaje de error si existe
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            name="birth_date"
            value={visitorData.birth_date}
            onChange={handleChange}
            error={!!errors.birth_date} // Verificar si hay un mensaje de error para el campo 'birth_date'
            helperText={errors.birth_date} // Mostrar el mensaje de error si existe
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Teléfono"
            name="phone"
            value={visitorData.phone}
            onChange={handleChange}
            error={Boolean(errors.phone)}
            helperText={errors.phone}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Registrar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default VisitorRegistrationForm;
