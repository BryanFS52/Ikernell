'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SitiosInteresPage() {
    const router = useRouter();
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todos');

    const sitios = [
        {
            id: 1,
            titulo: 'Stack Overflow',
            descripcion: 'La mayor comunidad de desarrolladores del mundo para encontrar respuestas y resolver problemas de programación',
            url: 'https://stackoverflow.com',
            categoria: 'desarrollo',
            tipo: 'Comunidad',
            relevancia: 'alta'
        },
        {
            id: 2,
            titulo: 'GitHub',
            descripcion: 'Plataforma de desarrollo colaborativo para alojar proyectos utilizando el sistema de control de versiones Git',
            url: 'https://github.com',
            categoria: 'desarrollo',
            tipo: 'Herramienta',
            relevancia: 'alta'
        },
        {
            id: 3,
            titulo: 'MDN Web Docs',
            descripcion: 'Documentación completa y recursos de aprendizaje para tecnologías web como HTML, CSS y JavaScript',
            url: 'https://developer.mozilla.org',
            categoria: 'documentacion',
            tipo: 'Documentación',
            relevancia: 'alta'
        },
        {
            id: 4,
            titulo: 'React Developer Tools',
            descripcion: 'Herramientas oficiales de desarrollo para React que facilitan el debugging y desarrollo de aplicaciones',
            url: 'https://react.dev/learn/react-developer-tools',
            categoria: 'herramientas',
            tipo: 'Extensión',
            relevancia: 'alta'
        },
        {
            id: 5,
            titulo: 'Visual Studio Code',
            descripcion: 'Editor de código gratuito y de código abierto desarrollado por Microsoft',
            url: 'https://code.visualstudio.com',
            categoria: 'herramientas',
            tipo: 'Editor',
            relevancia: 'alta'
        },
        {
            id: 6,
            titulo: 'Figma',
            descripcion: 'Herramienta de diseño colaborativo basada en web para crear interfaces de usuario y prototipos',
            url: 'https://www.figma.com',
            categoria: 'diseno',
            tipo: 'Diseño',
            relevancia: 'alta'
        },
        {
            id: 7,
            titulo: 'Can I Use',
            descripcion: 'Base de datos de compatibilidad de navegadores para características de HTML5, CSS3 y JavaScript',
            url: 'https://caniuse.com',
            categoria: 'desarrollo',
            tipo: 'Referencia',
            relevancia: 'media'
        },
        {
            id: 8,
            titulo: 'Postman',
            descripcion: 'Plataforma colaborativa para el desarrollo de APIs que simplifica cada paso del ciclo de vida de la API',
            url: 'https://www.postman.com',
            categoria: 'herramientas',
            tipo: 'API Testing',
            relevancia: 'alta'
        },
        {
            id: 9,
            titulo: 'Dev.to',
            descripcion: 'Comunidad de desarrolladores donde puedes compartir ideas, hacer preguntas y conectar con otros programadores',
            url: 'https://dev.to',
            categoria: 'comunidad',
            tipo: 'Comunidad',
            relevancia: 'media'
        },
        {
            id: 10,
            titulo: 'Codecademy',
            descripcion: 'Plataforma interactiva de aprendizaje que ofrece cursos gratuitos de programación',
            url: 'https://www.codecademy.com',
            categoria: 'aprendizaje',
            tipo: 'Educación',
            relevancia: 'media'
        },
        {
            id: 11,
            titulo: 'FreeCodeCamp',
            descripcion: 'Organización sin fines de lucro que consiste en una plataforma web de aprendizaje interactivo',
            url: 'https://www.freecodecamp.org',
            categoria: 'aprendizaje',
            tipo: 'Educación',
            relevancia: 'alta'
        },
        {
            id: 12,
            titulo: 'Docker Hub',
            descripcion: 'Servicio de registro en la nube para compartir aplicaciones en contenedores',
            url: 'https://hub.docker.com',
            categoria: 'herramientas',
            tipo: 'Contenedores',
            relevancia: 'media'
        },
        {
            id: 13,
            titulo: 'AWS Documentation',
            descripcion: 'Documentación oficial de Amazon Web Services para servicios de computación en la nube',
            url: 'https://docs.aws.amazon.com',
            categoria: 'documentacion',
            tipo: 'Cloud',
            relevancia: 'alta'
        },
        {
            id: 14,
            titulo: 'Google Fonts',
            descripcion: 'Biblioteca de fuentes web gratuitas y APIs para usar en proyectos web',
            url: 'https://fonts.google.com',
            categoria: 'diseno',
            tipo: 'Recursos',
            relevancia: 'media'
        },
        {
            id: 15,
            titulo: 'Unsplash',
            descripcion: 'Biblioteca de fotografías de alta calidad disponibles de forma gratuita',
            url: 'https://unsplash.com',
            categoria: 'diseno',
            tipo: 'Recursos',
            relevancia: 'media'
        }
    ];

    const categorias = [
        { id: 'todos', nombre: 'Todos', color: 'bg-gray-500' },
        { id: 'desarrollo', nombre: 'Desarrollo', color: 'bg-blue-500' },
        { id: 'herramientas', nombre: 'Herramientas', color: 'bg-green-500' },
        { id: 'documentacion', nombre: 'Documentación', color: 'bg-purple-500' },
        { id: 'diseno', nombre: 'Diseño', color: 'bg-pink-500' },
        { id: 'comunidad', nombre: 'Comunidades', color: 'bg-orange-500' },
        { id: 'aprendizaje', nombre: 'Aprendizaje', color: 'bg-yellow-500' }
    ];

    const sitiosFiltrados = categoriaSeleccionada === 'todos'
        ? sitios
        : sitios.filter(s => s.categoria === categoriaSeleccionada);

    const getRelevanciaColor = (relevancia: string) => {
        switch (relevancia) {
            case 'alta': return 'bg-red-100 text-red-800';
            case 'media': return 'bg-yellow-100 text-yellow-800';
            case 'baja': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const abrirSitio = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="page">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Sitios de Interés
                    </h1>
                    <p className="text-gray-600">
                        Enlaces útiles y recursos recomendados para el desarrollo de software
                    </p>
                </div>
                <button
                    onClick={() => router.push('/')}
                    className="btn-secondary"
                >
                    Volver
                </button>
            </div>

            {/* Introducción */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
                <h2 className="text-xl font-semibold text-blue-900 mb-3">
                    Recursos Curados para Desarrolladores
                </h2>
                <p className="text-blue-800 leading-relaxed">
                    Esta colección incluye sitios web, herramientas y plataformas que consideramos
                    esenciales para el desarrollo de software moderno. Cada recurso ha sido
                    seleccionado por su utilidad, confiabilidad y relevancia en la industria.
                </p>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white text-center">
                    <h3 className="text-2xl font-bold mb-2">{sitios.length}</h3>
                    <p className="text-blue-100">Sitios Totales</p>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white text-center">
                    <h3 className="text-2xl font-bold mb-2">{sitios.filter(s => s.relevancia === 'alta').length}</h3>
                    <p className="text-green-100">Alta Prioridad</p>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white text-center">
                    <h3 className="text-2xl font-bold mb-2">{categorias.length - 1}</h3>
                    <p className="text-purple-100">Categorías</p>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-white text-center">
                    <h3 className="text-2xl font-bold mb-2">100%</h3>
                    <p className="text-orange-100">Gratuitos</p>
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

            {/* Grid de Sitios */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sitiosFiltrados.map(sitio => (
                    <div
                        key={sitio.id}
                        onClick={() => abrirSitio(sitio.url)}
                        className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer hover:scale-[1.02]"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-gray-900">{sitio.titulo}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRelevanciaColor(sitio.relevancia)}`}>
                                {sitio.relevancia === 'alta' ? 'Esencial' :
                                    sitio.relevancia === 'media' ? 'Útil' : 'Opcional'}
                            </span>
                        </div>

                        <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                            {sitio.descripcion}
                        </p>

                        <div className="flex justify-between items-center">
                            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                {sitio.tipo}
                            </span>
                            <span className="text-blue-600 text-sm font-medium hover:text-blue-800 transition">
                                Visitar Sitio
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {sitiosFiltrados.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg mb-4">
                        No hay sitios en esta categoría
                    </p>
                    <button
                        onClick={() => setCategoriaSeleccionada('todos')}
                        className="btn-primary"
                    >
                        Ver Todos los Sitios
                    </button>
                </div>
            )}

            {/* Sugerencias */}
            <div className="mt-12 bg-green-50 border border-green-200 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-green-900 mb-4">
                    Sugerencias de Uso
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-lg font-semibold text-green-800 mb-2">Para Principiantes</h3>
                        <ul className="text-green-700 space-y-1 text-sm">
                            <li>• Comienza con FreeCodeCamp y Codecademy</li>
                            <li>• Utiliza MDN Web Docs como referencia</li>
                            <li>• Únete a la comunidad de Dev.to</li>
                            <li>• Practica con Visual Studio Code</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-green-800 mb-2">Para Desarrolladores</h3>
                        <ul className="text-green-700 space-y-1 text-sm">
                            <li>• Stack Overflow para resolver problemas</li>
                            <li>• GitHub para proyectos y colaboración</li>
                            <li>• Postman para testing de APIs</li>
                            <li>• Can I Use para compatibilidad</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}