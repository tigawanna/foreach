import React from 'react';
import { Hero } from '../../components/index/Hero';
import { PBUser } from '../../utils/types/types';

interface WelcomePageProps {
  user?: PBUser;
}

export const WelcomePage = () => (
  <div className="w-full h-full flex flex-col justify-start items center dark:bg-slate-900">
    <Hero />
  </div>
);
