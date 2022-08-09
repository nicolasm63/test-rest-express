import express from "express";
import controller from '../controllers/student.controller';

const router = express.Router();

router.route('/')
  .get(controller.getAll);

export default router;
