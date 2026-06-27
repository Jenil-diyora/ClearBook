import React from 'react';
import { NavMenu } from './NavMenu';

export const Layout = ({ children }) => {
  return (
    <div className="app-shell">
      <NavMenu />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};
