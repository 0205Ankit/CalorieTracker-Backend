import {Router} from "express"
import UserController from "./user.controller"


const userRouter = Router()

userRouter.post('/sign-up', UserController.SignUp)
userRouter.post('/sign-in', UserController.SignIn)

export default userRouter