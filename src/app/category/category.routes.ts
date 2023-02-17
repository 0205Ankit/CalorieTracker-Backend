import { Router } from "express";
import currentUserMiddleware from "../../middlewares/currentUser.middleware";
import isAdminMiddleware from "../../middlewares/isAdmin.middleware";
import CategoryController from "./category.controller";

const categoryRouter = Router();

categoryRouter.put("/:id", currentUserMiddleware, isAdminMiddleware);
categoryRouter.post("/", currentUserMiddleware, isAdminMiddleware);
categoryRouter.get("/", currentUserMiddleware);
categoryRouter.delete("/:id", currentUserMiddleware, isAdminMiddleware);
export default categoryRouter;
