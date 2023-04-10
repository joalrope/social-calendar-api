import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth";
import { dbConnection } from "./database/config";
import swaggerUI from "swagger-ui-express";
import { swaggerStart } from "./docs/swagger-start";
import { options } from "./docs/index";
import fileUpload from "express-fileupload";

console.log(options);

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
    this.app.use(this.paths.categories, require("./routes/categories"));
    this.app.use(this.paths.products, require("./routes/products"));
    this.app.use(this.paths.uploads, require("./routes/uploads"));
    this.app.use(this.paths.search, require("./routes/search"));
    this.app.use(this.paths.users, require("./routes/users"));
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
