import React, { useState, useEffect } from 'react';

const FeedbackForm = ({ onClose }) => {
    const [feedbackType, setFeedbackType] = useState('');
    const [feedbackText, setFeedbackText] = useState('');

    // Extract user ID from local storage (you can modify this logic as needed)
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (!event.target.closest('.form-container')) {
            onClose();
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId, feedbackType, feedbackText })
            });
    
            if (response.ok) {
                console.log('Feedback submitted successfully');
                alert('Feedback submitted successfully');
                onClose();
            } else {
                console.error('Error submitting feedback:', response.statusText);
                
                onClose();
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };
    

    return (
        <form onSubmit={handleSubmit}
              style={{
                    width: '18vw',
                    height: '33vh',
                    margin: 'auto',
                    position: 'absolute',
                    bottom: '11vh',
                    right: '-7vw',
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    boxShadow: '0px 0px 20px black',
                    padding: '1.3rem',
                    boxSizing: 'border-box'
              }}
            >
            <label>
                Type of Feedback
                <select
                    value={feedbackType}
                    onChange={(e) => setFeedbackType(e.target.value)}
                    required
                    style={{
                        width: 'calc(100% - 20px)',
                        padding: '10px',
                        border: '1px solid #ccc' // Custom border style
                    }}
                >
                    <option value="" disabled>Choose the type</option>
                    <option value="Bugs">Bugs</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Query">Query</option>
                </select>
            </label>

            <label>
                Feedback
                <textarea
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    required
                    style={{
                        width: 'calc(100% - 20px)',
                        padding: '10px',
                        border: '1px solid #ccc' // Custom border style
                    }}
                />
            </label>

            <button type="submit" style={{ backgroundColor: 'purple', color: 'white' }}>Submit</button>
        </form>
    );
};

export default FeedbackForm;
