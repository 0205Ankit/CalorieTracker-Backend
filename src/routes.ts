import categoryRouter from "./app/category/category.routes"
import userRouter from "./app/users/users.routes"
import { Router } from "express"
import foodRouter from "./app/food/food.routes"

const router = Router()

router.use("/category", categoryRouter)
router.use("/user", userRouter)
router.use('/food',foodRouter)

export default router