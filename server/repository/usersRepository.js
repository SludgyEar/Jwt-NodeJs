import pool from './dbPool.js';

const getAllUsers = async () => {
    try{
        const [rows] = await pool.query('SELECT * FROM USERS');
        return rows.length > 0 ? rows : null;
    }catch(error){
        console.log('Error getting all the users:', error);
        throw error;
    }
};

const getUserById = async (id) => {
    try{
        const [rows] = await pool.query('SELECT * FROM USERS WHERE ID = ?', [id]);
        return rows.length > 0 ? rows[0] : null;
    }catch(error){
        console.log(`Error getting user with ID ${id}:`, error);
        throw error;
    }
};

const getUserByEmail = async (email) => {
    try{
        const [rows] = await pool.query('SELECT ID, NAME, TEL, ROLE, STATUS, PASSWORD FROM USERS WHERE EMAIL = ?', [email]);
        return rows.length > 0 ? rows[0] : null;
    }catch(error){
        console.error('Error getting user by email:', error);
        throw error;
    }
};

const createUser = async (user) => {
    const { nombre, email, password, rol, tel } = user;
    try{
        if (tel) {
            await pool.query('INSERT INTO USERS (NAME, EMAIL, PASSWORD, ROLE, TEL) VALUES (?, ?, ?, ?, ?)', [nombre, email, password, rol, tel]);
        } else {
            await pool.query('INSERT INTO USERS (NAME, EMAIL, PASSWORD, ROLE) VALUES (?, ?, ?, ?)', [nombre, email, password, rol]);
        }
        return getUserByEmail(email);
    }catch(error){
        console.error('Error creating user:', error);
        throw error;
    }
};

const updateUser = async (id, user) => {
    const { nombre, email, password, tel, status } = user;
    let updateFields = [];
    let queryParams = [];

    if (nombre) {
        updateFields.push('NAME = ?');
        queryParams.push(nombre);
    }
    if (email) {
        updateFields.push('EMAIL = ?');
        queryParams.push(email);
    }
    if (password) {
        updateFields.push('PASSWORD = ?');
        queryParams.push(password);
    }
    if (tel) {
        updateFields.push('TEL = ?');
        queryParams.push(tel);
    }
    if (status) {
        updateFields.push('STATUS = ?');
        queryParams.push(status);
    }

    if (updateFields.length > 0) {
        queryParams.push(id);
        try{
            await pool.query(`UPDATE USERS SET ${updateFields.join(', ')} WHERE ID = ?`, queryParams);
        }catch(error){
            console.log(`Error updating user with ID ${id}:`, error);
            throw error;
        }
    }
};

const deleteUser = async (id) => {
    await pool.query('UPDATE USERS SET STATUS = "0" WHERE ID = ?', [id]);
    return { id };
};

const banUser = async (id) => {
    await pool.query('UPDATE USERS SET STATUS = "2" WHERE ID = ?', [id]);
    return { id };
};

export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    banUser,
    getUserByEmail
};
