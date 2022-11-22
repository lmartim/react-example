import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import AuthLayout from './layouts/AuthLayout'
import ProtectedLayout from './layouts/ProtectedLayout'

import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Posts from './pages/Posts/Posts'
import Post from './pages/Posts/Post'
import CreatePost from './pages/Posts/CreatePost'

import './App.css';

function App() {
    console.log()

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="" element={<AuthLayout />}>
                        <Route path="" element={<Login />} />
                        <Route path="register" element={<Register />} />
                    </Route>
                    <Route path="posts" element={<ProtectedLayout />}>
                        <Route path="" element={<Posts />} />
                        <Route path=":postId" element={<Post />} />
                        <Route path="create" element={<CreatePost />} />
                    </Route>
                </Routes>
            </div>
        </Router>
    )
}

export default App;
