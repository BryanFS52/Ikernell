'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { getNoticia, crearNoticia } from '@/services/noticia.service';
import { getPreguntas } from '@/services/pregunta.service';
import { SeccionPreguntas } from '@/app/components/SeccionPreguntas';
import { Noticia } from '@/types/noticia';
import { Pregunta } from '@/types/pregunta';

export function HomePrivada() {
    const { usuario } = useAuth();
    const [noticias, setNoticias] = useState<Noticia[]>([]);
    const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
    const [newNoticia, setNewNoticia] = useState('');
    const [cargando, setCargando] = useState(true);
    const [creandoNoticia, setCreandoNoticia] = useState(false);
    const [errorNoticia, setErrorNoticia] = useState('');

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            const [noticiasData, preguntasData] = await Promise.all([
                getNoticia().catch(() => []),
                getPreguntas().catch(() => []),
            ]);
            setNoticias(noticiasData);
            setPreguntas(preguntasData);
        } catch (error) {
            console.error('Error al cargar datos:', error);
        } finally {
            setCargando(false);
        }
    };

    const agregarNoticia = async () => {
        if (!newNoticia.trim()) return;

        setCreandoNoticia(true);
        setErrorNoticia('');

        try {
            await crearNoticia({ titulo: newNoticia, contenido: newNoticia });
            setNewNoticia('');
            cargarDatos();
        } catch (error) {
            setErrorNoticia('Error al agregar noticia');
        } finally {
            setCreandoNoticia(false);
        }
    };

    if (cargando) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header/Bienvenida */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 shadow-lg">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-4xl font-semibold mb-2 text-shadow-lg">Bienvenido, {usuario?.nombre}</h1>
                    <p className="text-blue-100 text-lg">Dashboard de gestión • {usuario?.rol.nombre}</p>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Tarjetas de Acceso Rápido */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                        { titulo: 'Proyectos', color: 'from-blue-500 to-blue-600', link: '/proyectos' },
                        { titulo: 'Personas', color: 'from-green-500 to-green-600', link: '/personas' },
                        { titulo: 'Actividades', color: 'from-purple-500 to-purple-600', link: '/actividades' },
                        { titulo: 'Error en Proyectos', color: 'from-red-500 to-red-600', link: '/erroresProyecto' },
                        { titulo: 'Interrupciones en proyectos', color: 'from-yellow-500 to-yellow-600', link: '/interrupciones' },
                        { titulo: 'Reportes', color: 'from-orange-500 to-orange-600', link: '/reportes' },
                        { titulo: 'Noticias', color: 'from-purple-500 to-purple-600', link: '/noticias' },
                        { titulo: 'Preguntas', color: 'from-purple-500 to-purple-600', link: '/preguntas' }
                    ].map((item, idx) => (
                        <Link
                            key={idx}
                            href={item.link}
                            className={`bg-gradient-to-br ${item.color} rounded-xl p-6 text-white shadow-md hover:scale-105 transition cursor-pointer`}
                        >
                            <h3 className="font-semibold text-lg">{item.titulo}</h3>
                        </Link>
                    ))}
                </div>

                {/* Noticias - Columna Izquierda/Ancha */}
                <section className="bg-white rounded-xl shadow p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Noticias</h2>
                    {usuario?.rol.nombre === 'Coordinador de Proyectos' && (
                        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            {errorNoticia && (
                                <div className="mb-3 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{errorNoticia}</div>
                            )}
                            <textarea
                                value={newNoticia}
                                onChange={(e) => setNewNoticia(e.target.value)}
                                placeholder="Escribe una noticia importante para el equipo..."
                                className="w-full p-3 border border-blue-300 rounded resize-none focus:outline-none focus:border-blue-500 text-sm"
                                rows={3}
                                disabled={creandoNoticia}
                            />
                            <button
                                onClick={agregarNoticia}
                                disabled={creandoNoticia || !newNoticia.trim()}
                                className={`mt-3 px-4 py-2 rounded-lg transition font-medium ${creandoNoticia || !newNoticia.trim()
                                    ? 'bg-gray-400 text-white cursor-not-allowed'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                            >
                                {creandoNoticia ? 'Publicando...' : 'Publicar Noticia'}
                            </button>
                        </div>
                    )}
                    {/* Listado de Noticias */}
                    <div className="space-y-4">
                        {noticias.map((noticia) => (
                            <div key={noticia.idNoticia} className="p-4 border rounded-lg hover:bg-gray-50 transition">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold text-gray-800">{noticia.titulo}</h3>
                                    <span className="text-xs text-gray-500">{new Date(noticia.fecha).toLocaleDateString('es-ES')}</span>
                                </div>
                                <p className="text-gray-600 text-sm">{noticia.contenido}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Preguntas */}
                <section className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Preguntas</h2>
                    <SeccionPreguntas preguntas={preguntas.slice(0, 5)} esAutenticado={true} usuarioId={usuario?.idPersona} onRespuestaExitosa={cargarDatos} />
                </section>
            </main>

            {/* Footer */}
            <footer className="mt-16 bg-gray-100 border-t text-center py-6 text-gray-600">
                <p>&copy; 2026 Ikernell. Sistema de Gestión Empresarial.</p>
            </footer>
        </div>
    );
}

export default HomePrivada;
