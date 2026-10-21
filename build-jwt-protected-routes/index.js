import express from "express";
import helmet from "helmet";
import authRouter from "./routes/auth.js";
import adminRouter from "./routes/admin.js";

const PORT = process.env.PORT;
const app = express();

app.use(helmet());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);

app.get("/", (req, res) => {
  res.json({ message: "Auth API is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});

app.use((err, req, res, next) => {
  return res.status(500).json({
    error: err.message,
  });
});


