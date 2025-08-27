import jwt from 'jsonwebtoken';

const getToken = async (req, res) => {
    const token = req.cookies.access_token;
    if(!token){
        return res.status(401).json({message:"No se proporciono un token"});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.status(200).json({ token: token, user: decoded });
    }catch(error){
        return res.status(403).json({ message: "Token Invalido" });
    }
};

const verifyToken = async (req, res) => {
    const token = req.cookies.access_token;
    if(!token){
        return res.status(401).json({message: "No se proporciono un token"});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.send(decoded);
    }catch(error){
        return res.status(403).json({message: "Token invalido. Acceso denegado"});
    }
};

const removeToken = async (req, res) => {
    try{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return res.clearCookie('access_token').json({ message: "Cookie removed" });
    }catch(error){
        return res.status(200).json({ message: "Cookie inexistente" });
    }
};

export default {
    getToken,
    verifyToken,
    removeToken
};