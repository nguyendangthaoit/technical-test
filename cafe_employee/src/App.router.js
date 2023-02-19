import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./page/home/home";
import Cafe from './page/cafe/cafe';
export default function AppRouter() {
    return (
        <Routes>
            <Route path="/cafe" element={<Cafe />} />
            <Route path="*" element={<Home />} />
        </Routes>
    );
}
