'use client';

import { useState } from 'react';

export default function ContactoPage() {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        empresa: '',
        mensaje: '',
        tipoConsulta: 'general'
    });

    const [enviando, setEnviando] = useState(false);
    const [mensajeEnviado, setMensajeEnviado] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEnviando(true);
        
        // Simulación de envío
        setTimeout(() => {
            setEnviando(false);
            setMensajeEnviado(true);
            setFormData({
                nombre: '',
                email: '',
                telefono: '',
                empresa: '',
                mensaje: '',
                tipoConsulta: 'general'
            });
            
            setTimeout(() => setMensajeEnviado(false), 5000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Contáctanos
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Estamos aquí para ayudarte a transformar tus ideas en soluciones digitales innovadoras. 
                        Escríbenos y te responderemos lo más pronto posible.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    
                    {/* Formulario de Contacto */}
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Envíanos un mensaje</h2>
                        
                        {mensajeEnviado && (
                            <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg">
                                <p className="text-green-700 font-medium">
                                    ¡Mensaje enviado exitosamente! Te contactaremos pronto.
                                </p>
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                                        Nombre completo *
                                    </label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        placeholder="Tu nombre"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                                        Teléfono
                                    </label>
                                    <input
                                        type="tel"
                                        id="telefono"
                                        name="telefono"
                                        value={formData.telefono}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        placeholder="Tu teléfono"
                                    />
                                </div>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Correo electrónico *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        placeholder="tu@email.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="empresa" className="block text-sm font-medium text-gray-700 mb-2">
                                        Empresa
                                    </label>
                                    <input
                                        type="text"
                                        id="empresa"
                                        name="empresa"
                                        value={formData.empresa}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        placeholder="Nombre de tu empresa"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="tipoConsulta" className="block text-sm font-medium text-gray-700 mb-2">
                                    Tipo de consulta
                                </label>
                                <select
                                    id="tipoConsulta"
                                    name="tipoConsulta"
                                    value={formData.tipoConsulta}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                >
                                    <option value="general">Consulta general</option>
                                    <option value="desarrollo">Desarrollo de software</option>
                                    <option value="movil">Aplicaciones móviles</option>
                                    <option value="consultoria">Consultoría tecnológica</option>
                                    <option value="soporte">Soporte técnico</option>
                                    <option value="cotizacion">Solicitar cotización</option>
                                </select>
                            </div>
                            
                            <div>
                                <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-2">
                                    Mensaje *
                                </label>
                                <textarea
                                    id="mensaje"
                                    name="mensaje"
                                    rows={5}
                                    value={formData.mensaje}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    placeholder="Cuéntanos sobre tu proyecto o consulta..."
                                />
                            </div>
                            
                            <button
                                type="submit"
                                disabled={enviando}
                                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200 font-medium disabled:bg-blue-400 disabled:cursor-not-allowed"
                            >
                                {enviando ? 'Enviando...' : 'Enviar mensaje'}
                            </button>
                        </form>
                    </div>

                    {/* Información de Contacto */}
                    <div className="space-y-8">
                        
                        {/* Datos de Contacto */}
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Información de contacto</h2>
                            
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Dirección</h3>
                                        <p className="text-gray-600">
                                            Calle 35 # 10 - 43<br />
                                            SENA Centro de Servicios Financieros<br />
                                            Bogotá, Colombia
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Teléfono</h3>
                                        <p className="text-gray-600">
                                            +57 (1) 546-1500<br />
                                            Cel: +57 314-567-8900
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Correo electrónico</h3>
                                        <p className="text-gray-600">
                                            contacto@ikernell.com<br />
                                            info@ikernell.com
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Horarios de atención</h3>
                                        <p className="text-gray-600">
                                            Lunes a Viernes: 8:00 AM - 6:00 PM<br />
                                            Sábados: 9:00 AM - 2:00 PM
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Servicios Destacados */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold mb-6">¿En qué podemos ayudarte?</h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                    <span>Desarrollo de aplicaciones web y móviles</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                    <span>Consultoría en transformación digital</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                    <span>Soporte técnico especializado</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                    <span>Auditoría y optimización de sistemas</span>
                                </div>
                            </div>
                            
                            <div className="mt-6 pt-6 border-t border-blue-400">
                                <p className="text-blue-100 text-sm">
                                    <strong>Tiempo de respuesta promedio:</strong> 2-4 horas en días hábiles
                                </p>
                            </div>
                        </div>

                        {/* Ubicación */}
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Nuestra ubicación</h2>
                            <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                                <div className="text-center text-gray-500">
                                    <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <p>Mapa interactivo</p>
                                    <p className="text-sm">Calle 35 # 10 - 43, Bogotá</p>
                                </div>
                            </div>
                            
                            <div className="mt-4 text-center">
                                <a 
                                    href="https://maps.app.goo.gl/EaGMABGYGnQgSk9i7"
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    Ver en Google Maps
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
                
                {/* Call to Action */}
                <div className="mt-16 text-center bg-gray-800 text-white rounded-xl p-10">
                    <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar tu proyecto?</h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Nuestro equipo de expertos está preparado para convertir tus ideas en realidad digital. 
                        Contáctanos hoy y comencemos a trabajar juntos.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => document.getElementById('email')?.focus()}
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                        >
                            Escribir mensaje
                        </button>
                        <a 
                            href="tel:+573145678900"
                            className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-gray-800 transition font-medium"
                        >
                            Llamar ahora
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}