// Este Sidebar siempre estará disponible para toda la pagina
// valores
// frontend/src/components/elementos/navigation/Sidebar.tsx

import { NavLink } from 'react-router-dom';

export const Sidebar = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
      isActive 
        ? 'bg-emerald-50 text-emerald-700' 
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`;

  return (
    <aside className="w-64 bg-green-200 border-r border-gray-200 flex flex-col justify-between h-full">
      <div className="px-4 py-6">
        {/* Logo */}
        <div className="flex items-center gap-2 px-2 mb-8">
          <div className="h-8 w-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">RI</div>
          <span className="font-bold text-gray-800 text-lg">Risk Inspector</span>
        </div>

        {/* Menú Principal */}
        <nav className="space-y-1">
          <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
          <NavLink to="/tablas" className={linkClass}>Tablas y Registros</NavLink>
          <NavLink to="/mapas-calor" className={linkClass}>Mapas de Calor</NavLink>
          <NavLink to="/configuracion" className={linkClass}>Configuración</NavLink>
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-200 text-xs text-gray-400">
        v1.0.0 — Proyecto Activos
      </div>
    </aside>
  );
};