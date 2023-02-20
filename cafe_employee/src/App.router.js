import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./page/home/home";
import Cafe from './page/cafe/cafe';
import Employee from './page/employee/employee';
export default function AppRouter() {
    return (
        <Routes>
            <Route path="/cafe" element={<Cafe />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="*" element={<Home />} />
        </Routes>
    );
}
