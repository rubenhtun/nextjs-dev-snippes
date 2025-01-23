import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRouter from "./routers/authRouter";
import { checkAuth } from "./checkAuth";
import clientPageRouter from "./routers/clientPageRouter";

const app = express();
const port = 4000;

// Ensure CORS is enabled
app.use(cors());

// Use body-parser middleware to handle JSON requests
app.use(bodyParser.json());

// Authenticated routes for registration and login
app.use("/auth", authRouter);

// Client page route
app.use("/", checkAuth, clientPageRouter);

// Server is listening at PORT?
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
