'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getNoticia } from '@/services/noticia.service';
import { getPreguntas } from '@/services/pregunta.service';
import { FormularioPreguntaPublica } from '@/app/components/FormularioPreguntaPublica';
import { SeccionPreguntas } from '@/app/components/SeccionPreguntas';
import { Noticia } from '@/types/noticia';
import { Pregunta } from '@/types/pregunta';

export function HomePublica() {
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
            {/* Hero Section */}
            <section className="relative px-6 py-20 text-white overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="absolute inset-0 opacity-30 bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}></div>
                <div className="relative z-10 max-w-6xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">Bienvenido a Ikernell</h1>
                    <div className="flex gap-4 justify-center">
                        <Link href="/login" className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-lg">
                            Iniciar Sesión
                        </Link>
                        <button onClick={() => document.getElementById('preguntas')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3 border-2 border-blue-300 text-blue-100 rounded-lg hover:bg-blue-900/50 transition font-medium">
                            Ver Preguntas
                        </button>
                    </div>
                </div>
            </section>

            {/* Noticias Section */}
            <section className="px-6 py-16 bg-white/10 backdrop-blur">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-12">Últimas Noticias</h2>
                    {cargandoNoticias ? (
                        <div className="text-center text-blue-200">Cargando noticias...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {noticias.map((noticia) => (
                                <div key={noticia.idNoticia} className="bg-white/20 backdrop-blur border border-white/20 rounded-xl p-6 hover:bg-white/10 transition group">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition">{noticia.titulo}</h3>
                                        <span className="text-sm text-blue-300">{new Date(noticia.fecha).toLocaleDateString('es-ES')}</span>
                                    </div>
                                    <p className="text-blue-100">{noticia.contenido?.substring(0, 150)}{noticia.contenido && noticia.contenido.length > 150 ? '...' : ''}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Preguntas y Respuestas Section */}
            <section id="preguntas" className="px-6 py-16 bg-gradient-to-r from-purple-600 to-indigo-700">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-4">Preguntas Frecuentes</h2>
                    <p className="text-blue-200 mb-12">Comunícate con nosotros dejando tu pregunta. Nuestro equipo te responderá pronto.</p>
                    <div className="space-y-8">
                        <h3 className="text-2xl font-bold text-white mb-6">Preguntas de la Comunidad</h3>
                        {cargandoPreguntas ? (
                            <div className="text-center text-blue-200">Cargando preguntas...</div>
                        ) : (
                            <SeccionPreguntas preguntas={preguntas} esAutenticado={false} />
                        )}
                    </div>
                    <div className="mb-12">
                        <FormularioPreguntaPublica onSuccess={cargarPreguntas} />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-16 bg-gray-100 border-t text-center py-6 text-gray-600">
                <p>&copy; 2026 Ikernell. Sistema de Gestión Empresarial.</p>
            </footer>
        </div>
    );
}
