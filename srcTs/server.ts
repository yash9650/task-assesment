import { config } from "dotenv";
import express, { Application } from "express";
import appDataSource from "./Database/DataSource";
import path from "path";
import { taskRoutes } from "./Routes/task.routes";

config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log("Connecting to database....");
    await appDataSource.initialize();
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Unable to connect to database", error);
  }
};

app.use(express.static(__dirname + "/../build"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

startServer();

app.use("/api/tasks", taskRoutes);

app.get("/*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "../build", "index.html"));
});
