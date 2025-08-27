import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios';

const UserContext = createContext({
    isAuth: false,
    handleAuth: () => {},
    isAdmin: false,
    handleAdmin : () => {},
    user: {},
    handleUser: () => {},
    handleLogout: () => {},
    token: '',
    handleToken: () => {}
});

export function UserProvider({ children }){
    useEffect(() => {
        async function fetchToken() {
            const response = await axios.get('http://localhost:5000/api/verify/getToken', {withCredentials: true});
            const { token, user } = response.data;
            if(response.data){
                try {
                    const currentTime = Date.now() / 1000;
                    if (user.exp > currentTime) {
                        setToken(token);
                        if (user){
                            setUser(user);
                            handleAuth(true);
                        }else{
                            setUser({
                                id: user.id,
                                name: user.name || '',
                                rol: user.role,
                                status: user.status,
                                tel: user.tel
                            });
                            handleAuth(true);
                        }
                    } else {
                        await axios.get('http://localhost:5000/api/verify/removeToken', { withCredentials: true });
                    }
                } catch (error) {
                    console.error('Error al verificar token:', error);
                }
            }
        }
        fetchToken();
    }, []);

    const [token, setToken] = useState('');
    const handleToken = (token) => {
        setToken(token);
    };
    const [user, setUser] = useState({});
    const handleUser = (userData) => {
        setUser(userData);
    }
    const [isAuth, setIsAuth] = useState(false);
    const handleAuth = (state = true) => {
        setIsAuth(state);
    }
    const [isAdmin, setIsAdmin] = useState(false);
    const handleAdmin = (state = true) => {
        setIsAdmin(state);
    }
    const handleLogout = () => {
        setIsAuth(false);
        setIsAdmin(false);
        setUser({});
    }

    return (
        <UserContext.Provider value={{
            isAuth,
            handleAuth,
            isAdmin,
            handleAdmin,
            user,
            handleUser,
            handleLogout,
            token,
            handleToken
        }}>
            {children}
        </UserContext.Provider>
    );
}

export const useAuth = () => useContext(UserContext);