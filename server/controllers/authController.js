import usersRepository from "../repository/usersRepository.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const register = async (req, res) => {
    const { nombre, email, tel, password, rol } = req.body;

    if (!nombre || !email || !password || !rol) {
        return res.status(400).json({ message: 'All fields are required' }); // Tel is optional
    }
    try {
        let user = null;
        if(tel){
            user = await usersRepository.createUser({ nombre, email, tel, password, rol });
        }
        else{
            user = await usersRepository.createUser({ nombre, email, password, rol });
        }
        const payload = {
            id: user.ID,
            name: user.NAME,
            status: user.STATUS,
            tel: user.TEL,
            rol: user.ROLE
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res
            .cookie('access_token', token, {
                httpOnly: true, // La cookie solo se puede acceder en el servidor
                secure: process.env.NODE_ENV === 'production',   // La cookie solo se puede acceder en https
                sameSite: 'strict', // La cookie solo se puede acceder en el mismo dominio
                maxAge: 1000 * 60 * 60 // La cookie tiene un tiempo de vida de 1h
            })
            .json({ message: "Register succesfull" });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }   
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    try{
        const user = await usersRepository.getUserByEmail(email);
        if (!user || user.PASSWORD !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const payload = {
            id: user.ID,
            name: user.NAME,
            status: user.STATUS,
            tel: user.TEL,
            rol: user.ROLE
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res
        .cookie('access_token', token, {
            httpOnly: true, // La cookie solo se puede acceder en el servidor
            secure: process.env.NODE_ENV === 'production',   // La cookie solo se puede acceder en https
            sameSite: 'strict', // La cookie solo se puede acceder en el mismo dominio
            maxAge: 1000 * 60 * 60 // La cookie tiene un tiempo de vida de 1h
        })
        .json({message: "Login succesfull"});
    }catch(error){
        return res.status(404).json({ message: 'User not found' });
    }
};

export default {
    register,
    login
};