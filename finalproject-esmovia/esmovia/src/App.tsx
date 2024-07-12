import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './UserContext';
import Header from './common/Header/Header';
import Body from './pages/Body/Body';
import Footer from './common/Footer/Footer';
function App() {
    return (
        <UserProvider>
                <Header />
                <Body />
                <Footer/>
        </UserProvider>
    );
}

export default App;
