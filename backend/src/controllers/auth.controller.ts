// src/controllers/auth.controller.ts
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service.js';

export const AuthController = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { correo, contrasena } = req.body;

      // Validación básica de cuerpo del request
      if (!correo || !contrasena) {
        return res.status(400).json({ error: 'El correo y la contraseña son requeridos.' });
      }

      const usuario = await AuthService.login(correo, contrasena);

      if (!usuario) {
        // Credenciales incorrectas — mensaje genérico por seguridad
        return res.status(401).json({ error: 'Correo o contraseña incorrectos.' });
      }

      // Login exitoso: devolvemos los datos del usuario al frontend
      return res.status(200).json({
        mensaje: 'Login exitoso',
        usuario
      });

    } catch (error) {
      next(error);
    }
  }
};
