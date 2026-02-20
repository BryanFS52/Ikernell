'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ServiciosPage() {
    const router = useRouter();
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todos');

    const servicios = [
        {
            id: 1,
            titulo: 'Desarrollo de Software Personalizado',
            descripcion: 'Creamos soluciones de software a medida para satisfacer las necesidades específicas de su empresa, desde aplicaciones web hasta sistemas empresariales complejos.',
            categoria: 'desarrollo',
            caracteristicas: [
                'Análisis de requerimientos detallado',
                'Desarrollo ágil con entregas incrementales',
                'Arquitectura escalable y mantenible',
                'Documentación técnica completa',
                'Soporte post-implementación'
            ]
        },
        {
            id: 2,
            titulo: 'Aplicaciones Web Modernas',
            descripcion: 'Desarrollamos aplicaciones web responsivas, intuitivas y de alto rendimiento utilizando las tecnologías más actuales del mercado.',
            categoria: 'web',
            caracteristicas: [
                'Diseño responsivo para todos los dispositivos',
                'Interfaz de usuario moderna y intuitiva',
                'Optimización para motores de búsqueda (SEO)',
                'Integración con APIs y servicios externos',
                'Panel de administración personalizado'
            ]
        },
        {
            id: 3,
            titulo: 'Sistemas de Gestión Empresarial',
            descripcion: 'Implementamos sistemas ERP, CRM y de gestión de recursos que optimizan los procesos internos de su organización.',
            categoria: 'gestion',
            caracteristicas: [
                'Automatización de procesos empresariales',
                'Reportes y análisis en tiempo real',
                'Control de inventarios y facturación',
                'Gestión de recursos humanos',
                'Integración con sistemas existentes'
            ]
        },
        {
            id: 4,
            titulo: 'Aplicaciones Móviles',
            descripcion: 'Desarrollamos aplicaciones nativas y multiplataforma para iOS y Android que conectan su negocio con sus clientes.',
            categoria: 'movil',
            caracteristicas: [
                'Desarrollo nativo para iOS y Android',
                'Aplicaciones híbridas multiplataforma',
                'Sincronización con sistemas backend',
                'Notificaciones push personalizadas',
                'Interfaces optimizadas para móviles'
            ]
        },
        {
            id: 5,
            titulo: 'Consultoría Tecnológica',
            descripcion: 'Asesoramos en la adopción de nuevas tecnologías y en la optimización de procesos tecnológicos existentes.',
            categoria: 'consultoria',
            caracteristicas: [
                'Auditoría de sistemas actuales',
                'Planificación de arquitectura tecnológica',
                'Migración a nuevas tecnologías',
                'Capacitación del personal técnico',
                'Implementación de mejores prácticas'
            ]
        },
        {
            id: 6,
            titulo: 'Mantenimiento y Soporte',
            descripcion: 'Ofrecemos servicios continuos de mantenimiento, actualizaciones y soporte técnico para asegurar el funcionamiento óptimo.',
            categoria: 'soporte',
            caracteristicas: [
                'Soporte técnico 24/7',
                'Monitoreo proactivo de sistemas',
                'Actualizaciones y parches de seguridad',
                'Backup y recuperación de datos',
                'Optimización de rendimiento'
            ]
        }
    ];

    const categorias = [
        { id: 'todos', nombre: 'Todos los Servicios' },
        { id: 'desarrollo', nombre: 'Desarrollo' },
        { id: 'web', nombre: 'Aplicaciones Web' },
        { id: 'gestion', nombre: 'Gestión Empresarial' },
        { id: 'movil', nombre: 'Aplicaciones Móviles' },
        { id: 'consultoria', nombre: 'Consultoría' },
        { id: 'soporte', nombre: 'Soporte y Mantenimiento' }
    ];

    const serviciosFiltrados = categoriaSeleccionada === 'todos'
        ? servicios
        : servicios.filter(s => s.categoria === categoriaSeleccionada);

    return (
        <div className="page">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Nuestros Servicios
                    </h1>
                    <p className="text-gray-600">
                        Soluciones tecnológicas integrales para hacer crecer su negocio
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
                    Transformamos Ideas en Soluciones Digitales
                </h2>
                <p className="text-blue-800 leading-relaxed">
                    En Ikernell, nos especializamos en el desarrollo de software de alta calidad que impulsa
                    la innovación y eficiencia en las empresas. Nuestro equipo de expertos combina experiencia
                    técnica con un profundo entendimiento del negocio para crear soluciones que realmente agreguen valor.
                </p>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white text-center">
                    <h3 className="text-2xl font-bold mb-2">50+</h3>
                    <p className="text-blue-100">Proyectos Completados</p>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white text-center">
                    <h3 className="text-2xl font-bold mb-2">98%</h3>
                    <p className="text-green-100">Satisfacción del Cliente</p>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white text-center">
                    <h3 className="text-2xl font-bold mb-2">5+</h3>
                    <p className="text-purple-100">Años de Experiencia</p>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-white text-center">
                    <h3 className="text-2xl font-bold mb-2">24/7</h3>
                    <p className="text-orange-100">Soporte Disponible</p>
                </div>
            </div>

            {/* Filtros de Categoría */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Explorar por Categoría:</h3>
                <div className="flex flex-wrap gap-3">
                    {categorias.map(categoria => (
                        <button
                            key={categoria.id}
                            onClick={() => setCategoriaSeleccionada(categoria.id)}
                            className={`px-4 py-2 rounded-full font-medium transition ${categoriaSeleccionada === categoria.id
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            {categoria.nombre}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid de Servicios */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {serviciosFiltrados.map(servicio => (
                    <div
                        key={servicio.id}
                        className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
                    >
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{servicio.titulo}</h3>

                        <p className="text-gray-600 mb-4 leading-relaxed">
                            {servicio.descripcion}
                        </p>

                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Características principales:</h4>
                        <ul className="space-y-2 mb-6">
                            {servicio.caracteristicas.map((caracteristica, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    <span className="text-gray-700">{caracteristica}</span>
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => router.push('/contacto')}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition font-medium"
                        >
                            Solicitar Información
                        </button>
                    </div>
                ))}
            </div>

            {/* Proceso de Trabajo */}
            <div className="mt-16 bg-gray-50 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                    Nuestro Proceso de Trabajo
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        {
                            paso: '1',
                            titulo: 'Análisis',
                            descripcion: 'Entendemos sus necesidades y objetivos empresariales'
                        },
                        {
                            paso: '2',
                            titulo: 'Diseño',
                            descripcion: 'Creamos la arquitectura y diseño de la solución'
                        },
                        {
                            paso: '3',
                            titulo: 'Desarrollo',
                            descripcion: 'Implementamos la solución con las mejores prácticas'
                        },
                        {
                            paso: '4',
                            titulo: 'Entrega',
                            descripcion: 'Desplegamos y brindamos soporte continuo'
                        }
                    ].map((etapa, index) => (
                        <div key={index} className="text-center">
                            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                                {etapa.paso}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{etapa.titulo}</h3>
                            <p className="text-gray-600 text-sm">{etapa.descripcion}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Call to Action */}
            <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-white text-center">
                <h2 className="text-2xl font-bold mb-4">
                    ¿Listo para Digitalizar su Negocio?
                </h2>
                <p className="text-blue-100 mb-6 text-lg">
                    Contáctenos hoy mismo para una consulta gratuita y descubra cómo podemos
                    ayudar a llevar su empresa al siguiente nivel.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => router.push('/contacto')}
                        className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg transition font-semibold"
                    >
                        Contactar Ahora
                    </button>
                    <button
                        onClick={() => router.push('/#preguntas')}
                        className="border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg transition font-semibold"
                    >
                        Hacer una Pregunta
                    </button>
                </div>
            </div>
        </div>
    );
}