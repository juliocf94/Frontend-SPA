import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import AxiosManager from "../../utils/AxiosManager"; // Importa la clase AxiosManager

function VisitorRegistrationForm() {
  const [visitorData, setVisitorData] = useState({
    dui: "",
    name: "",
    email: "",
    birth_date: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisitorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    } catch (error) {
      console.error("Error al enviar los datos:", error);
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
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nombre"
            name="name"
            value={visitorData.name}
            onChange={handleChange}
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
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            name="birth_date"
            value={visitorData.birth_date}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Teléfono"
            name="phone"
            value={visitorData.phone}
            onChange={handleChange}
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
