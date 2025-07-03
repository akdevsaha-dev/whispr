import express from "express";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route"
import messageRoutes from "./routes/message.route"
import contactRouter from "./routes/contact.route"
import userRouter from "./routes/users.route"
import chatRouter from "./routes/chat.route"
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json())
app.use(cookieParser())
dotenv.config()
const port = process.env.PORT;

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/contacts", contactRouter);
app.use("/api/users", userRouter)
app.use("/api/chat", chatRouter)
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
