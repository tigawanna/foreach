
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PBUser } from '../types/types';

export const useAuthGuard = (user:PBUser,test_mode:boolean) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.email && !test_mode) {
            navigate("/auth");
        }
    }, [user?.email]);
};
