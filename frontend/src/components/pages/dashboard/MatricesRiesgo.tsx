// Pagina en donde se muestran las diferentes matrices de riesgos con su clasificación

// En la pagina que se pueda ordenar de Mayor a menor riesgo
// En la pagina que se pueda orderna rde menor a mayor riesog
// QUe en la pagina se pueda ordenar por la cantidad de controles que tiene cada amanaza
// filtrar por amenazas que no tienen controles 

// Cada matriz es básicamente un mapa de calor 

import { MatrixTemplate } from '../../elementos/matrix/MatrixTemplate';

export const MatricesRiesgo = () => {
  // Simulando que estos datos provienen de una fila seleccionada en tu Tabla de Amenazas
  const amenazaSeleccionada = {
    nombre: "Fuga de Información (Base de Datos Clientes)",
    probabilidad: 3,
    impacto: 4,
    riesgo: 12 // 3 * 4
  };


  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Análisis de Mapas de Calor</h2>
      
      <MatrixTemplate 
        nombreAmenaza={amenazaSeleccionada.nombre}
        probabilidadSeleccionada={amenazaSeleccionada.probabilidad}
        impactoSeleccionado={amenazaSeleccionada.impacto}
      />
      
    </div>
  );
};
