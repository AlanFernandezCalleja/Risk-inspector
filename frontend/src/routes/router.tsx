// src/routes/router.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';

// Importacion de componentes 
import { Dashboard } from '../components/pages/dashboard/Dashboard';




import { TablaAmenaza } from '../components/elementos/tables/TablaAmenaza';
import { TablaControles } from '../components/elementos/tables/TablaControles';
import { TablaActivos } from '../components/elementos/tables/TablaActivos';
import { MatricesRiesgo } from '../components/pages/dashboard/MatricesRiesgo';
import { TablaCompletaRiesgos } from '../components/elementos/tables/TablaCompletaRiesgos';

// 2. Definición de la estructura de navegación
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard/general" replace />
      },
      {
        path: "dashboard",
        children: [
          { index: true, element: <Navigate to="general" replace /> },
          { path: "general", element: <Dashboard /> },
          { path: "estadisticas", element: <div>Estadisticas</div> }
        ]
      },
      {
        path: "tablas",
        children: [
          { index: true, element: <Navigate to="amenazas" replace /> },
          { path: "amenazas", element: <TablaAmenaza /> },
          { path: "controles", element: <TablaControles /> },
          { path: "activos", element: <TablaActivos/> },
          { path: "analisis-riesgo", element: <TablaCompletaRiesgos/> }
        ]
      },
      {
        path: "mapas-calor",
        element: <MatricesRiesgo/>
      },
      {
        path: "configuracion",
        element: <div>Configuración</div>
      }
    ]
  }
]);