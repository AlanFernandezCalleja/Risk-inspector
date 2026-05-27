// src/hooks/useCatalogos.ts
import { useState, useEffect } from 'react';

export const useCatalogos = () => {
  const [tipos, setTipos] = useState<{id: number, nombre: string}[]>([]);
  const [niveles, setNiveles] = useState<{id: number, nombre: string}[]>([]);
  const [frecuencias, setFrecuencias] = useState<{id: number, nombre: string}[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarCatalogos = async () => {
      try {
        // Ejecutamos las 3 peticiones en paralelo para que sea más rápido
        const [resTipos, resNiveles, resFrecuencias] = await Promise.all([
          fetch('http://localhost:3000/catalogos/tipos'),
          fetch('http://localhost:3000/catalogos/niveles'),
          fetch('http://localhost:3000/catalogos/frecuencias')
        ]);

        const [dataTipos, dataNiveles, dataFrecuencias] = await Promise.all([
          resTipos.json(), resNiveles.json(), resFrecuencias.json()
        ]);

        setTipos(dataTipos);
        setNiveles(dataNiveles);
        setFrecuencias(dataFrecuencias);
      } catch (error) {
        console.log('no se cargan los catalogos');
        console.error("Error al cargar catálogos:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarCatalogos();
  }, []);

  return { tipos, niveles, frecuencias, cargando };
};