import './App.css'
import { NavLink, Outlet, useLocation } from 'react-router-dom';


function App() {const location = useLocation();

  // Clases de Tailwind comunes para los enlaces activos/inactivos del Sidebar
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
      isActive 
        ? 'bg-emerald-50 text-emerald-700' 
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`;

  // Clases comunes para los sub-navbars superiores
  const subLinkClass = ({ isActive }: { isActive: boolean }) =>
    `pb-3 text-sm font-medium border-b-2 transition-all ${
      isActive
        ? 'border-emerald-600 text-emerald-600 font-semibold'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
    }`;

  return (
    <div className="flex h-screen w-screen bg-gray-100 overflow-hidden">
      
      {/* ================= BARRA LATERAL (SIDEBAR) ================= */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between h-full">
        <div className="px-4 py-6">
          {/* Logo o Título de la App */}
          <div className="flex items-center gap-2 px-2 mb-8">
            <div className="h-8 w-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">RI</div>
            <span className="font-bold text-gray-800 text-lg">Risk Inspector</span>
          </div>

          {/* Menú de Navegación Principal */}
          <nav className="space-y-1">
            <NavLink to="/dashboard" className={linkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/tablas" className={linkClass}>
              Tablas y Registros
            </NavLink>
            <NavLink to="/mapas-calor" className={linkClass}>
              Mapas de Calor
            </NavLink>
            <NavLink to="/configuracion" className={linkClass}>
              Configuración
            </NavLink>
          </nav>
        </div>
        
        <div className="p-4 border-t border-gray-200 text-xs text-gray-400">
          v1.0.0 — Proyecto Activos
        </div>
      </aside>

      {/* ================= ÁREA DE CONTENIDO PRINCIPAL ================= */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* ================= NAVBARS SUB-MENÚS DINÁMICOS ================= */}
        {/* Sub-Navbar para Dashboard */}
        {location.pathname.startsWith('/dashboard') && (
          <header className="bg-white border-b border-gray-200 px-8 pt-4">
            <div className="flex gap-6">
              <NavLink to="/dashboard/general" className={subLinkClass}>General</NavLink>
              <NavLink to="/dashboard/estadisticas" className={subLinkClass}>Estadísticas</NavLink>
            </div>
          </header>
        )}

        {/* Sub-Navbar para Tablas y Registros */}
        {location.pathname.startsWith('/tablas') && (
          <header className="bg-white border-b border-gray-200 px-8 pt-4 overflow-x-auto">
            <div className="flex gap-6 min-w-max">
              <NavLink to="/tablas/amenazas" className={subLinkClass}>Amenazas</NavLink>
              <NavLink to="/tablas/controles" className={subLinkClass}>Controles</NavLink>
              <NavLink to="/tablas/activos" className={subLinkClass}>Activos de Información</NavLink>
              <NavLink to="/tablas/analisis-riesgo" className={subLinkClass}>Análisis de Riesgos</NavLink>
            </div>
          </header>
        )}

        {/* ================= CONTENIDO DE LA RUTA ACTUAL ================= */}
        {/* <Outlet /> actúa como un espacio en blanco donde React Router inyectará la vista hija correspondiente */}
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
