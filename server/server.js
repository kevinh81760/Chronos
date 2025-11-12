import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("combined"));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(process.env.PORT || 4000, () => {
    console.log(`✅ Server is running at http://localhost:${process.env.PORT || 4000}`);
  });

export default app;