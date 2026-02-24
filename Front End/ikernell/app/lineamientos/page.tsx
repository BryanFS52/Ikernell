'use client';

import { useState, useEffect } from 'react';

export default function LineamientosPage() {
    const [activeSection, setActiveSection] = useState('introduccion');

    const scrollToSection = (sectionId: string) => {
        setActiveSection(sectionId);
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = [
                'introduccion', 'mision-vision', 'valores', 'desarrollo',
                'calidad', 'proyectos', 'comunicacion', 'seguridad',
                'innovacion', 'recursos-humanos'
            ];
            
            const scrollPosition = window.scrollY + 200;
            
            for (let i = sections.length - 1; i >= 0; i--) {
                const element = document.getElementById(sections[i]);
                if (element && element.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const sections = [
        { id: 'introduccion', title: 'Introducción' },
        { id: 'mision-vision', title: 'Misión y Visión' },
        { id: 'valores', title: 'Valores Corporativos' },
        { id: 'desarrollo', title: 'Desarrollo de Software' },
        { id: 'calidad', title: 'Control de Calidad' },
        { id: 'proyectos', title: 'Gestión de Proyectos' },
        { id: 'comunicacion', title: 'Comunicación' },
        { id: 'seguridad', title: 'Seguridad' },
        { id: 'innovacion', title: 'Innovación' },
        { id: 'recursos-humanos', title: 'Recursos Humanos' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Lineamientos Empresariales
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Guía integral de políticas, procesos y estándares que rigen las operaciones 
                        y cultura organizacional de Ikernell.
                    </p>
                    <div className="mt-6 inline-flex items-center px-4 py-2 bg-blue-100 rounded-lg">
                        <span className="text-blue-800 font-medium">
                            Actualizado: Febrero 2026
                        </span>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Navigation */}
                    <div className="lg:w-1/4">
                        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                            <h3 className="font-semibold text-gray-900 mb-4">Navegación</h3>
                            <nav className="space-y-2">
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => scrollToSection(section.id)}
                                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                                            activeSection === section.id
                                                ? 'bg-blue-50 text-blue-800 font-medium hover:bg-blue-100 hover:text-blue-900'
                                                : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700'
                                        }`}
                                    >
                                        <span className="text-sm">{section.title}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:w-3/4">
                        <div className="space-y-8">

                            {/* Introducción */}
                            <section id="introduccion" className="bg-white rounded-xl shadow-lg p-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                    Introducción
                                </h2>
                                <div className="prose max-w-none">
                                    <p className="text-lg text-gray-700 mb-4">
                                        Los lineamientos empresariales de Ikernell constituyen el marco normativo y cultural 
                                        que orienta todas las actividades de nuestra organización especializada en desarrollo 
                                        de software, aplicaciones móviles y consultoría tecnológica.
                                    </p>
                                    <p className="text-gray-600 mb-4">
                                        Estos lineamientos han sido diseñados para asegurar la excelencia en la entrega 
                                        de soluciones tecnológicas, mantener los más altos estándares de calidad y 
                                        fomentar un ambiente de trabajo colaborativo e innovador.
                                    </p>
                                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                                        <p className="text-blue-800 font-medium">
                                            Estos lineamientos son de cumplimiento obligatorio para todos 
                                            los colaboradores y deben ser revisados periódicamente.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Misión y Visión */}
                            <section id="mision-vision" className="bg-white rounded-xl shadow-lg p-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                    Misión y Visión
                                </h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                                        <h3 className="text-xl font-semibold text-blue-900 mb-3">Misión</h3>
                                        <p className="text-gray-700">
                                            Transformar ideas en soluciones digitales innovadoras mediante el desarrollo 
                                            de software de alta calidad, aplicaciones móviles y consultoría tecnológica 
                                            especializada, superando las expectativas de nuestros clientes y contribuyendo 
                                            al crecimiento de sus negocios.
                                        </p>
                                    </div>
                                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
                                        <h3 className="text-xl font-semibold text-green-900 mb-3">Visión</h3>
                                        <p className="text-gray-700">
                                            Ser reconocidos como la empresa líder en desarrollo de soluciones tecnológicas 
                                            integrales, destacándonos por nuestra innovación, excelencia técnica y 
                                            compromiso con la transformación digital de las organizaciones.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Valores Corporativos */}
                            <section id="valores" className="bg-white rounded-xl shadow-lg p-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                    Valores Corporativos
                                </h2>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {[
                                        { title: 'Excelencia', desc: 'Buscamos la perfección en cada línea de código y proceso.' },
                                        { title: 'Integridad', desc: 'Actuamos con honestidad y transparencia en todas nuestras relaciones.' },
                                        { title: 'Innovación', desc: 'Adoptamos y desarrollamos tecnologías de vanguardia constantemente.' },
                                        { title: 'Colaboración', desc: 'Trabajamos en equipo para alcanzar objetivos comunes.' },
                                        { title: 'Aprendizaje', desc: 'Promovemos la formación continua y el crecimiento profesional.' },
                                        { title: 'Compromiso', desc: 'Nos dedicamos completamente a cumplir nuestras promesas.' }
                                    ].map((valor, index) => (
                                        <div key={index} className="text-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
                                            <h3 className="font-semibold text-gray-900 mb-2">{valor.title}</h3>
                                            <p className="text-gray-600 text-sm">{valor.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Desarrollo de Software */}
                            <section id="desarrollo" className="bg-white rounded-xl shadow-lg p-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                    Lineamientos de Desarrollo de Software
                                </h2>
                                <div className="space-y-6">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="font-semibold text-gray-900 mb-3">Metodologías y Procesos</h3>
                                        <ul className="space-y-2 text-gray-700">
                                            <li>• Implementación obligatoria de metodologías ágiles (Scrum/Kanban)</li>
                                            <li>• Seguimiento por etapas: Iniciación → Planificación → Ejecución → Seguimiento → Cierre</li>
                                            <li>• Revisiones de código obligatorias antes de integración</li>
                                            <li>• Documentación técnica actualizada para todos los proyectos</li>
                                        </ul>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="font-semibold text-gray-900 mb-3">Estándares Técnicos</h3>
                                        <ul className="space-y-2 text-gray-700">
                                            <li>• Uso de control de versiones (Git) con ramas específicas por funcionalidad</li>
                                            <li>• Aplicación de principios SOLID y patrones de diseño establecidos</li>
                                            <li>• Implementación de pruebas unitarias con cobertura mínima del 80%</li>
                                            <li>• Cumplimiento de estándares de codificación según el lenguaje utilizado</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* Control de Calidad */}
                            <section id="calidad" className="bg-white rounded-xl shadow-lg p-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                    Control de Calidad
                                </h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                                        <h3 className="font-semibold text-red-900 mb-2">Gestión de Errores</h3>
                                        <ul className="text-red-800 text-sm space-y-1">
                                            <li>• Registro obligatorio de todos los errores por fase del proyecto</li>
                                            <li>• Clasificación por tipos: Funcional, Técnico, Diseño, Performance</li>
                                            <li>• Asignación de responsable para seguimiento y resolución</li>
                                            <li>• Análisis de causa raíz para errores críticos</li>
                                        </ul>
                                    </div>
                                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                                        <h3 className="font-semibold text-yellow-900 mb-2">Control de Interrupciones</h3>
                                        <ul className="text-yellow-800 text-sm space-y-1">
                                            <li>• Documentación de interrupciones con duración y causa</li>
                                            <li>• Análisis de impacto en cronograma del proyecto</li>
                                            <li>• Medidas preventivas para reducir futuras interrupciones</li>
                                            <li>• Reportes semanales de interrupciones por proyecto</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* Gestión de Proyectos */}
                            <section id="proyectos" className="bg-white rounded-xl shadow-lg p-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                    Gestión de Proyectos
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                                        <div className="bg-blue-500 text-white p-2 rounded-full text-sm font-bold">1</div>
                                        <div>
                                            <h3 className="font-semibold text-blue-900">Asignación de Recursos</h3>
                                            <p className="text-blue-800 text-sm">Asignación basada en especialidades y disponibilidad del personal</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                                        <div className="bg-green-500 text-white p-2 rounded-full text-sm font-bold">2</div>
                                        <div>
                                            <h3 className="font-semibold text-green-900">Seguimiento de Actividades</h3>
                                            <p className="text-green-800 text-sm">Monitoreo continuo del progreso por etapas y actividades específicas</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
                                        <div className="bg-purple-500 text-white p-2 rounded-full text-sm font-bold">3</div>
                                        <div>
                                            <h3 className="font-semibold text-purple-900">Reportes de Desempeño</h3>
                                            <p className="text-purple-800 text-sm">Generación automática de informes de productividad y cumplimiento</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Comunicación */}
                            <section id="comunicacion" className="bg-white rounded-xl shadow-lg p-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                    Comunicación Organizacional
                                </h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-3">Canales Oficiales</h3>
                                        <ul className="space-y-2 text-gray-700">
                                            <li>• Sistema de noticias internas para anuncios corporativos</li>
                                            <li>• Plataforma de preguntas y respuestas para soporte técnico</li>
                                            <li>• Reuniones semanales de seguimiento por proyecto</li>
                                            <li>• Comunicación directa con coordinadores de proyecto</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-3">Protocolos</h3>
                                        <ul className="space-y-2 text-gray-700">
                                            <li>• Respuesta máxima de 4 horas para consultas internas</li>
                                            <li>• Escalamiento automático para issues críticos</li>
                                            <li>• Documentación obligatoria de decisiones técnicas</li>
                                            <li>• Feedback constructivo en revisiones de código</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* Seguridad */}
                            <section id="seguridad" className="bg-white rounded-xl shadow-lg p-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                    Seguridad y Confidencialidad
                                </h2>
                                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-4">
                                    <div className="text-red-800">
                                        <h3 className="font-semibold mb-3">Políticas Críticas</h3>
                                        <ul className="space-y-2">
                                            <li>• Confidencialidad absoluta sobre proyectos y clientes</li>
                                            <li>• Uso obligatorio de autenticación multifactor</li>
                                            <li>• Respaldos diarios de código fuente y documentación</li>
                                            <li>• Acceso restringido basado en roles y responsabilidades</li>
                                            <li>• Auditorías trimestrales de seguridad</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* Innovación */}
                            <section id="innovacion" className="bg-white rounded-xl shadow-lg p-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                    Innovación y Tecnología
                                </h2>
                                <div className="space-y-4">
                                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
                                        <h3 className="font-semibold text-gray-900 mb-3">Iniciativas de Innovación</h3>
                                        <ul className="space-y-2 text-gray-700">
                                            <li>• 20% del tiempo dedicado a exploración de nuevas tecnologías</li>
                                            <li>• Hackathons internos trimestrales</li>
                                            <li>• Certificaciones técnicas financiadas por la empresa</li>
                                            <li>• Participación en conferencias y eventos tecnológicos</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* Recursos Humanos */}
                            <section id="recursos-humanos" className="bg-white rounded-xl shadow-lg p-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                    Recursos Humanos
                                </h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <h3 className="font-semibold text-green-900 mb-3">Desarrollo Profesional</h3>
                                        <ul className="space-y-2 text-green-800 text-sm">
                                            <li>• Plan de carrera personalizado para cada rol</li>
                                            <li>• Evaluaciones de desempeño semestrales</li>
                                            <li>• Programas de mentoría técnica</li>
                                            <li>• Capacitación continua en nuevas tecnologías</li>
                                        </ul>
                                    </div>
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <h3 className="font-semibold text-blue-900 mb-3">Políticas Laborales</h3>
                                        <ul className="space-y-2 text-blue-800 text-sm">
                                            <li>• Horarios flexibles con core time definido</li>
                                            <li>• Trabajo remoto híbrido permitido</li>
                                            <li>• Beneficios de bienestar y salud</li>
                                            <li>• Ambiente laboral inclusivo y diverso</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                        </div>

                        {/* Footer */}
                        <div className="mt-12 bg-gray-800 text-white rounded-xl p-8 text-center">
                            <h3 className="text-xl font-semibold mb-4">Cumplimiento y Actualizaciones</h3>
                            <p className="text-gray-300 mb-4">
                                Estos lineamientos son revisados y actualizados trimestralmente.
                                Todos los colaboradores deben confirmar su lectura y cumplimiento.
                            </p>
                            <div className="text-sm text-gray-400">
                                <p>Última actualización: Febrero 2026 | Próxima revisión: Mayo 2026</p>
                                <p className="mt-2">Para sugerencias o consultas, contactar al área de Gestión de Calidad</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}