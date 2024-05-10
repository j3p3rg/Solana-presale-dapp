
import React from 'react';

const Header = () => {
    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#333', color: '#fff' }}>
            <div>Presale DApp</div>
            <nav>
                <button>About</button>
                <button>Roadmap</button>
                <button>Team</button>
                <button>Tokenomics</button>
                <button>FAQ</button>
            </nav>
        </header>
    );
};

export default Header;
