import { Router } from "express";
import {createMessage, deleteMessage, getAllMessage } from "../controllers/message.controller";

// router for sub routes that will get added to the app.use
const router: Router = Router();

router.get('/', getAllMessage);
router.post('/', createMessage);
router.delete('/', deleteMessage);


export default router;
