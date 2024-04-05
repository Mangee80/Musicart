import React from 'react';
import confetti from '../assets/confetti.png'
export const ThanksPage = () => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
            }}
        >
            <div style={{
            width: '400px',
            margin: 'auto',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Adding a box shadow
            textAlign: 'center', // Centering the content
        }}>
            <img src={confetti} alt="Success" style={{ display: 'block', margin: 'auto' }} />
            <h2>Order is placed successfully!</h2>
            <p>You will receive a confirmation email with order details.</p>
            <button
                style={{
                    backgroundColor: '#5A20CB',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer', // Adding a pointer cursor
                }}
                onClick={() => window.location.href = '/home'}
            >
                Go back to Home page
            </button>
        </div>
        </div>
        
    );
}