import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import verifyRoutes from "./routes/verifyRoutes.js"
import cookieParser from "cookie-parser";

const app = express();
app.set('port', process.env.PORT || 5000);
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));


app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
});
app.get('/test', (req, res) => {
    res.json({ message: 'Server is running!' });
});

app.use('/api/auth', authRoutes); // Register, Login, forget password(email), change password, getProfile(me), changeProfile(profile)
app.use('/api/verify', verifyRoutes);