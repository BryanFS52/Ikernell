'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
    rolesPermitidos?: number[];
}

export function ProtectedRoute({ children, rolesPermitidos }: ProtectedRouteProps) {
    const { estaAutenticado, cargando, usuario } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!cargando && !estaAutenticado) {
            router.push('/login');
        }

        if (!cargando && estaAutenticado && rolesPermitidos && usuario) {
            if (!rolesPermitidos.includes(usuario.rol.idRol)) {
                router.push('/no-autorizado');
            }
        }
    }, [cargando, estaAutenticado, rolesPermitidos, usuario, router]);

    if (cargando) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-600">Cargando...</p>
            </div>
        );
    }

    if (!estaAutenticado) {
        return null;
    }

    if (rolesPermitidos && usuario && !rolesPermitidos.includes(usuario.rol.idRol)) {
        return null;
    }

    return <>{children}</>;
}
