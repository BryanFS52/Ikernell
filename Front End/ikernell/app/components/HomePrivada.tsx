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
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
                    <p className="text-slate-300">Cargando dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-600/20"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">Bienvenido, {usuario?.nombre}</h1>
                    <p className="text-xl text-blue-100">Panel de administración - Sistema Ikernell</p>
                </div>
            </div>
            <main className="max-w-7xl mx-auto px-6 py-12">
                <section className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-8 mb-8">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-8">Nuestros Servicios</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group shadow-lg">
                            <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 mb-3 transition-colors">Desarrollo de Software Personalizado</h3>
                            <p className="text-slate-300 mb-4 leading-relaxed">Creamos soluciones de software a medida para satisfacer las necesidades específicas de cada cliente.</p>
                            <ul className="text-sm text-slate-400 space-y-2">
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>Análisis de requerimientos detallado</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>Desarrollo ágil con entregas incrementales</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>Arquitectura escalable y mantenible</li>
                            </ul>
                        </div>
                        
                        {/* SERVICIO 2 */}
                        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group shadow-lg">
                            <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 mb-3 transition-colors">Aplicaciones Web Modernas</h3>
                            <p className="text-slate-300 mb-4 leading-relaxed">Desarrollamos aplicaciones web responsivas e intuitivas utilizando las tecnologías más actuales.</p>
                            <ul className="text-sm text-slate-400 space-y-2">
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>Diseño responsivo para todos los dispositivos</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>Interfaz de usuario moderna</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>Optimización SEO incluida</li>
                            </ul>
                        </div>
                        
                        {/* SERVICIO 3*/}
                        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group shadow-lg">
                            <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 mb-3 transition-colors">Consultoría Tecnológica</h3>
                            <p className="text-slate-300 mb-4 leading-relaxed">Asesoramos en la adopción de nuevas tecnologías y optimización de procesos existentes.</p>
                            <ul className="text-sm text-slate-400 space-y-2">
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>Auditoría de sistemas actuales</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>Planificación de arquitectura</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>Capacitación del personal técnico</li>
                            </ul>
                        </div>
                    </div>
                    <div className="text-center">
                        <Link href="/servicios" className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-blue-500/25 transform hover:scale-105">
                            Ver Todos los Servicios
                        </Link>
                    </div>
                </section>

                {/* SECCIÓN INFO EMPRESARIAL */}
                <section className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl p-8 mb-8">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-8">Información Empresarial</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Link href="/lineamientos" className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 hover:bg-white/15 hover:border-white/30 transition-all duration-300 group shadow-lg">
                            <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">Lineamientos</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">Misión, visión, valores y políticas corporativas</p>
                        </Link>
                        
                        <Link href="/servicios" className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 hover:bg-white/15 hover:border-white/30 transition-all duration-300 group shadow-lg">
                            <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">Portafolio</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">Servicios y soluciones que ofrecemos</p>
                        </Link>
                        
                        <Link href="/sitios-interes" className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 hover:bg-white/15 hover:border-white/30 transition-all duration-300 group shadow-lg">
                            <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">Sitios de Interés</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">Enlaces útiles y recursos recomendados</p>
                        </Link>
                        
                        <Link href="/contacto" className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 hover:bg-white/15 hover:border-white/30 transition-all duration-300 group shadow-lg">
                            <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">Contacto</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">Información de contacto y ubicación</p>
                        </Link>
                    </div>
                </section>

                {/* SECCIÓN NOTICIAS */}
                <section className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-8 mb-8">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-6">Noticias</h2>
                    {usuario?.rol.nombre === 'Coordinador de Proyectos' && (
                        <div className="mb-8 p-6 bg-blue-500/10 backdrop-blur rounded-xl border border-blue-400/30 shadow-lg">
                            {errorNoticia && (
                                <div className="mb-4 p-4 bg-red-500/10 backdrop-blur border border-red-400/30 text-red-300 rounded-xl text-sm shadow-lg">
                                    <div className="flex items-center gap-2">
                                        <span className="text-red-400">⚠</span>
                                        {errorNoticia}
                                    </div>
                                </div>
                            )}
                            <textarea
                                value={newNoticia}
                                onChange={(e) => setNewNoticia(e.target.value)}
                                placeholder="Escribe una noticia importante para el equipo..."
                                className="w-full p-4 bg-white/20 backdrop-blur border border-white/30 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all text-white placeholder-slate-300 shadow-lg"
                                rows={3}
                                disabled={creandoNoticia}
                            />
                            <button
                                onClick={agregarNoticia}
                                disabled={creandoNoticia || !newNoticia.trim()}
                                className={`mt-4 px-6 py-3 rounded-xl transition-all duration-200 font-semibold shadow-lg transform ${creandoNoticia || !newNoticia.trim()
                                    ? 'bg-gray-500/50 text-slate-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:scale-105 hover:shadow-blue-500/25'
                                    }`}
                            >
                                {creandoNoticia ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Publicando...
                                    </span>
                                ) : 'Publicar Noticia'}
                            </button>
                        </div>
                    )}
                    <div className="space-y-4">
                        {noticias.map((noticia) => (
                            <div key={noticia.idNoticia} className="p-6 bg-white/5 backdrop-blur border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-lg group">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors text-lg">{noticia.titulo}</h3>
                                    <span className="text-sm text-blue-300 bg-blue-500/20 px-3 py-1 rounded-full whitespace-nowrap">
                                        {new Date(noticia.fecha).toLocaleDateString('es-ES')}
                                    </span>
                                </div>
                                <p className="text-slate-300 leading-relaxed">{noticia.contenido}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SECCIÓN PREGUNTAS */}
                <section className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-8 mb-8">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-6">Preguntas</h2>
                    <SeccionPreguntas preguntas={preguntas.slice(0, 5)} esAutenticado={true} usuarioId={usuario?.idPersona} onRespuestaExitosa={cargarDatos} />
                </section>
            </main>

            <footer className="mt-12 bg-slate-800/50 backdrop-blur border-t border-white/10 text-center py-8">
                <p className="text-slate-400">&copy; 2026 Ikernell. Sistema de Gestión Empresarial.</p>
            </footer>
        </div>
    );
}
