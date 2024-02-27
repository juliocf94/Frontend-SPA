import Menu from "./components/Menu";
import VisitorRegistrationForm from './components/molecules/VisitorRegistrationForm'; // Ruta correcta al archivo del componente
import ListVisitors from './components/Visitors';

function App() {
  return (
    <div className="App">
      <Menu />
      <ListVisitors/>
    </div>
  );
}

export default App;
