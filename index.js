import express from "express";
import userRouter from "./src/modules/users/user.routes.js";
import massageRouter from "./src/modules/massages/massage.routes.js";
import connectionDB from "./db/connectionDB.js";
import { AppError } from "./src/utils/classError.js";
import { globalErrorHandling } from "./src/utils/globalErrorHandling.js";

const app = express();
const port = 3000;

connectionDB();

app.use(express.json());

app.use("/users", userRouter);

app.use("/messages", massageRouter);

app.use("*", (req, res, next) => {
  return next(new AppError(`invalid url ${req.originalUrl}`, 404));
});

app.use(globalErrorHandling);

app.listen(port, () => console.log(`app running on port ${port}`));
