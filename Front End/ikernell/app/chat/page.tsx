'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

export default function ChatPage() {
    const { usuario } = useAuth();
    const router = useRouter();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [mensaje, setMensaje] = useState('');
    const [mensajes, setMensajes] = useState<any[]>([]);
    const [usuariosOnline, setUsuariosOnline] = useState<any[]>([]);
    const [canalActual, setCanalActual] = useState('general');

    // Simulación de usuarios online
    useEffect(() => {
        const usuarios = [
            { id: 1, nombre: 'Ana García', rol: 'Desarrollador', activo: true },
            { id: 2, nombre: 'Carlos López', rol: 'Lider de proyectos', activo: true },
            { id: 3, nombre: 'María Rodríguez', rol: 'Coordinador de proyectos', activo: false },
            { id: 4, nombre: 'Juan Pérez', rol: 'Desarrollador', activo: true },
            { id: 5, nombre: 'Laura Martínez', rol: 'Desarrollador', activo: true }
        ];
        setUsuariosOnline(usuarios);
    }, []);

    // Simulación de mensajes iniciales
    useEffect(() => {
        const mensajesIniciales = [
            {
                id: 1,
                autor: 'Ana García',
                autorId: 1,
                mensaje: '¡Buenos días equipo! ¿Cómo van con el proyecto de la app móvil?',
                fecha: new Date(Date.now() - 3600000),
                canal: 'general'
            },
            {
                id: 2,
                autor: 'Carlos López',
                autorId: 2,
                mensaje: 'Hola Ana, vamos bien. Ya terminamos la fase de wireframes y estamos en desarrollo del backend',
                fecha: new Date(Date.now() - 3000000),
                canal: 'general'
            },
            {
                id: 3,
                autor: 'Juan Pérez',
                autorId: 4,
                mensaje: 'El servidor de desarrollo está listo. Ya pueden hacer deploy de sus cambios',
                fecha: new Date(Date.now() - 1800000),
                canal: 'desarrollo'
            },
            {
                id: 4,
                autor: 'Laura Martínez',
                autorId: 5,
                mensaje: '¿Alguien sabe si hay nuevos casos de prueba para la feature de autenticación?',
                fecha: new Date(Date.now() - 900000),
                canal: 'qa'
            }
        ];
        setMensajes(mensajesIniciales);
    }, []);

    const canales = [
        { id: 'general', nombre: 'General', descripcion: 'Conversaciones generales del equipo' },
        { id: 'desarrollo', nombre: 'Desarrollo', descripcion: 'Discusiones técnicas y código' },
        { id: 'diseno', nombre: 'Diseño', descripcion: 'UI/UX y aspectos visuales' },
        { id: 'qa', nombre: 'QA & Testing', descripcion: 'Pruebas y control de calidad' },
        { id: 'proyectos', nombre: 'Proyectos', descripcion: 'Gestión y seguimiento de proyectos' }
    ];

    const mensajesFiltrados = mensajes.filter(m => m.canal === canalActual);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [mensajes, canalActual]);

    const enviarMensaje = (e: React.FormEvent) => {
        e.preventDefault();

        if (!mensaje.trim()) return;

        const nuevoMensaje = {
            id: mensajes.length + 1,
            autor: `${usuario?.nombre} ${usuario?.apellido}`,
            autorId: usuario?.idPersona,
            mensaje: mensaje.trim(),
            fecha: new Date(),
            canal: canalActual
        };

        setMensajes([...mensajes, nuevoMensaje]);
        setMensaje('');

        // Simular respuesta automática después de 3 segundos
        setTimeout(() => {
            const respuestas = [
                'Excelente punto, lo revisaré',
                'Gracias por la información',
                'Perfecto, sigamos con eso',
                'De acuerdo, procedamos',
                'Buen trabajo en eso'
            ];

            const usuariosRespuesta = usuariosOnline.filter(u => u.activo && u.id !== usuario?.idPersona);

            if (usuariosRespuesta.length > 0) {
                const usuarioAleatorio = usuariosRespuesta[Math.floor(Math.random() * usuariosRespuesta.length)];
                const respuestaAleatoria = respuestas[Math.floor(Math.random() * respuestas.length)];

                const mensajeRespuesta = {
                    id: mensajes.length + 2,
                    autor: usuarioAleatorio.nombre,
                    autorId: usuarioAleatorio.id,
                    mensaje: respuestaAleatoria,
                    fecha: new Date(),
                    canal: canalActual
                };

                setMensajes(prev => [...prev, mensajeRespuesta]);
            }
        }, 3000);
    };

    const formatearHora = (fecha: Date) => {
        return fecha.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const esMensajePropio = (autorId: number) => {
        return autorId === usuario?.idPersona;
    };

    if (!usuario) {
        router.push('/login');
        return null;
    }

    return (
        <div className="h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-gray-200">
                    <h1 className="text-xl font-bold text-gray-900">Chat Corporativo</h1>
                    <p className="text-sm text-gray-600">Ikernell Team</p>
                </div>

                {/* Canales */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-4">
                        <h2 className="text-sm font-semibold text-gray-700 mb-3">Canales</h2>
                        <div className="space-y-2">
                            {canales.map(canal => (
                                <button
                                    key={canal.id}
                                    onClick={() => setCanalActual(canal.id)}
                                    className={`w-full text-left p-3 rounded-lg transition ${canalActual === canal.id
                                            ? 'bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200 hover:text-blue-800'
                                            : 'hover:bg-gray-100 text-gray-700'
                                        }`}
                                >
                                    <div className="font-medium text-sm">#{canal.nombre}</div>
                                    <div className="text-xs text-gray-500 mt-1">{canal.descripcion}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Usuarios Online */}
                    <div className="p-4 border-t border-gray-200">
                        <h2 className="text-sm font-semibold text-gray-700 mb-3">
                            En línea ({usuariosOnline.filter(u => u.activo).length})
                        </h2>
                        <div className="space-y-2">
                            {usuariosOnline.map(usuarioOnline => (
                                <div key={usuarioOnline.id} className="flex items-center space-x-3">
                                    <div className={`w-3 h-3 rounded-full ${usuarioOnline.activo ? 'bg-green-500' : 'bg-gray-400'
                                        }`}></div>
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">{usuarioOnline.nombre}</div>
                                        <div className="text-xs text-gray-500">{usuarioOnline.rol}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Usuario actual */}
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div>
                            <div className="text-sm font-medium text-gray-900">
                                {usuario.nombre} {usuario.apellido}
                            </div>
                            <div className="text-xs text-gray-500">{usuario.rol.nombre}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Área de Chat */}
            <div className="flex-1 flex flex-col">
                {/* Header del Canal */}
                <div className="p-4 border-b border-gray-200 bg-white">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                #{canales.find(c => c.id === canalActual)?.nombre}
                            </h2>
                            <p className="text-sm text-gray-600">
                                {canales.find(c => c.id === canalActual)?.descripcion}
                            </p>
                        </div>
                        <button
                            onClick={() => router.push('/')}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                        >
                            Volver
                        </button>
                    </div>
                </div>

                {/* Mensajes */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {mensajesFiltrados.length === 0 ? (
                        <div className="text-center text-gray-500 py-8">
                            <p>No hay mensajes en este canal aún.</p>
                            <p className="text-sm">¡Sé el primero en escribir algo!</p>
                        </div>
                    ) : (
                        mensajesFiltrados.map(msg => (
                            <div key={msg.id} className={`flex ${esMensajePropio(msg.autorId) ? 'justify-end' : 'justify-start'
                                }`}>
                                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${esMensajePropio(msg.autorId)
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white border border-gray-200 text-gray-900'
                                    }`}>
                                    {!esMensajePropio(msg.autorId) && (
                                        <div className="text-xs font-semibold mb-1 text-blue-600">
                                            {msg.autor}
                                        </div>
                                    )}
                                    <div className="text-sm">{msg.mensaje}</div>
                                    <div className={`text-xs mt-1 ${esMensajePropio(msg.autorId) ? 'text-blue-100' : 'text-gray-500'
                                        }`}>
                                        {formatearHora(msg.fecha)}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input de Mensaje */}
                <div className="p-4 border-t border-gray-200 bg-white">
                    <form onSubmit={enviarMensaje} className="flex space-x-3">
                        <input
                            type="text"
                            value={mensaje}
                            onChange={(e) => setMensaje(e.target.value)}
                            placeholder={`Escribir mensaje en #${canales.find(c => c.id === canalActual)?.nombre}...`}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                            type="submit"
                            disabled={!mensaje.trim()}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                        >
                            Enviar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}