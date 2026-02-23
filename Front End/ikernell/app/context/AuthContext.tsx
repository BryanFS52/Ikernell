import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from 'react';
import { Persona } from '@/types/persona';
import { AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Configuración de timeout de sesión (en minutos)
const TIMEOUT_INACTIVIDAD = 30;
const VERIFICACION_SESION_INTERVALO = 5 * 60 * 1000;

export function AuthProvider({ children }: { children: ReactNode }) {
    const [usuario, setUsuario] = useState<Persona | null>(null);
    const [cargando, setCargando] = useState(true);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Función para limpiar la sesión
    const limpiarSesion = useCallback(() => {
        setUsuario(null);
        sessionStorage.removeItem('sesion');
        sessionStorage.removeItem('tiempoUltimaActividad');
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    // Función para renovar el timeout de inactividad
    const renovarTimeout = useCallback(() => {
        const ahora = Date.now();
        sessionStorage.setItem('tiempoUltimaActividad', ahora.toString());
        
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        
        timeoutRef.current = setTimeout(() => {
            console.log('Sesión cerrada por inactividad');
            limpiarSesion();
        }, TIMEOUT_INACTIVIDAD * 60 * 1000);
    }, [limpiarSesion]);

    // Función para verificar si la sesión ha expirado
    const verificarExpiracionSesion = useCallback(() => {
        const tiempoUltimaActividad = sessionStorage.getItem('tiempoUltimaActividad');
        if (tiempoUltimaActividad) {
            const ahora = Date.now();
            const tiempoTranscurrido = ahora - parseInt(tiempoUltimaActividad);
            const tiempoMaximo = TIMEOUT_INACTIVIDAD * 60 * 1000;
            
            if (tiempoTranscurrido > tiempoMaximo) {
                console.log('Sesión expirada por tiempo');
                limpiarSesion();
                return false;
            }
        }
        return true;
    }, [limpiarSesion]);

    // Detectar actividad del usuario
    const manejarActividad = useCallback(() => {
        if (usuario) {
            renovarTimeout();
        }
    }, [usuario, renovarTimeout]);

    useEffect(() => {
        const sesionGuardada = sessionStorage.getItem('sesion');
        if (sesionGuardada) {
            try {
                const usuarioGuardado = JSON.parse(sesionGuardada);
                
                // Verificar si la sesión ha expirado
                if (verificarExpiracionSesion()) {
                    setUsuario(usuarioGuardado);
                    renovarTimeout();
                } else {
                    limpiarSesion();
                }
            } catch {
                sessionStorage.removeItem('sesion');
                sessionStorage.removeItem('tiempoUltimaActividad');
            }
        }
        setCargando(false);
    }, [verificarExpiracionSesion, renovarTimeout, limpiarSesion]);

    // Configurar listeners para detectar actividad
    useEffect(() => {
        if (usuario) {
            const eventos = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
            
            eventos.forEach(evento => {
                document.addEventListener(evento, manejarActividad, true);
            });

            // Configurar verificación periódica
            intervalRef.current = setInterval(verificarExpiracionSesion, VERIFICACION_SESION_INTERVALO);

            // Detectar cierre de ventana/pestaña
            const manejarCierreVentana = (e: BeforeUnloadEvent) => {
                limpiarSesion();
            };

            const manejarVisibilidadCambio = () => {
                if (document.hidden) {
                    return;
                } else {
                    verificarExpiracionSesion();
                }
            };

            window.addEventListener('beforeunload', manejarCierreVentana);
            document.addEventListener('visibilitychange', manejarVisibilidadCambio);

            return () => {
                eventos.forEach(evento => {
                    document.removeEventListener(evento, manejarActividad, true);
                });
                window.removeEventListener('beforeunload', manejarCierreVentana);
                document.removeEventListener('visibilitychange', manejarVisibilidadCambio);
                
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }
            };
        }
    }, [usuario, manejarActividad, verificarExpiracionSesion, limpiarSesion]);

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
            
            sessionStorage.setItem('sesion', JSON.stringify(usuarioActual));
            renovarTimeout();
        } catch (error) {
            throw error;
        }
    };

    const cerrarSesion = () => {
        limpiarSesion();
    };

    // Función para obtener el tiempo restante de sesión
    const obtenerTiempoRestante = () => {
        const tiempoUltimaActividad = sessionStorage.getItem('tiempoUltimaActividad');
        if (!tiempoUltimaActividad) return 0;
        
        const ahora = Date.now();
        const tiempoTranscurrido = ahora - parseInt(tiempoUltimaActividad);
        const tiempoMaximo = TIMEOUT_INACTIVIDAD * 60 * 1000;
        const tiempoRestante = Math.max(0, tiempoMaximo - tiempoTranscurrido);
        
        return Math.floor(tiempoRestante / 1000 / 60);
    };

    return (
        <AuthContext.Provider
            value={{
                usuario,
                estaAutenticado: !!usuario,
                cargando,
                iniciarSesion,
                cerrarSesion,
                obtenerTiempoRestante,
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
