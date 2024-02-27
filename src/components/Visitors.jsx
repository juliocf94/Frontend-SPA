import React, { useState, useEffect } from "react";
import AxiosManager from "../utils/AxiosManager"; // Importa la clase AxiosManager
import VisitorRegistrationForm from "./molecules/VisitorRegistrationForm";
import EnhancedTable from "./molecules/EnhancedTable";

function ListVisitors() {
  const [desserts, setDesserts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

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
      <VisitorRegistrationForm onDataUpdate={fetchData} />
      <div className="table-container">
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
    </div>
  );
}

export default ListVisitors;
