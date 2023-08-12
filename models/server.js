import express from "express";
import cors from "cors";
import { router } from "../routes/usuarios.js";
import { routerAuth } from "../routes/auth.js";
import { dbConnection } from "../database/config.js";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";
    this.authPath = "/api/auth";

    //conectar base de Datos
    this.conectarDB()
    //Middlewares
    this.middelewares();
    //Rutas de mi aplicacion

    this.routes();
  }

async conectarDB(){
  await dbConnection();
}

  middelewares() {
    //CORS
    this.app.use(cors());

    //Parseo y lectura del Body
    this.app.use(express.json());

    //Directorio Público
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuariosPath, router);
    this.app.use(this.authPath, routerAuth);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en Puerto", this.port);
    });
  }
}

export { Server };
