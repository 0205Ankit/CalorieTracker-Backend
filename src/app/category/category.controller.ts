import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { categorySchema } from "./category.schema";
import Category from "./category.entity";
import errorResponse from "../../helpers/response";

export default class CategoryController {
  static async create(req: Request, res: Response) {
    let { name, maxFoodItems } = req.body;
    const { error } = categorySchema.validate(req.body);
    name = name.trim();
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).send(error.details);
    }
    try {
      const categoryExists = await Category.findOne({
        where: { name: req.body.name },
      });

      if (categoryExists) {
        return errorResponse(res, "Category already exists");
      }

      const category = Category.create();
      category.name = name;
      category.maxFoodItems = maxFoodItems;
      await Category.save(category);

      return res.status(StatusCodes.CREATED).json(category);
    } catch (err) {
      return res.status(StatusCodes.BAD_REQUEST).send(err);
    }
  }

  static async fetchAll(req: Request, res: Response) {
    try {
      const categories = await Category.find({ order: { createdAt: "DESC" } });
      return res.status(StatusCodes.OK).json(categories);
    } catch (error) {
      return errorResponse(
        res,
        "Something went wrong, please try again",
        StatusCodes.BAD_REQUEST
      );
    }
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    let { name, maxFoodItems } = req.body;
    const { error } = categorySchema.validate({ name, maxFoodItems });
    name = name.trim();

    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).send(error.details);
    }

    try {
      const category = await Category.findOne({ where: { id: +id } }); ///???

      if (!category) {
        return errorResponse(res, "Category not found", StatusCodes.NOT_FOUND);
      }

      const categoryFound = await Category.findOne({ where: { name } });

      if (categoryFound && categoryFound.id != +id) {
        return errorResponse(res, "Category already exists");
      }

      category.name = name;
      category.maxFoodItems = maxFoodItems;

      await Category.save(category!);

      return res.status(StatusCodes.OK).json(category);
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const category = await Category.findOne({ where: { id:+id } });

      if (!category) {
        return errorResponse(res, "Category not found", StatusCodes.NOT_FOUND);
      }

      await Category.remove(category!);

      return res.status(StatusCodes.OK).send("Succesfully Deleted");
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
  }
}
