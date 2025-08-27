import { useEffect, useState } from 'react';
import { TbPasswordUser } from "react-icons/tb";
import { FiCoffee } from "react-icons/fi";
import { LuUser } from "react-icons/lu";
import { ImEnter } from "react-icons/im";
import { MdAlternateEmail } from "react-icons/md";
import '../styles/Register.css';
import { getSHA256Hash } from "boring-webcrypto-sha256";
import axios from 'axios';
import { useAuth } from '../providers/UserProvider';
import { useNavigate } from 'react-router-dom';



export default function Register() {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();
    
    const [name, setName] = useState('');
    const handleName = (e) => {
        setName(e.target.value);
    };
    const [email, setEmail] = useState('');
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const [password, setPassword] = useState('');
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const handleRepeatedPassword = (e) => {
        setRepeatedPassword(e.target.value);
    };

    useEffect(() => {
            if(auth.isAuth) navigate('/dashboard');
    },[auth.user, navigate]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(false);
        try {
            setIsLoading(true);
            if(password !== repeatedPassword){
                throw new Error("Passwords do not match");
            }else{
                const hashedPassword = (await getSHA256Hash(password)).toString();
                await axios.post('http://localhost:5000/api/auth/register', { nombre: name, email: email, password: hashedPassword, rol: 'USER' },{withCredentials: true});
                const res = await axios.get('http://localhost:5000/api/verify/getToken', { withCredentials: true });
                const { token, user } = res.data;
                auth.handleUser(user);
                auth.handleToken(token);
                if (auth.user.rol === 'ADMIN') auth.handleAdmin(true);
                auth.handleAuth(true);
            }
        } catch (error) {
            console.error("Error registering the user", error);
            setError(`${error.message}`);
            setIsLoading(false);
        }
    };
    return (
        <div className="register-container">
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
            <div className="register-card">
                {/*register Header*/}
                <div className="register-header">
                    <h1 className="register-title">Register</h1>
                    <p className="register-subtitle">Please enter your credentials</p>
                    {/*register Header Divider*/}
                    <div className="header-divider">
                        <div className="divider-line"></div>
                        <div className="divider-icon">☁</div>
                        <div className="divider-line"></div>
                    </div>
                </div>
                {/*register Form*/}
                <form className="register-form" onSubmit={onSubmit}>
                    <div className="form-group">
                        <label className="form-label">
                            <LuUser size={28} />
                            User name
                        </label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="User Name"
                            required
                            onChange={handleName}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">
                            <MdAlternateEmail size={28}/>
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-input"
                            placeholder="Email"
                            required
                            onChange={handleEmail}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="celebrantName" className="form-label">
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
                    <div className="form-group">
                        <label className="form-label">
                            <TbPasswordUser size={34} />
                            Repeat Password
                        </label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="Password"
                            required
                            onChange={handleRepeatedPassword}
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
                        className={`register-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner"></span>
                                Verificando...
                            </>
                        ) : (
                            <>
                                <ImEnter size={26} />
                                Sign In
                            </>
                        )}
                    </button>
                </form>
                {/*register Footer*/}
                <div className="register-footer">
                    <p className="footer-text">
                        do you have an account? <a href="/" className="footer-link">Sign in</a>
                    </p>
                    <div className="footer-decoration">
                        <FiCoffee size={30} />
                    </div>
                </div>
            </div>
        </div>
    );
}