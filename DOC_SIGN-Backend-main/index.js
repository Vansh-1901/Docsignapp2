
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/auth', AuthRouter);
app.use('/product', ProductRouter);

// MongoDB connection
mongoose.connect(process.env.MONGO_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0' , () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

// const express = require('express');
// const app = express();
// const cors = require('cors');
// const mongoose = require('mongoose');
// require('dotenv').config();

// const AuthRouter = require('./Routes/AuthRouter');

// app.use(cors());
// app.use(express.json());

// // ✅ Fix route path
// app.use('/auth', AuthRouter);

// // ✅ Ensure this is listening
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on port ${PORT}`);
// });
