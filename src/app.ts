import express, { Request, Response, NextFunction, Application } from "express";
import cors from "cors";
import https from "https";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

console.log(`arrancusi server...`);

const PORT = process.env.PORT || 3001;
const API_SECRET = process.env.API_SECRET || "yourpassphrase";

// Crear instancia de Express
const serverApp:Application = express();

// Middleware 1
serverApp.use(cors()); // Permitir consumo desde cualquier origen
serverApp.use(express.json()); // Parsear JSON en el body de las requests

//midelware logger de debug 

serverApp.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

/*
// Middleware para verificar autenticación básica del api secret
serverApp.use("/api/v1", (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Basic ")) {
    return res.status(401).send("Falta autenticación");
  }

  const base64Credentials = auth.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
  const [username] = credentials.split(":"); // Solo importa el "usuario"

  if (username !== API_SECRET) {
    return res.status(403).send("Passphrase incorrecta");
  }

  next();
});
*/


serverApp.post("/api/v1/entries", (req: Request, res: Response) => {
  const data = req.body;

  console.log("Recibido en /api/v1/entries:", data);

  // guardar en DB
  res.status(200).json({ status: "ok", received: data });
});


/*
// Ruta que Xdrip va a usar para mandar datos
serverApp.post("/api/v1/:endpoint", (req: Request, res: Response) => {
  const { endpoint } = req.params;
  const data = req.body;

  console.log(` Recibido en /api/v1/${endpoint}:`, data);

  //  guardar en db, reenviar, etc.
  res.json({ status: "ok", endpoint, received: data });
});
*/



// Leer certificados HTTPS (local)
const httpsOptions = {
  key: fs.readFileSync("cert/key.pem"),
  cert: fs.readFileSync("cert/cert.pem"),
};
/*
// Servidor HTTPS
https.createServer(httpsOptions, serverApp).listen(PORT, () => {
  console.log(`Servidor HTTPS escuchando en https://localhost:${PORT}`);
});
*/

// el Xdrip no va con el protocolo https, rejectea la conexion en el handshake
serverApp.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
}); 

