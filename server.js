const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const corsOptions = {
  origin: true,
  credentials: true,
};

app.options("*", cors(corsOptions));

// Connect db
connectDB();

// Init Middleware
app.use(
  express.json({
    extended: false,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Request-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Define Routes
app.use("/api/kpm", require("./routes/api/kpm"));
app.use("/api/goods", require("./routes/api/goods"));
app.use('/api/transaction', require('./routes/api/transaction'))
app.use('/api/admin', require('./routes/api/admin'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});