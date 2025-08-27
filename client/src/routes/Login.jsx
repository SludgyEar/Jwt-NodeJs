import { useEffect, useState } from "react";
import { TbNavigationFilled, TbPasswordUser } from "react-icons/tb";
import { FiCoffee } from "react-icons/fi";
import { MdAlternateEmail } from "react-icons/md";
import { ImEnter } from "react-icons/im";
import { getSHA256Hash } from "boring-webcrypto-sha256";
import { useAuth } from "../providers/UserProvider";
import axios from 'axios';
import '../styles/Login.css';
import { useNavigate } from "react-router-dom";


export default function Login() {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();
    

    const [email, setEmail] = useState('');
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const [password, setPassword] = useState('');
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    useEffect(() => {
        if(auth.isAuth) navigate('/dashboard');
    },[auth.user, navigate]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try{
            const hashedPassword = (await getSHA256Hash(password)).toString();
            await axios.post('http://localhost:5000/api/auth/login', { email: email, password: hashedPassword }, {withCredentials: true});
            const res = await axios.get('http://localhost:5000/api/verify/getToken', {withCredentials: true});
            const { token, user } = res.data;
            auth.handleUser(user);
            auth.handleToken(token);
            if (auth.user.rol === 'ADMIN') auth.handleAdmin(true);
            auth.handleAuth(true);
        }catch(error){
            console.error("Error loggin the user", error);
            setError('Invalid email or password');
        }finally{
            setError('');
            setIsLoading(false);
        }
    };


    return (
        <div className="login-container">
            <div className="background-decoration">
                <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            <div className="login-card">
                {/*Login Header*/}
                <div className="login-header">
                    <h1 className="login-title">Login</h1>
                    <p className="login-subtitle">Please enter your credentials</p>
                    {/*Login Header Divider*/}
                    <div className="header-divider">
                        <div className="divider-line"></div>
                        <div className="divider-icon">☁</div>
                        <div className="divider-line"></div>
                    </div>
                </div>
                {/*Login Form*/}
                <form className="login-form" onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="guestName" className="form-label">
                            <MdAlternateEmail size={28}/>
                            Email
                        </label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Email"
                            required
                            onChange={handleEmail}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            <TbPasswordUser size={34} />
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="Password"
                            required
                            onChange={handlePassword}
                        />
                    </div>

                    {error && (
                        <div className="error-message">
                            <span className="error-icon">⚠️</span>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className={`login-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner"></span>
                                Verificando...
                            </>
                        ) : (
                            <>
                                    <ImEnter size={26}/>
                                Sign In
                            </>
                        )}
                    </button>
                </form>
                {/*Login Footer*/}
                <div className="login-footer">
                    <p className="footer-text">
                        you don't have an account? <a href="/register" className="footer-link">Sign Up</a>
                    </p>
                    <div className="footer-decoration">
                        <FiCoffee size={30} />
                    </div>
                </div>
            </div>
        </div>
    );
}