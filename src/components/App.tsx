import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import style from './App.css';
import Welcome from '../routes/Welcome';
import Posts from '../routes/Posts';
import Profile from '../routes/Profile';
import Header from './Header';
import { ToastContainer } from '../widgets/myToast';

const App: FC = () => {
    return (
        <div id="app">
            <Header />
            <div className={style.container}>
                <Routes>
                    <Route path="posts" element={<Posts />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="/" element={<Welcome />} />
                    <Route path="*" element={<Welcome />} />
                </Routes>
                <ToastContainer />                
            </div>
        </div >
    );
};

export default App;