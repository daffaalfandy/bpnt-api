const express = require('express')
const connectDB = require('./config/db')

const app = express();

// Connect db
connectDB();

// Init Middleware
app.use(express.json({
    extended: false
}))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Request-Headers', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

// Define Routes
app.use('/api/kpm', require('./routes/api/kpm'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})