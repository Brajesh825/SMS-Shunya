import express from "express";
import { config } from "dotenv";
config();
import cors from "cors";
import cookieParser from "cookie-parser";

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const staticFilesPath = join(__dirname, 'frontend/build');

// import { corsPolicy } from "./db/cors.js";
import { Connect } from "./db/connect.js";

const app = express();

// import routes
import { classRoutes } from "./routes/classRoute.js";
import { studentRoutes } from "./routes/studentRoute.js";
import { feeStructureRoutes } from "./routes/feeStructureRoute.js";
import { orderRoute } from "./routes/orderRoute.js";
import { authRoute } from "./routes/authRoutes.js";

// Middlewares
// app.use(cors(corsPolicy))
app.use(express.json());
app.use(cookieParser());

// Serve static files from the React app
app.use(express.static(staticFilesPath))


// Apis
app.use("/api/v1", classRoutes);
app.use("/api/v1", studentRoutes);
app.use("/api/v1", feeStructureRoutes);
app.use("/api/v1", orderRoute);
app.use("/api/v1", authRoute);

// Catch-all route to serve the React app
app.get('*', (req, res) => {
  res.sendFile(staticFilesPath + '/index.html');
});

async function start() {
  let connectionEstablished = await Connect();

  if (connectionEstablished) {
    app.listen(process.env.PORT, () => {
      console.log("server started on " + process.env.PORT);
    });
  }
}

start();
