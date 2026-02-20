'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function BibliotecaPage() {
    const router = useRouter();
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todos');
    const [busqueda, setBusqueda] = useState('');

    const recursos = [
        {
            id: 1,
            titulo: 'Documentación React',
            descripcion: 'Guía oficial completa de React con ejemplos prácticos',
            categoria: 'documentacion',
            tipo: 'Documentación',
            url: 'https://react.dev/',
            tags: ['react', 'javascript', 'frontend'],
            popular: true
        },
        {
            id: 2,
            titulo: 'MDN Web Docs',
            descripcion: 'Referencias completas de HTML, CSS y JavaScript',
            categoria: 'documentacion',
            tipo: 'Referencia',
            url: 'https://developer.mozilla.org/',
            tags: ['html', 'css', 'javascript', 'web'],
            popular: true
        },
        {
            id: 3,
            titulo: 'Clean Code (Libro)',
            descripcion: 'Principios y prácticas para escribir código limpio y mantenible',
            categoria: 'libro',
            tipo: 'Libro',
            autor: 'Robert C. Martin',
            tags: ['principios', 'buenas-practicas', 'arquitectura'],
            popular: true
        },
        {
            id: 4,
            titulo: 'TypeScript Deep Dive',
            descripcion: 'Guía completa gratuita sobre TypeScript',
            categoria: 'guia',
            tipo: 'Guía',
            url: 'https://basarat.gitbook.io/typescript/',
            tags: ['typescript', 'javascript', 'tipos'],
            popular: false
        },
        {
            id: 5,
            titulo: 'Next.js Documentation',
            descripcion: 'Documentación oficial de Next.js con ejemplos y tutoriales',
            categoria: 'documentacion',
            tipo: 'Documentación',
            url: 'https://nextjs.org/docs',
            tags: ['nextjs', 'react', 'fullstack'],
            popular: true
        },
        {
            id: 6,
            titulo: 'CSS-Tricks',
            descripcion: 'Artículos, ejemplos y trucos de CSS y desarrollo frontend',
            categoria: 'articulo',
            tipo: 'Blog',
            url: 'https://css-tricks.com/',
            tags: ['css', 'frontend', 'diseño'],
            popular: false
        },
        {
            id: 7,
            titulo: 'Python Official Tutorial',
            descripcion: 'Tutorial oficial de Python para principiantes',
            categoria: 'tutorial',
            tipo: 'Tutorial',
            url: 'https://docs.python.org/3/tutorial/',
            tags: ['python', 'principiante', 'backend'],
            popular: true
        },
        {
            id: 8,
            titulo: 'JavaScript: The Good Parts',
            descripcion: 'Libro esencial sobre las mejores características de JavaScript',
            categoria: 'libro',
            tipo: 'Libro',
            autor: 'Douglas Crockford',
            tags: ['javascript', 'fundamentos', 'buenas-practicas'],
            popular: false
        }
    ];

    const categorias = [
        { id: 'todos', nombre: 'Todos', color: 'bg-gray-500' },
        { id: 'documentacion', nombre: 'Documentación', color: 'bg-blue-500' },
        { id: 'libro', nombre: 'Libros', color: 'bg-red-500' },
        { id: 'tutorial', nombre: 'Tutoriales', color: 'bg-green-500' },
        { id: 'guia', nombre: 'Guías', color: 'bg-purple-500' },
        { id: 'articulo', nombre: 'Artículos', color: 'bg-orange-500' }
    ];

    const recursosFiltrados = recursos.filter(recurso => {
        const coincideCategoria = categoriaSeleccionada === 'todos' || recurso.categoria === categoriaSeleccionada;
        const coincideBusqueda = busqueda === '' ||
            recurso.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
            recurso.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
            recurso.tags.some(tag => tag.toLowerCase().includes(busqueda.toLowerCase()));

        return coincideCategoria && coincideBusqueda;
    });

    const getTipoColor = (tipo: string) => {
        switch (tipo) {
            case 'Documentación': return 'bg-blue-100 text-blue-800';
            case 'Libro': return 'bg-red-100 text-red-800';
            case 'Tutorial': return 'bg-green-100 text-green-800';
            case 'Guía': return 'bg-purple-100 text-purple-800';
            case 'Blog': return 'bg-orange-100 text-orange-800';
            case 'Referencia': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const handleRecursoClick = (recurso: any) => {
        if (recurso.url) {
            window.open(recurso.url, '_blank');
        } else {
            alert(`${recurso.titulo}\n\n${recurso.descripcion}\n\nEste recurso estará disponible próximamente.`);
        }
    };

    return (
        <div className="page">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Biblioteca de Recursos
                    </h1>
                    <p className="text-gray-600">
                        Consulta nuestra colección curada de recursos de programación y desarrollo
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
                    <h3 className="text-lg font-semibold mb-2">Total Recursos</h3>
                    <p className="text-3xl font-bold">{recursos.length}</p>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
                    <h3 className="text-lg font-semibold mb-2">Populares</h3>
                    <p className="text-3xl font-bold">{recursos.filter(r => r.popular).length}</p>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
                    <h3 className="text-lg font-semibold mb-2">Categorías</h3>
                    <p className="text-3xl font-bold">{categorias.length - 1}</p>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-white">
                    <h3 className="text-lg font-semibold mb-2">Gratuitos</h3>
                    <p className="text-3xl font-bold">{recursos.filter(r => r.url).length}</p>
                </div>
            </div>

            {/* Barra de Búsqueda */}
            <div className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar recursos por título, descripción o tags..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
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
                            className={`px-4 py-2 rounded-full text-white font-medium transition flex items-center gap-2 ${categoriaSeleccionada === categoria.id
                                    ? categoria.color + ' opacity-100'
                                    : categoria.color + ' opacity-70 hover:opacity-90'
                                }`}
                        >
                            {categoria.nombre}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid de Recursos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recursosFiltrados.map(recurso => (
                    <div
                        key={recurso.id}
                        onClick={() => handleRecursoClick(recurso)}
                        className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer hover:scale-[1.02]"
                    >
                        {/* Título */}
                        <div className="mb-3">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{recurso.titulo}</h3>
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className={`px-2 py-1 rounded-md text-xs font-medium ${getTipoColor(recurso.tipo)}`}>
                                    {recurso.tipo}
                                </span>
                                {recurso.popular && (
                                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-md font-medium">
                                        Popular
                                    </span>
                                )}
                            </div>
                        </div>

                        <p className="text-gray-600 mb-4 leading-relaxed">
                            {recurso.descripcion}
                        </p>

                        {recurso.autor && (
                            <p className="text-sm text-gray-500 mb-3">
                                <span className="font-medium">Autor:</span> {recurso.autor}
                            </p>
                        )}

                        <div className="flex flex-wrap gap-2 mb-4">
                            {recurso.tags.map(tag => (
                                <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md">
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex justify-between items-center">
                            {recurso.url ? (
                                <span className="text-blue-600 text-sm font-medium">
                                    Acceder al recurso
                                </span>
                            ) : (
                                <span className="text-gray-500 text-sm">
                                    Ver detalles
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {recursosFiltrados.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg mb-4">
                        No se encontraron recursos con estos criterios
                    </p>
                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={() => setCategoriaSeleccionada('todos')}
                            className="btn-secondary"
                        >
                            Ver Todos
                        </button>
                        <button
                            onClick={() => setBusqueda('')}
                            className="btn-primary"
                        >
                            Limpiar Búsqueda
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}