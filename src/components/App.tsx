import React, { FC } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import style from './App.css';
import Welcome from '../routes/Welcome';
import Posts from '../routes/Posts';
import Post from '../routes/Post';
import CounterRoute from '../routes/CounterRoute';
import Header from './Header';
import { ToastContainer } from '../widgets/myToast';

const App: FC = () => {
    return (
        <div id="app">
            <Header />
            <div className={style.container}>
                <Routes>
                    <Route path="posts" element={<Posts />} />
                    <Route path="post/:id" element={<PostRoute />} />
                    <Route path="counter" element={<CounterRoute />} />
                    <Route path="/" element={<Welcome />} />
                    <Route path="*" element={<Welcome />} />
                </Routes>
                <ToastContainer />                
            </div>
        </div >
    );
};

function PostRoute() {
    const { id } = useParams();
    return <Post id={id as unknown as number} />;
}

export default App;