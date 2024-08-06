import React from 'react';
import { useNavigate} from "react-router"
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { GrHomeRounded } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa6";

import './footer.css'
import { LiaFileInvoiceSolid } from "react-icons/lia";

const Footer = ({ currentPage }) => {
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

    let footerContent = null;
    switch (currentPage) {
        case 'home':
        case 'invoice':
        case 'thanks':
            footerContent = (
                <React.Fragment>
                    <div style={{display: 'flex', flexDirection: 'column',gap: '2px', alignItems:'center'}} onClick={() => handleClick('/')}>
                        <GrHomeRounded size={30} color='rgba(46, 0, 82, 1)' style={{ fontWeight: 'bold' }}/>
                        <p>Home</p>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column',gap: '2px', alignItems:'center'}} onClick={() => handleClick('/cart')}>
                        <MdOutlineAddShoppingCart size={35} color='rgba(46, 0, 82, 1)' style={{ fontWeight: 'bold' }}/>
                        <p>Cart</p>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column',gap: '2px', alignItems:'center'}} onClick={() => handleClick('/invoice')}>
                        <LiaFileInvoiceSolid size={35} color='rgba(46, 0, 82, 1)' style={{ fontWeight: 'bold' }}/>
                        <p>Invoice</p>
                    </div>
                    {isLoggedIn ? (
                        <div style={{display: 'flex', flexDirection: 'column',gap: '2px', alignItems:'center'}} onClick={handleLogout}>
                            <FaRegUser size={30} color='rgba(46, 0, 82, 1)' style={{ fontWeight: 'bold' }}/>
                            <p>Logout</p>
                        </div>
                    ) : (
                        <div style={{display: 'flex', flexDirection: 'column',gap: '2px', alignItems:'center'}} onClick={() => handleClick('/login')}>
                            <FaRegUser size={30} color='rgba(46, 0, 82, 1)' style={{ fontWeight: 'bold' }}/>
                            <p>Login</p>
                        </div>
                    )}
                </React.Fragment>
            );
            break;
        case 'login':
        case 'signup':
            footerContent = (
                <p>Musicart <span style={{margin: '0rem 0.5rem'}}>|</span> All rights reserved</p>
            );
            break;
        case 'detail':
        case 'cart':
        case 'checkout':
            footerContent = (
                <React.Fragment>
                    <div style={{display: 'flex', flexDirection: 'column',gap: '2px', alignItems:'center'}} onClick={() => handleClick('/')}>
                        <GrHomeRounded size={30} color='rgba(46, 0, 82, 1)' style={{ fontWeight: 'bold' }}/>
                        <p>Home</p>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column',gap: '2px', alignItems:'center'}} onClick={() => handleClick('/cart')}>
                        <MdOutlineAddShoppingCart size={35} color='rgba(46, 0, 82, 1)' style={{ fontWeight: 'bold' }}/>
                        <p>Cart</p>
                    </div>
                    {isLoggedIn ? (
                        <div style={{display: 'flex', flexDirection: 'column',gap: '2px', alignItems:'center'}} onClick={handleLogout}>
                            <FaRegUser size={30} color='rgba(46, 0, 82, 1)' style={{ fontWeight: 'bold' }}/>
                            <p>Logout</p>
                        </div>
                    ) : (
                        <div style={{display: 'flex', flexDirection: 'column',gap: '2px', alignItems:'center'}} onClick={() => handleClick('/login')}>
                            <FaRegUser size={30} color='rgba(46, 0, 82, 1)' style={{ fontWeight: 'bold' }}/>
                            <p>Login</p>
                        </div>
                    )}
                </React.Fragment>
            );
            break;
        default:
            footerContent = null;
    }

    return (
        <>
            <div className="footerSection">
                <p>Musicart <span style={{margin: '0rem 1rem'}}>|</span> All rights reserved</p>
            </div>
            <div className={`mobileFooter ${currentPage}-footer`}>
                {footerContent}
            </div>
        </>
    );
}

export default Footer;