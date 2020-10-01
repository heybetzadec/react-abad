import React from 'react';

const main = {
    display: 'table',
    width: '100%',
    height: '100vh',
    textAlign: "center"
};

const nf = {
    display: 'table-cell',
    verticalAlign: 'middle',
    transition: 'all 0.6s',
    fontFamily: "Lato, sans-serif"
}

const nfH = {
    fontSize: '50px',
    display: 'inline-block',
    paddingRight: '12px',
}

const NotFound = () => (
    <div style={main} >
        <div style={nf}>
            <h1 style={nfH}>Error 404</h1>
        </div>
    </div>
);

export default NotFound;