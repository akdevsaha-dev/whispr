import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./routes/auth.route"
import messageRoutes from "./routes/message.route"
import contactRouter from "./routes/contact.route"
import http from "http"
import userRouter from "./routes/users.route"
import chatRouter from "./routes/chat.route"
import cookieParser from "cookie-parser";
import { initSocket } from "./socket/socket";
const app = express();
app.use(cors({
  origin: "http://localhost:3000", // allow requests from this origin
  credentials: true, // if you're using cookies
}));

app.use(express.json())
app.use(cookieParser())
dotenv.config()
const port = process.env.PORT;

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRouter)
app.use("/api/messages", messageRoutes);
app.use("/api/contacts", contactRouter);
app.use("/api/users", userRouter)


const server = http.createServer(app)

initSocket(server)
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
