// DataProvider.js
import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [refetch, setRefetch] = useState(false);

    const fetchData = async () => {
        try {
            // Your fetch logic here
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const contextValue = {
        refetch,
        setRefetch,
        fetchData,
    };

    return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
