import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";

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

  app.get("/test-aws", async (req, res) => {
    try {
      const client = new DynamoDBClient({
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
      });
  
      const result = await client.send(new ListTablesCommand({}));
      res.json({ tables: result.TableNames });
    } catch (err) {
      console.error("❌ AWS connection error:", err);
      res.status(500).json({ error: err.message });
    }
  });

export default app;