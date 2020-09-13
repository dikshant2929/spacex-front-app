import React from 'react';

const defaultProps = {
    title : "SpaceX Launch Programs"
}

const Header = ({title}) => {
    return (
        <header>
            <h1 className = "container">{title}</h1>
        </header>
    );
}

Header.defaultProps = defaultProps;
export default Header;