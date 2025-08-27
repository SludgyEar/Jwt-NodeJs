import React, { useState } from 'react';
import '../styles/Dashboard.css'
import { useAuth } from '../providers/UserProvider';

export default function Dashboard() {
    const auth = useAuth();
    const [selectedService, setSelectedService] = useState('inicio');
    const handleSelectedService = (service) => {
        setSelectedService(service);
    };
    return (
        <div className='dashboard-container'>
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
            <div className="dashboard-card">
                <div className="side-bar">
                    <button className={selectedService === 'inicio' ? 'active' : ''}
                        onClick={() => handleSelectedService('inicio')}
                    >
                        Inicio
                    </button>

                    <button className={selectedService === 'perfil' ? 'active' : ''}
                        onClick={() => handleSelectedService('perfil')}
                    >
                        Perfil
                    </button>
                </div>
            {selectedService === 'inicio' && (
                <div className="service-card">
                    <h2>Bienvenido al inicio {auth.user.name}, tienes privilegios de {auth.user.rol}.</h2>
                    <p>Datos: {auth.user.id} {auth.user.name} {auth.user.status} {auth.user.tel} {auth.user.rol} {auth.user.iat} {auth.user.exp}</p>
                </div>
            )}
            {selectedService === 'perfil' && (
                <div className="service-card">
                        <h2>Bienvenido a tu perfil</h2>
                        <a href="/" className="footer-link">login</a>
                </div>
            )}
            </div>
        </div>
    );
}