require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");

const corsOption = {
  origin: "http://localhost:5173",
};

const boardRoutes = require("./routes/boardRoutes")
const cardRoutes = require("./routes/cardRoutes");
const commentRoutes = require("./routes/commentRoutes");


app.use(cors(corsOption));
app.use("/boards", boardRoutes);
app.use("/", cardRoutes);
app.use("/", commentRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
