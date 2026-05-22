// Tabla Generica para ser reutilizada

// Estructura de cada columna usando el genérico T
export interface Columna<T> {
  encabezado: string;
  clave?: keyof T; // 'keyof T' asegura que la clave exista obligatoriamente en el objeto
  render?: (fila: T) => React.ReactNode; // Para renderizados personalizados
}


// Interfaz de la tabla
export interface TablaGenericaProps<T> {
  columnas: Columna<T>[];
  datos: T[];
//   _className?: String; al final no lo necesitaba
}
export const TablaGenerica = <T,>({ columnas, datos}: TablaGenericaProps<T>) =>{
  // Manejo de caso borde: si no hay datos
  if (!datos || datos.length === 0) {
    return <p style={{ textAlign: 'center', padding: '20px' }}>No hay datos disponibles.</p>;
  }

  return (
    <div className="w-full overflow-x-auto my-6 rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-600">
        {/* Encabezado */}
        <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-700 border-b border-gray-200">
          <tr>
            {columnas.map((columna, index) => (
              <th key={index} scope="col" className="px-6 py-4">
                {columna.encabezado}
              </th>
            ))}
          </tr>
        </thead>
        
        {/* Cuerpo de la tabla */}
        <tbody className="divide-y divide-gray-200">
          {datos.map((fila, filaIndex) => (
            <tr 
              key={(fila as any).id || filaIndex} 
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              {columnas.map((columna, colIndex) => (
                <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                  {columna.render 
                    ? columna.render(fila) 
                    : columna.clave 
                      ? (fila[columna.clave] as React.ReactNode) 
                      : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
