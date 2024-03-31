import React from 'react';
import { useNavigate, useLocation } from "react-router"
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { GrHomeRounded } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa6";

import './footer.css'
import { LiaFileInvoiceSolid } from "react-icons/lia";

const Footer = ({ currentPage = 'home' }) => {
    const navigate = useNavigate();

    // Function to handle logout
    const handleLogout = () => {
        // Clear values from localStorage
        localStorage.setItem("user", '');
        localStorage.setItem("userID", '');
        localStorage.setItem("MusicCartUsername", '');
        localStorage.setItem("token", '');

        // Redirect to login page
        navigate('/login');
    };

    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('userID') !== '';

    // Function to handle click based on current page
    const handleClick = (path) => {
        navigate(path);
    };

    // Define footer content based on the current page
    let footerContent = null;
    switch (currentPage) {
        case 'home':
        case 'invoice':
            footerContent = (
                <React.Fragment>
                    <div style={{display: 'flex', flexDirection: 'column',gap: '2px', alignItems:'center'}} onClick={() => handleClick('/home')}>
                        <GrHomeRounded size={23} color='rgba(46, 0, 82, 1)' style={{ fontWeight: 'bold' }}/>
                        <p>Home</p>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column',gap: '2px', alignItems:'center'}} onClick={() => handleClick('/home')} onClick={() => handleClick('/cart')}>
                        <MdOutlineAddShoppingCart size={23} color='rgba(46, 0, 82, 1)' style={{ fontWeight: 'bold' }}/>
                        <p>Cart</p>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column',gap: '2px', alignItems:'center'}} onClick={() => handleClick('/home')} onClick={() => handleClick('/invoice')}>
                        <LiaFileInvoiceSolid size={23} color='rgba(46, 0, 82, 1)' style={{ fontWeight: 'bold' }}/>
                        <p>Invoice</p>
                    </div>
                    {isLoggedIn ? (
                        <div style={{display: 'flex', flexDirection: 'column',gap: '2px', alignItems:'center'}} onClick={() => handleClick('/home')} onClick={handleLogout}>
                            <FaRegUser size={23} color='rgba(46, 0, 82, 1)' style={{ fontWeight: 'bold' }}/>
                            <p>Logout</p>
                        </div>
                    ) : (
                        <div style={{display: 'flex', flexDirection: 'column',gap: '2px', alignItems:'center'}} onClick={() => handleClick('/home')} onClick={() => handleClick('/login')}>
                            <FaRegUser size={23} color='rgba(46, 0, 82, 1)' style={{ fontWeight: 'bold' }}/>
                            <p>Login</p>
                        </div>
                    )}
                </React.Fragment>
            );
            break;
        case 'login':
        case 'signup':
            footerContent = (
                <p>Musicart | All rights reserved</p>
            );
            break;
        case 'detail':
        case 'cart':
        case 'checkout':
            footerContent = (
                <React.Fragment>
                    <div onClick={() => handleClick('/home')}>
                        <GrHomeRounded />
                        <p>Home</p>
                    </div>
                    <div onClick={() => handleClick('/cart')}>
                        <MdOutlineAddShoppingCart />
                        <p>Cart</p>
                    </div>
                    <div onClick={() => handleClick('/invoice')}>
                        <MdOutlineAddShoppingCart />
                        <p>Invoice</p>
                    </div>
                </React.Fragment>
            );
            break;
        default:
            footerContent = null;
    }

    return (
        <div className={`mobileFooter ${currentPage}-footer`}>
            {footerContent}
        </div>
    );
}

export default Footer;