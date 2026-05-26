// src/services/riesgos.service.ts
import { supabase } from '../config/supabase.js';

export const RiesgosService = {
  async obtenerMatrizCompleta() {
    // Al consultar la vista, Supabase te devuelve la estructura JSON exacta de tu interfaz
    const { data, error } = await supabase
      .from('vista_analisis_riesgos')
      .select('*');

    if (error) throw new Error(error.message);
    return data; // Retorna un arreglo que cumple perfectamente con RiesgoCompletoData[]
  }
};