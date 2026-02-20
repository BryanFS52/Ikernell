'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { getNoticia, crearNoticia } from '@/services/noticia.service';
import { getPreguntas } from '@/services/pregunta.service';
import { SeccionPreguntas } from '@/app/components/SeccionPreguntas';
import { Noticia } from '@/types/noticia';
import { Pregunta } from '@/types/pregunta';

export default function HomePrivada() {
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
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Servicios de la Empresa */}
                <section className="bg-white rounded-xl shadow p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Nuestros Servicios</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Desarrollo de Software Personalizado</h3>
                            <p className="text-gray-600 mb-4">Creamos soluciones de software a medida para satisfacer las necesidades específicas de cada cliente.</p>
                            <ul className="text-sm text-gray-500 space-y-1">
                                <li>• Análisis de requerimientos detallado</li>
                                <li>• Desarrollo ágil con entregas incrementales</li>
                                <li>• Arquitectura escalable y mantenible</li>
                            </ul>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Aplicaciones Web Modernas</h3>
                            <p className="text-gray-600 mb-4">Desarrollamos aplicaciones web responsivas e intuitivas utilizando las tecnologías más actuales.</p>
                            <ul className="text-sm text-gray-500 space-y-1">
                                <li>• Diseño responsivo para todos los dispositivos</li>
                                <li>• Interfaz de usuario moderna</li>
                                <li>• Optimización SEO incluida</li>
                            </ul>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Consultoría Tecnológica</h3>
                            <p className="text-gray-600 mb-4">Asesoramos en la adopción de nuevas tecnologías y optimización de procesos existentes.</p>
                            <ul className="text-sm text-gray-500 space-y-1">
                                <li>• Auditoría de sistemas actuales</li>
                                <li>• Planificación de arquitectura</li>
                                <li>• Capacitación del personal técnico</li>
                            </ul>
                        </div>
                    </div>
                    <div className="text-center">
                        <Link href="/servicios" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition font-medium">
                            Ver Todos los Servicios
                        </Link>
                    </div>
                </section>

                {/* Información Empresarial */}
                <section className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Información Empresarial</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Link href="/lineamientos" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition group">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">Lineamientos</h3>
                            <p className="text-gray-600 text-sm">Misión, visión, valores y políticas corporativas</p>
                        </Link>
                        
                        <Link href="/servicios" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition group">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">Portafolio</h3>
                            <p className="text-gray-600 text-sm">Servicios y soluciones que ofrecemos</p>
                        </Link>
                        
                        <Link href="/sitios-interes" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition group">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">Sitios de Interés</h3>
                            <p className="text-gray-600 text-sm">Enlaces útiles y recursos recomendados</p>
                        </Link>
                        
                        <Link href="/contacto" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition group">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">Contacto</h3>
                            <p className="text-gray-600 text-sm">Información de contacto y ubicación</p>
                        </Link>
                    </div>
                </section>

                {/* Noticias */}
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
