import React from 'react';

const defaultProps = {
    title : "Developed by:",
    developerName : "Dikshant Godara"
}

const Footer = ({title, developerName}) => {
    return (
        <footer className="text-center">
            <div className="title font-bold">{title}</div>
            <div className="font-bold">{developerName}</div>
        </footer>
    );
}

Footer.defaultProps = defaultProps;
export default Footer;