/* eslint-disable prettier/prettier */
/* eslint-disable linebreak-style */
import React from 'react';
import { Outlet } from 'react-router-dom';
import { PBUser } from '../../utils/types/types';

interface ProfileLayoutProps {
  user: PBUser;
}

export const ProfileLayout: React.FC<ProfileLayoutProps> = () => (
  <div className="w-full h-full">
    <Outlet />
  </div>
);
