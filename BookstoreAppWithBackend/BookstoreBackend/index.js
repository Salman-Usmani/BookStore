import "dotenv/config";
import http from "http"; // Required for server creation
import app from "./src/app.js";

const { PORT } = process.env;

const server = http.createServer(app);

const startServer = async () => {
  try {
    server.listen(PORT, () => {
      console.log(`Server listening on port ${process.env.PORT || 3000}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();
