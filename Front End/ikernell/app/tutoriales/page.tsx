'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function TutorialesPage() {
    const router = useRouter();
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas');

    const tutoriales = [
        {
            id: 1,
            titulo: 'Introducción a JavaScript',
            descripcion: 'Aprende los fundamentos básicos de JavaScript desde cero',
            categoria: 'javascript',
            nivel: 'Principiante',
            duracion: '2 horas',
            color: 'from-yellow-400 to-yellow-600'
        },
        {
            id: 2,
            titulo: 'React para Principiantes',
            descripcion: 'Construye tu primera aplicación con React',
            categoria: 'react',
            nivel: 'Principiante',
            duracion: '3 horas',
            color: 'from-blue-400 to-blue-600'
        },
        {
            id: 3,
            titulo: 'TypeScript Esencial',
            descripcion: 'Domina TypeScript y mejora tu código JavaScript',
            categoria: 'typescript',
            nivel: 'Intermedio',
            duracion: '2.5 horas',
            color: 'from-blue-500 to-blue-700'
        },
        {
            id: 4,
            titulo: 'Next.js Avanzado',
            descripcion: 'Aplicaciones web modernas con Next.js',
            categoria: 'nextjs',
            nivel: 'Avanzado',
            duracion: '4 horas',
            color: 'from-gray-700 to-gray-900'
        },
        {
            id: 5,
            titulo: 'Python Básico',
            descripcion: 'Fundamentos de programación con Python',
            categoria: 'python',
            nivel: 'Principiante',
            duracion: '3 horas',
            color: 'from-green-400 to-green-600'
        },
        {
            id: 6,
            titulo: 'Base de Datos SQL',
            descripcion: 'Aprende a consultar y gestionar bases de datos',
            categoria: 'sql',
            nivel: 'Intermedio',
            duracion: '2 horas',
            color: 'from-purple-400 to-purple-600'
        }
    ];

    const categorias = [
        { id: 'todas', nombre: 'Todas', color: 'bg-gray-500' },
        { id: 'javascript', nombre: 'JavaScript', color: 'bg-yellow-500' },
        { id: 'react', nombre: 'React', color: 'bg-blue-500' },
        { id: 'typescript', nombre: 'TypeScript', color: 'bg-blue-600' },
        { id: 'nextjs', nombre: 'Next.js', color: 'bg-gray-700' },
        { id: 'python', nombre: 'Python', color: 'bg-green-500' },
        { id: 'sql', nombre: 'SQL', color: 'bg-purple-500' }
    ];

    const tutorialesFiltrados = categoriaSeleccionada === 'todas'
        ? tutoriales
        : tutoriales.filter(t => t.categoria === categoriaSeleccionada);

    const getNivelColor = (nivel: string) => {
        switch (nivel) {
            case 'Principiante': return 'bg-green-100 text-green-800';
            case 'Intermedio': return 'bg-yellow-100 text-yellow-800';
            case 'Avanzado': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="page">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Tutoriales de Programación
                    </h1>
                    <p className="text-gray-600">
                        Aprende nuevas tecnologías con nuestros tutoriales paso a paso
                    </p>
                </div>
                <button
                    onClick={() => router.push('/')}
                    className="btn-secondary"
                >
                    Volver
                </button>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
                    <h3 className="text-lg font-semibold mb-2">Total Tutoriales</h3>
                    <p className="text-3xl font-bold">{tutoriales.length}</p>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
                    <h3 className="text-lg font-semibold mb-2">Tecnologías</h3>
                    <p className="text-3xl font-bold">{categorias.length - 1}</p>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
                    <h3 className="text-lg font-semibold mb-2">Horas de Contenido</h3>
                    <p className="text-3xl font-bold">16.5h</p>
                </div>
            </div>

            {/* Filtros de Categoría */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Filtrar por Categoría:</h3>
                <div className="flex flex-wrap gap-3">
                    {categorias.map(categoria => (
                        <button
                            key={categoria.id}
                            onClick={() => setCategoriaSeleccionada(categoria.id)}
                            className={`px-4 py-2 rounded-full text-white font-medium transition ${categoriaSeleccionada === categoria.id
                                    ? categoria.color + ' opacity-100'
                                    : categoria.color + ' opacity-70 hover:opacity-90'
                                }`}
                        >
                            {categoria.nombre}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid de Tutoriales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tutorialesFiltrados.map(tutorial => (
                    <div
                        key={tutorial.id}
                        className={`bg-gradient-to-br ${tutorial.color} rounded-xl p-6 text-white shadow-lg hover:scale-105 transition-transform cursor-pointer`}
                        onClick={() => alert(`Tutorial: ${tutorial.titulo}\n\nEsta funcionalidad estará disponible próximamente.`)}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold mb-2">{tutorial.titulo}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getNivelColor(tutorial.nivel)} bg-white bg-opacity-90`}>
                                {tutorial.nivel}
                            </span>
                        </div>

                        <p className="text-white/90 mb-4 text-sm leading-relaxed">
                            {tutorial.descripcion}
                        </p>

                        <div className="flex justify-between items-center">
                            <span className="text-white/80 text-sm">
                                {tutorial.duracion}
                            </span>
                            <button className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-sm font-medium transition">
                                Iniciar →
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {tutorialesFiltrados.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg mb-4">
                        No hay tutoriales en esta categoría
                    </p>
                    <button
                        onClick={() => setCategoriaSeleccionada('todas')}
                        className="btn-primary"
                    >
                        Ver Todos los Tutoriales
                    </button>
                </div>
            )}

            {/* Footer informativo */}
            <div className="mt-12 p-6 bg-blue-50 rounded-xl">
                <h4 className="text-lg font-semibold text-blue-900 mb-2">
                    ¿Necesitas ayuda?
                </h4>
                <p className="text-blue-700 mb-4">
                    Nuestros tutoriales están diseñados para todos los niveles. Si tienes preguntas,
                    no dudes en contactar a nuestro equipo de soporte.
                </p>
                <button
                    onClick={() => router.push('/#preguntas')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                >
                    Hacer una Pregunta
                </button>
            </div>
        </div>
    );
}