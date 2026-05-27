// src/services/auth.service.ts
import bcrypt from 'bcrypt';
import { supabaseAuth } from '../config/supabase_auth.js';

export const AuthService = {
  /**
   * Busca al usuario por correo en la BD externa y verifica la contraseña con bcrypt.
   * Retorna los datos básicos del usuario si es válido, o null si las credenciales son incorrectas.
   */
  async login(correo: string, contrasena: string) {
    // 1. Buscar el usuario por correo (solo seleccionamos lo necesario)
    const { data: usuario, error } = await supabaseAuth
      .from('usuario')
      .select('id_usuario, nombre_completo, correo, contrasena, estado, rol, email_verificado, bloqueado_hasta')
      .eq('correo', correo)
      .single();

    if (error || !usuario) {
      // Usuario no encontrado — devolvemos null para que el controlador responda 401
      return null;
    }

    // 2. Verificar si la cuenta está bloqueada temporalmente
    if (usuario.bloqueado_hasta) {
      const bloqueadoHasta = new Date(usuario.bloqueado_hasta);
      if (bloqueadoHasta > new Date()) {
        const error = new Error(`Cuenta bloqueada hasta ${bloqueadoHasta.toLocaleString('es-BO')}`);
        (error as any).status = 403;
        throw error;
      }
    }

    // 3. Verificar si la cuenta está activa
    if (!usuario.estado) {
      const error = new Error('La cuenta no está activa. Contacta al administrador.');
      (error as any).status = 403;
      throw error;
    }

    // 4. Comparar la contraseña ingresada con el hash bcrypt almacenado
    const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);

    if (!contrasenaValida) {
      return null;
    }

    // 5. Retornar los datos del usuario (sin la contraseña)
    const { contrasena: _, ...usuarioSinContrasena } = usuario;
    return usuarioSinContrasena;
  }
};
