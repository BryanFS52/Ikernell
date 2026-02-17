'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function Navbar() {
    const { usuario, cerrarSesion } = useAuth();
    const router = useRouter();

    const handleCerrarSesion = () => {
        cerrarSesion();
        router.push('/'); // Redirigir al home público
    };

    if (!usuario) return null;

    return (
        <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <h1 className="text-2xl font-bold">Ikernell</h1>
                    </Link>

                    {/* Nav Links */}
                    <div className="hidden md:flex space-x-6">
                        <Link href="/" className="hover:text-blue-200 transition">
                            Inicio
                        </Link>
                        <Link href="/proyectos" className="hover:text-blue-200 transition">
                            Proyectos
                        </Link>
                        <Link href="/personas" className="hover:text-blue-200 transition">
                            Personas
                        </Link>
                        <Link href="/roles" className="hover:text-blue-200 transition">
                            Roles
                        </Link>
                        {usuario.rol.nombre === 'Coordinador de Proyectos' && (
                            <Link href="/personas/crear" className="hover:text-blue-200 transition">
                                Crear Usuario
                            </Link>
                        )}
                    </div>

                    {/* User Info */}
                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                            <p className="font-medium">
                                {usuario.nombre} {usuario.apellido}
                            </p>
                            <p className="text-xs text-blue-100">{usuario.rol.nombre}</p>
                        </div>
                        <button
                            onClick={handleCerrarSesion}
                            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
