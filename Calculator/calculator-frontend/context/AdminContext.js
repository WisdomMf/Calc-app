// context/AdminContext.js
import React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(true); // This should be set based on actual admin authentication

    return (
        <AdminContext.Provider value={{ isAdmin }}>
            {children}
        </AdminContext.Provider>
    );
};
