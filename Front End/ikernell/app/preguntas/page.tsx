'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { getPreguntas } from '@/services/pregunta.service';
import { SeccionPreguntas } from '@/app/components/SeccionPreguntas';
import { FormularioPreguntaPublica } from '@/app/components/FormularioPreguntaPublica';
import { Pregunta } from '@/types/pregunta';
import Link from 'next/link';

export default function PreguntasPage() {
    const { usuario, estaAutenticado } = useAuth();
    const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
    const [preguntasFiltradas, setPreguntasFiltradas] = useState<Pregunta[]>([]);
    const [cargando, setCargando] = useState(true);
    const [filtro] = useState('todas');

    useEffect(() => {
        cargarPreguntas();
    }, []);

    useEffect(() => {
        if (filtro === 'todas') {
            setPreguntasFiltradas(preguntas);
        } else {
            setPreguntasFiltradas(preguntas.filter((p) =>  filtro));
        }
    }, [preguntas, filtro]);

    const cargarPreguntas = async () => {
        try {
            const datos = await getPreguntas();
            setPreguntas(datos);
        } catch (error) {
            console.error('Error al cargar preguntas:', error);
        } finally {
            setCargando(false);
        }
    };

    if (!estaAutenticado) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
                <div className="max-w-4xl mx-auto px-6 py-20">
                    <div className="text-center text-white mb-12">
                        <h1 className="text-4xl font-bold mb-4">Preguntas Frecuentes</h1>
                        <p className="text-blue-100 mb-8">
                            Explora las preguntas de nuestra comunidad
                        </p>
                    </div>

                    {/* Formulario para nuevas preguntas */}
                    <div className="mb-12">
                        <FormularioPreguntaPublica onSuccess={cargarPreguntas} />
                    </div>

                    {/* Listado */}
                    {cargando ? (
                        <div className="text-center text-blue-200">Cargando preguntas...</div>
                    ) : (
                        <SeccionPreguntas preguntas={preguntasFiltradas} />
                    )}

                    <div className="mt-12 text-center">
                        <Link
                            href="/"
                            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Volver al Inicio
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Centro de Preguntas
                    </h1>
                    <p className="text-gray-600">
                        Gestiona preguntas de clientes y personal interesado
                    </p>
                </div>
                {/* Contenido */}
                {cargando ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Cargando preguntas...</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow">
                        <div className="p-8">
                            <SeccionPreguntas
                                preguntas={preguntasFiltradas}
                                esAutenticado={true}
                                usuarioId={usuario?.idPersona}
                                onRespuestaExitosa={cargarPreguntas}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
