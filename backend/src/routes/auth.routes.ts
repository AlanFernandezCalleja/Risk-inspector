// src/routes/auth.routes.ts
import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';

const router = Router();

// POST /auth/login — Autenticación de usuarios desde la BD externa
router.post('/auth/login', AuthController.login);

export default router;
