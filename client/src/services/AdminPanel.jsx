import React from 'react';

function AdminPanel() {
    const buttonStyle = {
        border: '1px solid #cfc2c2ff',
        borderRadius: '5px',
        padding: '10px 24px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'border-color 0.2s',
    };

    return (
        <div className='panel-container' style={{ display: 'flex', gap: '16px', justifyContent: 'center', padding: '24px' }}>
            <button className='panel-button' style={buttonStyle}>Usuarios</button>
            <button className='panel-button' style={buttonStyle}>Productos</button>
            <button className='panel-button' style={buttonStyle}>?</button>
        </div>
    );
}

export default AdminPanel;