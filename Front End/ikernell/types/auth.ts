import { Persona } from './persona';

export interface AuthContextType {
    usuario: Persona | null;
    estaAutenticado: boolean;
    cargando: boolean;
    iniciarSesion: (usuario: string, contraseña: string) => Promise<void>;
    cerrarSesion: () => void;
}

export interface CredencialesLogin {
    usuario: string;
    contraseña: string;
}
