'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';

interface SessionStatusProps {
    mostrarSiempre?: boolean;
}

export default function SessionStatus({ mostrarSiempre = false }: SessionStatusProps) {
    const { estaAutenticado, obtenerTiempoRestante } = useAuth();
    const [tiempoRestante, setTiempoRestante] = useState<number>(0);

    useEffect(() => {
        if (!estaAutenticado) return;

        const actualizarTiempo = () => {
            const tiempo = obtenerTiempoRestante();
            setTiempoRestante(tiempo);
        };

        // Actualizar inmediatamente
        actualizarTiempo();

        // Actualizar cada minuto
        const interval = setInterval(actualizarTiempo, 60000);

        return () => clearInterval(interval);
    }, [estaAutenticado, obtenerTiempoRestante]);

    if (!estaAutenticado) return null;

    // Si mostrarSiempre es false, solo mostrar cuando quedan menos de 5 minutos
    if (!mostrarSiempre && tiempoRestante > 5) return null;

    const obtenerColorAlerta = () => {
        if (tiempoRestante <= 2) return 'text-red-600 bg-red-50 border-red-200';
        if (tiempoRestante <= 5) return 'text-orange-600 bg-orange-50 border-orange-200';
        return 'text-blue-600 bg-blue-50 border-blue-200';
    };

    const obtenerMensaje = () => {
        if (tiempoRestante <= 1) {
            return 'Tu sesión expirará en menos de 1 minuto';
        }
        return `Tu sesión expirará en ${tiempoRestante} minutos`;
    };

    return (
        <div className={`fixed top-4 right-4 z-50 p-3 rounded-lg border text-sm font-medium ${obtenerColorAlerta()}`}>
            <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>{obtenerMensaje()}</span>
            </div>
        </div>
    );
}