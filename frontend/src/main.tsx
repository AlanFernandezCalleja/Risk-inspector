import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';


// Componentes Dummy/Simulados (Reemplázalos por tus páginas reales)
const GeneralDashboard = () => <div>Contenido Dashboard General</div>;
const EstadisticasDashboard = () => <div>Contenido Estadísticas Dashboard</div>;

const TablaAmenazas = () => <div>Componente Tabla de Amenazas</div>;
const TablaControles = () => <div>Componente Tabla de Controles</div>;
const TablaActivos = () => <div>Componente Tabla de Activos de Información</div>;
const TablaAnalisRiesgo = () => <div>Componente Tabla de Análisis de Riesgos</div>;

const MapasCalor = () => <div>Contenido de Mapas de Calor</div>;
const Configuracion = () => <div>Contenido de Configuración</div>;

import { router } from './routes/router';
// Estructura de Navegación


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

