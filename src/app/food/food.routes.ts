import { Router } from "express";
import currentUserMiddleware from "../../middlewares/currentUser.middleware";
import FoodService from "./food.controller";
import isAdminMiddleware from "../../middlewares/isAdmin.middleware";

const foodRouter=Router()


foodRouter.post('/',currentUserMiddleware,FoodService.create)
foodRouter.put("/:id", currentUserMiddleware, FoodService.update);
foodRouter.get("/", currentUserMiddleware, FoodService.fetchAll);
foodRouter.delete("/:id", currentUserMiddleware, FoodService.delete);
foodRouter.get(
  "/reports",
  currentUserMiddleware,
  isAdminMiddleware,
  FoodService.reports
);

export default foodRouter