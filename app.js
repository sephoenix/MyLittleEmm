require('dotenv/config');
require('./db');
const express = require('express');

const { isAuthenticated } = require('./middleware/jwt.middleware');
const allRoutes = require('./routes');
const authRouter = require('./routes/auth.routes');
const protectedRoute = require('./routes/protected.routes');
const diaryRouter = require('./routes/diary.routes');

const app = express();

require('./config')(app);

app.use('/api', allRoutes);
app.use('/api/protected', isAuthenticated, protectedRoute);
app.use('/auth', authRouter);
app.use('/api', diaryRouter);

require('./error-handling')(app);

module.exports = app;
