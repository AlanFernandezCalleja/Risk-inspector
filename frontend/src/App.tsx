
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './components/navigation/Sidebar';
import { NavbarDashboard } from './components/navigation/NavbarDashboard';
import { NavbarTablas } from './components/navigation/NavbarTablas';

function App() {
  const location = useLocation();

  

  return (
    <div className="flex h-screen w-screen bg-gray-100 overflow-hidden">
      
      {/* Sidebar Componente */}
      <Sidebar />

      {/* Contenedor Derecho */}
      <div className="flex-1 flex flex-col h-full overflow-hidden ">
        
        {/* Renderizado Condicional de Navbars limpios */}
        {location.pathname.startsWith('/dashboard') && <NavbarDashboard />}
        {location.pathname.startsWith('/tablas') && <NavbarTablas />}

        {/* Contenido Dinámico de las Páginas */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}

export default App;
