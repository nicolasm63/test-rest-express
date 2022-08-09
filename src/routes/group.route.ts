import express from "express";
import controller from '../controllers/group.controller';

const router = express.Router();

router.route('/')
  .post(controller.create);

export default router;
