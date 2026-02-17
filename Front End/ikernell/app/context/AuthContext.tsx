import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Persona } from '@/types/persona';
import { AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [usuario, setUsuario] = useState<Persona | null>(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const sesionGuardada = localStorage.getItem('sesion');
        if (sesionGuardada) {
            try {
                const usuarioGuardado = JSON.parse(sesionGuardada);
                setUsuario(usuarioGuardado);
            } catch {
                localStorage.removeItem('sesion');
            }
        }
        setCargando(false);
    }, []);

    const iniciarSesion = async (documento: string, password: string) => {
        try {
            const response = await fetch('http://localhost:8080/api/personas/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ documento, password }),
            });

            if (!response.ok) {
                throw new Error('Credenciales inválidas');
            }

            const usuarioActual = await response.json();
            setUsuario(usuarioActual);
            localStorage.setItem('sesion', JSON.stringify(usuarioActual));
        } catch (error) {
            throw error;
        }
    };

    const cerrarSesion = () => {
        setUsuario(null);
        localStorage.removeItem('sesion');
    };

    return (
        <AuthContext.Provider
            value={{
                usuario,
                estaAutenticado: !!usuario,
                cargando,
                iniciarSesion,
                cerrarSesion,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de AuthProvider');
    }
    return context;
}
