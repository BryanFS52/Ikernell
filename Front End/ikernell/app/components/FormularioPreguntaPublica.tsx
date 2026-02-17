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
        <form onSubmit={handleSubmit} className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Hacer una Pregunta</h3>

            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                    {error}
                </div>
            )}

            {exito && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
                    ✓ Pregunta enviada. Será respondida pronto.
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Titulo
                    </label>
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        placeholder="Ej: ¿Cómo funcionan los proyectos?"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        required
                        disabled={cargando}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tu Pregunta
                    </label>
                    <textarea
                        value={contenido}
                        onChange={(e) => setContenido(e.target.value)}
                        placeholder="Describe tu pregunta en detalle..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
                        rows={4}
                        required
                        disabled={cargando}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tu Nombre
                        </label>
                        <input
                            type="text"
                            value={autor}
                            onChange={(e) => setAutor(e.target.value)}
                            placeholder="Tu nombre"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            required
                            disabled={cargando}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={cargando}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${cargando ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                    {cargando ? 'Enviando...' : 'Enviar Pregunta'}
                </button>
            </div>
        </form>
    );
}
