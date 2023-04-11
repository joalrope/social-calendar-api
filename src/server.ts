import express from "express";
import cors from "cors";
import { categoryRouter } from "./routes";
import { productRouter } from "./routes";
import { uploadRouter } from "./routes";
import { searchRouter } from "./routes";
import { userRouter } from "./routes";
import { authRouter } from "./routes";
import { dbConnection } from "./database/config";
import swaggerUI from "swagger-ui-express";
import { swaggerStart } from "./docs/swagger-start";
import { options } from "./docs/index";
import fileUpload from "express-fileupload";

interface IPaths {
  categories: string;
  products: string;
  uploads: string;
  search: string;
  users: string;
  auth: string;
}

export class Server {
  app: any;
  port: string | undefined;
  paths: IPaths;

  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      categories: "/api/categories",
      products: "/api/products",
      uploads: "/api/uploads",
      search: "/api/search",
      users: "/api/users",
      auth: "/api/auth",
    };

    // Conectar a base de datos
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Swagger integration
    this.app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(options));

    // Directorio Público
    this.app.use(express.static("public"));

    // Fileupload - Carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.paths.categories, categoryRouter);
    this.app.use(this.paths.products, productRouter);
    this.app.use(this.paths.uploads, uploadRouter);
    this.app.use(this.paths.search, searchRouter);
    this.app.use(this.paths.users, userRouter);
    this.app.use(this.paths.auth, authRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
      swaggerStart();
      //require('child_process').exec(`start http://localhost:${this.port}/api-doc`);
    });
  }
}
