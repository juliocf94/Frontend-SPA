import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Menu from "./components/Menu";
import VisitorRegistrationForm from "./components/molecules/VisitorRegistrationForm"; // Ruta correcta al archivo del componente
import ListVisitors from "./components/Visitors";
import AxiosManager from "./utils/AxiosManager";

function App() {
  const handleDownloadPDF = () => {
    const axiosManager = new AxiosManager("http://127.0.0.1:8000/api");

    axiosManager
      .get("visitors/download-pdf") // Ruta donde se encuentra el endpoint para generar el PDF
      .then((response) => {
        // Crear un enlace temporal para descargar el archivo
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "visitors.pdf");
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error("Error al descargar el PDF:", error);
      });
  };

  return (
    <div className="App">
      <Menu />
      <ListVisitors />
      <Tooltip title="Descargar PDF" arrow>
        <Button onClick={handleDownloadPDF} variant="contained" color="primary">Descargar PDF</Button>
      </Tooltip>
    </div>
  );
}

export default App;
