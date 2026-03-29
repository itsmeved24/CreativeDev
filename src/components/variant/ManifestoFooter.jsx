import React from 'react';

const ManifestoFooter = () => (
    <footer className="v-manifesto">
        {/* Left: manifesto text */}
        <div>
            <h2 className="v-h2">Design without drag-and-drop.</h2>
            <br />
            <p>
                Stop pixel pushing. Start programming design logic. Variant takes your
                brand rules and generates every possible valid permutation.
            </p>
        </div>

        {/* Right: small print */}
        <div className="v-small-print">
            <div style={{ borderTop: '1px solid #141414', paddingTop: '1rem', width: '100%' }}>
                Variant Systems Inc.<br />
                San Francisco, CA<br />
                [420, 201, 99]<br />
                <br />
                © 2024 All Rights Reserved.
            </div>
            <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
                <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Documentation</a>
                <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>API Access</a>
                <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Enterprise</a>
            </div>
        </div>
    </footer>
);

export default ManifestoFooter;
