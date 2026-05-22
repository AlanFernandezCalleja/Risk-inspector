// El nav bar personalizado para la pagiana de Dashboard

// frontend/src/components/elementos/navigation/NavbarDashboard.tsx
import { NavLink } from 'react-router-dom';

export const NavbarDashboard = () => {
  const subLinkClass = ({ isActive }: { isActive: boolean }) =>
    `pb-3 text-sm font-medium border-b-2 transition-all ${
      isActive
        ? 'border-emerald-600 text-emerald-600 font-semibold'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
    }`;

  return (
    <header className="bg-white border-b border-gray-200 px-8 pt-4">
      <div className="flex gap-6">
        <NavLink to="/dashboard/general" className={subLinkClass}>General</NavLink>
        <NavLink to="/dashboard/estadisticas" className={subLinkClass}>Estadísticas</NavLink>
      </div>
    </header>
  );
};