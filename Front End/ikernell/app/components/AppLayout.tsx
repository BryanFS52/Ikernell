'use client';

import { AuthProvider, useAuth } from '@/app/context/AuthContext';
import { Navbar } from '@/app/components/Navbar';
import SessionStatus from '@/components/SessionStatus';
import { ReactNode } from 'react';

function AppLayoutContent({ children }: { children: ReactNode }) {
    const { estaAutenticado, cargando } = useAuth();

    // No mostrar navbar en login y páginas sin autenticación
    if (cargando) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Cargando...</p>
            </div>
        );
    }

    return (
        <>
            {estaAutenticado && <Navbar />}
            {estaAutenticado && <SessionStatus />}
            <main>{children}</main>
        </>
    );
}

export function AppLayout({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <AppLayoutContent>{children}</AppLayoutContent>
        </AuthProvider>
    );
}
