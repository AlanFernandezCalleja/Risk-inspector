// src/services/riesgos.service.ts
import { supabase } from '../config/supabase.js';

// 1. Query relacional profundo que reemplaza tu Vista SQL
const QUERY_RIESGO_COMPLETO = `
  id,
  probabilidad_residual,
  impacto_residual,
  tratamiento:tratamientos_riesgo (id, nombre),
  amenaza:amenazas (
    id,
    amenaza,
    descripcion_amenaza,
    consecuencia,
    probabilidad,
    impacto,
    activo:activos (id, nombre, descripcion_activo)
  ),
  riesgos_controles (
    control:controles (id, control, descripcion_control)
  )
`;

// 2. Helpers matemáticos (Replicando los CASE y multiplicaciones de tu Vista)
const calcularNivel = (valor: number) => {
  if (valor === 0) return 'Sin Evaluar';
  if (valor <= 4) return 'Bajo';
  if (valor <= 9) return 'Medio';
  if (valor <= 15) return 'Alto';
  return 'Crítico';
};

const formatearRiesgo = (item: any) => {
  const probInherente = item.amenaza?.probabilidad || 0;
  const impInherente = item.amenaza?.impacto || 0;
  const riesgoInherente = probInherente * impInherente;
  
  const probResidual = item.probabilidad_residual || 0;
  const impResidual = item.impacto_residual || 0;
  const riesgoResidual = probResidual * impResidual;

  return {
    idRiesgo: item.id,
    aplicacion: item.amenaza?.activo || null,
    amenaza: { ...item.amenaza, riesgo_inherente: riesgoInherente },
    nivelRiesgo: calcularNivel(riesgoInherente),
    tratamientoRiesgo: item.tratamiento?.nombre || 'Sin Asignar',
    // 🌟 Aplanamos la relación M:N para que devuelva un array limpio de controles
    controles: item.riesgos_controles ? item.riesgos_controles.map((rc: any) => rc.control) : [],
    probabilidadResidual: probResidual,
    impactoResidual: impResidual,
    riesgoResidual: riesgoResidual,
    nivelRiesgoResidual: calcularNivel(riesgoResidual)
  };
};

export const RiesgosService = {
  
  // ==========================================
  // GET: OBTENER TODOS LOS RIESGOS
  // ==========================================
  async obtenerMatrizCompleta() {
    const { data, error } = await supabase
      .from('riesgos')
      .select(QUERY_RIESGO_COMPLETO);

    if (error) throw new Error(`Error al obtener riesgos: ${error.message}`);

    // Transformamos los datos crudos al formato hermoso que necesita tu Frontend
    return data.map(formatearRiesgo);
  },

  // ==========================================
  // GET: OBTENER RIESGO POR ID
  // ==========================================
  async obtenerRiesgoPorId(id: number) {
    const { data, error } = await supabase
      .from('riesgos')
      .select(QUERY_RIESGO_COMPLETO)
      .eq('id', id)
      .single();

    if (error) throw new Error(`Error al obtener el riesgo: ${error.message}`);
    
    return formatearRiesgo(data);
  },

  // ==========================================
  // POST: CREAR RIESGO (Con sus controles)
  // ==========================================
  async crearRiesgo(datosRiesgo: any, controlesIds: number[] = []) {
    // 1. Insertamos el riesgo base
    const { data: nuevoRiesgo, error: errorRiesgo } = await supabase
      .from('riesgos')
      .insert(datosRiesgo)
      .select('id')
      .single();

    if (errorRiesgo) throw new Error(`Error al crear riesgo: ${errorRiesgo.message}`);

    // 2. Si nos enviaron controles, los insertamos en la tabla intermedia
    if (controlesIds.length > 0) {
      const relaciones = controlesIds.map(controlId => ({
        riesgo_id: nuevoRiesgo.id,
        control_id: controlId
      }));

      const { error: errorControles } = await supabase
        .from('riesgos_controles')
        .insert(relaciones);

      if (errorControles) throw new Error(`Error al asociar controles: ${errorControles.message}`);
    }

    return this.obtenerRiesgoPorId(nuevoRiesgo.id);
  },

  // ==========================================
  // PUT: EDITAR RIESGO (Y actualizar controles N:M)
  // ==========================================
  async editarRiesgo(id: number, datosRiesgo: any, controlesIds?: number[]) {
    // 1. Actualizamos los datos principales del riesgo (probabilidad, impacto, tratamiento)
    if (Object.keys(datosRiesgo).length > 0) {
      const { error: errorRiesgo } = await supabase
        .from('riesgos')
        .update(datosRiesgo)
        .eq('id', id);

      if (errorRiesgo) throw new Error(`Error al editar riesgo: ${errorRiesgo.message}`);
    }

    // 2. Sincronización de Controles (Borrar los viejos y poner los nuevos)
    if (controlesIds !== undefined) {
      // Borramos las relaciones anteriores
      await supabase.from('riesgos_controles').delete().eq('riesgo_id', id);

      // Insertamos las nuevas (si el array no está vacío)
      if (controlesIds.length > 0) {
        const relaciones = controlesIds.map(controlId => ({
          riesgo_id: id,
          control_id: controlId
        }));
        const { error: errorControles } = await supabase.from('riesgos_controles').insert(relaciones);
        if (errorControles) throw new Error(`Error al actualizar controles: ${errorControles.message}`);
      }
    }

    // Devolvemos el objeto completo ya formateado
    return this.obtenerRiesgoPorId(id);
  },

  // ==========================================
  // DELETE: ELIMINAR RIESGO
  // ==========================================
  async eliminarRiesgo(id: number) {
    // IMPORTANTE: Como no tienes "ON DELETE CASCADE" en tu BD, debemos borrar primero 
    // las relaciones en la tabla 'riesgos_controles' para evitar error de Llave Foránea.
    
    const { error: errorRelaciones } = await supabase
      .from('riesgos_controles')
      .delete()
      .eq('riesgo_id', id);

    if (errorRelaciones) throw new Error(`Error al eliminar controles asociados: ${errorRelaciones.message}`);

    // Ahora sí podemos borrar el riesgo principal
    const { error: errorRiesgo } = await supabase
      .from('riesgos')
      .delete()
      .eq('id', id);

    if (errorRiesgo) throw new Error(`Error al eliminar riesgo: ${errorRiesgo.message}`);

    return true;
  }
};