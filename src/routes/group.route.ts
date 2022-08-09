import express from "express";
import controller from '../controllers/group.controller';

const router = express.Router();

router.route('/')
  .post(controller.create);

router.route('/:groupId')
  .put(controller.update)
  .delete(controller.destroy);

export default router;
