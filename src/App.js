import React from 'react';
import Navbar from './components/Navbar';
import {Outlet} from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import Footer from './components/Footer';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Navbar />
        <Outlet />
        <Footer />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

