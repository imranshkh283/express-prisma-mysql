import { Router } from "express";
import { userController } from "../controller";

const router: Router = Router();

router.get("/", userController.getAllUsers);
router.post("/create", userController.insertUser);
router.post("/update/:id", userController.updateUsers);
router.post("/delete/:id", userController.deleteUser);
export default router;
