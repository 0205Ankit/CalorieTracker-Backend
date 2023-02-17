import logger from "../helpers/logger";
import { DataSource } from "typeorm";
import User from "../app/users/user.entity";
import Food from "../app/food/food.entity";
import Category from "../app/category/category.entity";

class MyDataSource {
  private dataSource: DataSource

  constructor() {
    this.dataSource = new DataSource({
      type: "postgres",
      database: "db.postgres",
      host: "localhost",
      port: 4001,
      username: "postgres",
      password: ".gptjadmw",
      entities: [User, Food, Category],
      synchronize: true,
    })
  }

  public  initDB() {
     this.dataSource.initialize()
    .then(() => {
      logger.info("database connected succesfully");
      
    })
    .catch((err) => {
      logger.error("error connecting database", err);
    });
  }

  public getRepo(repo: any) {
    return this.dataSource.getRepository(repo)
  }

  public getDB() {
    return this.dataSource;
  }
}


export default new MyDataSource()
