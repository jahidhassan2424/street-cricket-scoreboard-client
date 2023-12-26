import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

function RequireAuth({ children }) {
    const [user] = useAuthState(auth);
    if (user) {
        return children;
    }
}

export default RequireAuth