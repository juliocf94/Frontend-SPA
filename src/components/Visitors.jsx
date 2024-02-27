import React, { useState, useEffect } from "react";
import AxiosManager from "../utils/AxiosManager"; // Importa la clase AxiosManager
import EnhancedTable from "./molecules/EnhancedTable";

function ListVisitors() {
  const [desserts, setDesserts] = useState([]);

  useEffect(() => {
    // Aquí realizarías la llamada a tu backend para obtener los datos de los postres
    // Supongamos que los datos son un array de objetos con las propiedades id, name, calories, fat, carbs, protein
    const fetchData = async () => {
      try {
        const axiosManager = new AxiosManager("http://127.0.0.1:8000/api");
        const data = await axiosManager.get("visitors");
        //const response = await fetch("url_de_tu_api");
        //const data = await response.json();
        setDesserts(data);
      } catch (error) {
        console.error("Error fetching desserts:", error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { id: "id", label: "ID" },
    { id: "dui", label: "DUI" },
    { id: "name", label: "Nombre" },
    { id: "email", label: "Email" },
    { id: "generation", label: "Generación" },
    { id: "birth_date", label: "Fecha de nacimiento" },
  ];

  return (
    <div>
      <h1>Listado de Visitantes</h1>
      <EnhancedTable
        data={desserts}
        columns={columns}
        initialOrderBy="calories"
        rowsPerPageOptions={[5, 10, 25]}
        densePadding={false}
        onRowClick={(event, id) => {
          console.log(`Clicked row with id ${id}`);
        }}
      />
    </div>
  );
}

export default ListVisitors;
