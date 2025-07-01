import express from "express";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route"
import messageRoutes from "./routes/message.route"
const app = express();
app.use(express.json())
dotenv.config()
const port = process.env.PORT;

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
