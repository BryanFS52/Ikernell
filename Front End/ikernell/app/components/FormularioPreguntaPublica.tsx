'use client';

import { useState } from 'react';
import { crearPregunta } from '@/services/pregunta.service';

interface FormularioPreguntaPublicaProps {
    onSuccess?: () => void;
}

export function FormularioPreguntaPublica({ onSuccess }: FormularioPreguntaPublicaProps) {
    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');
    const [autor, setAutor] = useState('');
    const [fecha, setFecha] = useState('')
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState('');
    const [exito, setExito] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setExito(false);
        setCargando(true);

        try {
            await crearPregunta({
                titulo,
                contenido,
                autor,
            });

            setTitulo('');
            setContenido('');
            setAutor('');
            setExito(true);

            setTimeout(() => setExito(false), 3000);
            onSuccess?.();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al enviar pregunta');
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/95 to-blue-50/95 backdrop-blur-sm border border-white/20 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-600/10"></div>
            <form onSubmit={handleSubmit} className="relative p-8">
                <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">Hacer una Pregunta</h3>
                    <p className="text-gray-600">Nuestro equipo te responderá pronto</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50/80 backdrop-blur border border-red-200/50 text-red-700 rounded-xl text-sm shadow-lg">
                        <div className="flex items-center gap-2">
                            <span className="text-red-500">⚠</span>
                            {error}
                        </div>
                    </div>
                )}

                {exito && (
                    <div className="mb-6 p-4 bg-green-50/80 backdrop-blur border border-green-200/50 text-green-700 rounded-xl text-sm shadow-lg">
                        <div className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            Pregunta enviada. Será respondida pronto.
                        </div>
                    </div>
                )}

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                Título
                            </span>
                        </label>
                        <input
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            placeholder="Ej: ¿Cómo funcionan los proyectos?"
                            className="w-full px-4 py-3 border border-gray-200/50 rounded-xl bg-white/70 backdrop-blur focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all shadow-sm hover:shadow-md"
                            required
                            disabled={cargando}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                Tu Pregunta
                            </span>
                        </label>
                        <textarea
                            value={contenido}
                            onChange={(e) => setContenido(e.target.value)}
                            placeholder="Describe tu pregunta en detalle..."
                            className="w-full px-4 py-3 border border-gray-200/50 rounded-xl bg-white/70 backdrop-blur focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all shadow-sm hover:shadow-md resize-none"
                            rows={4}
                            required
                            disabled={cargando}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                Tu Nombre
                            </span>
                        </label>
                        <input
                            type="text"
                            value={autor}
                            onChange={(e) => setAutor(e.target.value)}
                            placeholder="Tu nombre"
                            className="w-full px-4 py-3 border border-gray-200/50 rounded-xl bg-white/70 backdrop-blur focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all shadow-sm hover:shadow-md"
                            required
                            disabled={cargando}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={cargando}
                        className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 shadow-lg transform hover:scale-[1.02] ${
                            cargando
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/25 hover:shadow-blue-500/40'
                        }`}
                    >
                        {cargando ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Enviando...
                            </span>
                        ) : 'Enviar Pregunta'}
                    </button>
                </div>
            </form>
        </div>
    );
}
