import React from 'react';
import styled from 'styled-components';
import confetti from '../assets/confetti.png';
import musicart from '../assets/musicart.png';
import Footer from '../Components/Footer/footer'

// Styled components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  margin: 1.5% 0% 1% 0%;
  position: absolute;
  top: 0px;
  gap: 0.7rem;
  left: 2rem;
  @media (max-width: 600px) {
    display: none;
  }
`;

const ImageContainer = styled.div`
  width: 50px;
  height: 50px;
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const SuccessImageContainer = styled.div`
    
    width: 10rem;
    height: 10rem;
    margin: 2rem 18.5rem;
    img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    }
`;
const Title = styled.h1`
  font-family: Roboto;
  font-size: 42px;
  padding-left: 0.7%;
  font-weight: 600;
  line-height: 51.71px;
  color: rgba(46, 0, 82, 1);
`;

const MessageBox = styled.div`
  width: 45rem;
  height: 25rem;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid rgba(230, 230, 230, 1);
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.11);
  text-align: center;
`;

const HomeButton = styled.button`
  background-color: rgba(46, 0, 82, 1);
  color: white;
  padding: 0.5rem 5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 2.3rem;
  font-size: 1.13rem;
`;

export const ThanksPage = () => {
  return (
    <>
      <PageContainer>
        <Header>
            <ImageContainer>
            <img src={musicart} alt="Musicart Logo" />
            </ImageContainer>
            <Title>Musicart</Title>
        </Header>
        <MessageBox>
            <SuccessImageContainer>
            <img src={confetti} alt="Success" style={{ display: 'block', margin: 'auto' }} />
            </SuccessImageContainer>
            <h2 style={{fontSize: '1.7rem', fontWeight: '500', margin: '0.7rem 0rem'}}>Order is placed successfully!</h2>
            <p style= {{fontSize: '1.1rem', color: 'rgba(150, 150, 150, 1)'}}>You will receive a confirmation email with order details.</p>
            <HomeButton onClick={() => window.location.href = '/home'}>
            Go back to Home page
            </HomeButton>
        </MessageBox>
      </PageContainer>
      <Footer />
    </>
  );
};
