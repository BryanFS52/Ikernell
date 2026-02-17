'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

export default function LoginPage() {
    const [documento, setDocumento] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);
    const { iniciarSesion } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setCargando(true);

        try {
            await iniciarSesion(documento, password);
            router.push('/');
        } catch (err) {
            setError(
                err instanceof Error ? err.message : 'Error al iniciar sesión'
            );
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-lg shadow-2xl p-8">
                    {/* Logo/Título */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">Ikernell</h1>
                        <p className="text-gray-600 mt-2">Sistema de Gestión de Proyectos</p>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit}>
                        {/* Error Message */}
                        {error && (
                            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                                {error}
                            </div>
                        )}

                        {/* Usuario */}
                        <div className="mb-4">
                            <label
                                htmlFor="documento"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Documento
                            </label>
                            <input
                                type="text"
                                id="documento"
                                value={documento}
                                onChange={(e) => setDocumento(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                placeholder="Ingresa tu documento"
                                required
                                disabled={cargando}
                            />
                        </div>

                        {/* Contraseña */}
                        <div className="mb-6">
                            <label
                                htmlFor="password"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                placeholder="Ingresa tu contraseña"
                                required
                                disabled={cargando}
                            />
                        </div>

                        {/* Botón Login */}
                        <button
                            type="submit"
                            disabled={cargando}
                            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${cargando
                                    ? 'bg-gray-400 text-white cursor-not-allowed'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                        >
                            {cargando ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                        </button>
                    </form>

                    {/* Info Footer */}
                    <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
                        <p>¿Necesitas ayuda? Contacta al coordinador de proyectos</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
