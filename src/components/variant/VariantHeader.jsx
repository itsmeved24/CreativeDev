import React from 'react';

const VariantHeader = () => (
    <header className="v-header">
        <div className="v-nav-item">
            <strong>Variant</strong>{' '}
            <span style={{ opacity: 0.5, marginLeft: 5 }}>v1.0.4</span>
        </div>
        <div className="v-nav-item">
            System Status:{' '}
            <span style={{ color: '#00AA00' }}>●</span> Online
        </div>
        <div className="v-nav-item">User: Guest</div>
        <div className="v-nav-item" style={{ textAlign: 'right' }}>
            Menu +
        </div>
    </header>
);

export default VariantHeader;
