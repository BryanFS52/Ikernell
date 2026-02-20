'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getNoticia } from '@/services/noticia.service';
import { getPreguntas } from '@/services/pregunta.service';
import { FormularioPreguntaPublica } from '@/app/components/FormularioPreguntaPublica';
import { SeccionPreguntas } from '@/app/components/SeccionPreguntas';
import { Noticia } from '@/types/noticia';
import { Pregunta } from '@/types/pregunta';

export default function HomePublica() {
    const [noticias, setNoticias] = useState<Noticia[]>([]);
    const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
    const [cargandoNoticias, setCargandoNoticias] = useState(true);
    const [cargandoPreguntas, setCargandoPreguntas] = useState(true);

    useEffect(() => {
        cargarNoticias();
        cargarPreguntas();
    }, []);

    const cargarNoticias = async () => {
        try {
            const datos = await getNoticia();
            setNoticias(datos.slice(0, 5));
        } catch (error) {
            console.error('Error al cargar noticias:', error);
        } finally {
            setCargandoNoticias(false);
        }
    };

    const cargarPreguntas = async () => {
        try {
            const datos = await getPreguntas();
            setPreguntas(datos.slice(0, 5));
        } catch (error) {
            console.error('Error al cargar preguntas:', error);
        } finally {
            setCargandoPreguntas(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            <section className="relative px-6 py-20 text-white overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-600/20"></div>
                <div className="relative z-10 max-w-6xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">Bienvenido a Ikernell</h1>
                    <p className="text-xl md:text-2xl mb-8 text-blue-100">Transformamos ideas en soluciones digitales</p>
                    <div className="flex gap-4 justify-center">
                        <Link href="/login" className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-blue-500/25 transform hover:scale-105">
                            Iniciar Sesión
                        </Link>
                        <button onClick={() => document.getElementById('preguntas')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3 border-2 border-white/30 text-blue-100 rounded-xl hover:bg-white/10 backdrop-blur transition-all duration-200 font-semibold">
                            Ver Preguntas
                        </button>
                    </div>
                </div>
            </section>

            {/* Servicios Section */}
            <section className="px-6 py-16">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-4">Nuestros Servicios</h2>
                            <p className="text-xl text-slate-300">Soluciones tecnológicas integrales para hacer crecer su negocio</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="text-center p-6 bg-white/5 backdrop-blur border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 group shadow-lg">
                                <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 mb-4 transition-colors">Desarrollo de Software</h3>
                                <p className="text-slate-300 mb-4 leading-relaxed">Creamos soluciones de software personalizadas que se adaptan perfectamente a las necesidades de su empresa.</p>
                                <ul className="text-sm text-slate-400 space-y-2">
                                    <li className="flex items-center justify-center gap-2"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>Aplicaciones web modernas</li>
                                    <li className="flex items-center justify-center gap-2"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>Sistemas de gestión empresarial</li>
                                    <li className="flex items-center justify-center gap-2"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>APIs y microservicios</li>
                                </ul>
                            </div>
                            
                            {/* SERVICIO 2 */}
                            <div className="text-center p-6 bg-white/5 backdrop-blur border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 group shadow-lg">
                                <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 mb-4 transition-colors">Aplicaciones Móviles</h3>
                                <p className="text-slate-300 mb-4 leading-relaxed">Desarrollamos aplicaciones nativas y multiplataforma para iOS y Android que conectan su negocio con sus clientes.</p>
                                <ul className="text-sm text-slate-400 space-y-2">
                                    <li className="flex items-center justify-center gap-2"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>Apps nativas para iOS y Android</li>
                                    <li className="flex items-center justify-center gap-2"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>Aplicaciones híbridas</li>
                                    <li className="flex items-center justify-center gap-2"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>Sincronización con backend</li>
                                </ul>
                            </div>
                            
                            {/* SERVICIO 3 */}
                            <div className="text-center p-6 bg-white/5 backdrop-blur border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 group shadow-lg">
                                <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 mb-4 transition-colors">Consultoría Tecnológica</h3>
                                <p className="text-slate-300 mb-4 leading-relaxed">Asesoramos en la adopción de nuevas tecnologías y optimización de procesos tecnológicos existentes.</p>
                                <ul className="text-sm text-slate-400 space-y-2">
                                    <li className="flex items-center justify-center gap-2"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>Auditoría de sistemas</li>
                                    <li className="flex items-center justify-center gap-2"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>Planificación tecnológica</li>
                                    <li className="flex items-center justify-center gap-2"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>Migración de sistemas</li>
                                </ul>
                            </div>
                        </div>
                        <div className="text-center mt-10">
                            <Link href="/servicios" className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-blue-500/25 transform hover:scale-105">
                                Ver Todos los Servicios
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Información Empresarial */}
            <section className="px-6 py-16">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl p-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-4">Información Empresarial</h2>
                            <p className="text-xl text-slate-300">Conozca más sobre Ikernell y nuestro compromiso con la excelencia</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Link href="/lineamientos" className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 hover:bg-white/15 hover:border-white/30 transition-all duration-300 group text-center shadow-lg">
                                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">Lineamientos</h3>
                                <p className="text-slate-300 text-sm leading-relaxed">Misión, visión y valores corporativos</p>
                            </Link>
                            
                            <Link href="/servicios" className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 hover:bg-white/15 hover:border-white/30 transition-all duration-300 group text-center shadow-lg">
                                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">Portafolio</h3>
                                <p className="text-slate-300 text-sm leading-relaxed">Servicios y soluciones completas</p>
                            </Link>
                            
                            <Link href="/sitios-interes" className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 hover:bg-white/15 hover:border-white/30 transition-all duration-300 group text-center shadow-lg">
                                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">Sitios de Interés</h3>
                                <p className="text-slate-300 text-sm leading-relaxed">Enlaces útiles y recursos</p>
                            </Link>
                            
                            <Link href="/contacto" className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 hover:bg-white/15 hover:border-white/30 transition-all duration-300 group text-center shadow-lg">
                                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">Contacto</h3>
                                <p className="text-slate-300 text-sm leading-relaxed">Información y ubicación</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Noticias Section */}
            <section className="px-6 py-16 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-4">Últimas Noticias</h2>
                        <p className="text-slate-300">Mantente al día con nuestras últimas actualizaciones</p>
                    </div>
                    {cargandoNoticias ? (
                        <div className="text-center">
                            <div className="inline-flex items-center gap-2 text-slate-300">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Cargando noticias...
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {noticias.map((noticia) => (
                                <div key={noticia.idNoticia} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group shadow-lg">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors line-clamp-2">{noticia.titulo}</h3>
                                        <span className="text-sm text-blue-300 bg-blue-500/20 px-2 py-1 rounded-full whitespace-nowrap ml-3">
                                            {new Date(noticia.fecha).toLocaleDateString('es-ES')}
                                        </span>
                                    </div>
                                    <p className="text-slate-300 leading-relaxed">{noticia.contenido?.substring(0, 150)}{noticia.contenido && noticia.contenido.length > 150 ? '...' : ''}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Preguntas y Respuestas Section */}
            <section id="preguntas" className="px-6 py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-600/10"></div>
                <div className="max-w-4xl mx-auto relative">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent mb-4">Preguntas Frecuentes</h2>
                        <p className="text-slate-300 text-lg">Comunícate con nosotros dejando tu pregunta. Nuestro equipo te responderá pronto.</p>
                    </div>
                    
                    <div className="space-y-12">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-8 text-center">Preguntas de la Comunidad</h3>
                            {cargandoPreguntas ? (
                                <div className="text-center">
                                    <div className="inline-flex items-center gap-2 text-slate-300">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Cargando preguntas...
                                    </div>
                                </div>
                            ) : (
                                <SeccionPreguntas preguntas={preguntas} esAutenticado={false} />
                            )}
                        </div>
                        
                        <div>
                            <FormularioPreguntaPublica onSuccess={cargarPreguntas} />
                        </div>
                    </div>
                </div>

                <footer className="mt-20 text-center py-8 border-t border-white/10 relative">
                    <p className="text-slate-400">&copy; 2026 Ikernell. Sistema de Gestión Empresarial.</p>
                </footer>
            </section>
        </div>
    );
}
