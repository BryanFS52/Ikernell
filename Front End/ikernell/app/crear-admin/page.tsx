'use client';

import { useState } from 'react';

export default function CrearUsuarioAdmin() {
    const [estado, setEstado] = useState<'inicial' | 'cargando' | 'exito' | 'error'>('inicial');
    const [mensaje, setMensaje] = useState('');
    const [usuarioCreado, setUsuarioCreado] = useState<any>(null);

    const crearUsuarioCoordinador = async () => {
        setEstado('cargando');
        setMensaje('Creando usuario coordinador...');

        try {
            let rolCoordinador;
            try {
                const rolesRes = await fetch('http://localhost:8080/api/roles');
                if (!rolesRes.ok) {
                    throw new Error('No se pueden obtener los roles del sistema');
                }
                const roles = await rolesRes.json();
                rolCoordinador = roles.find((rol: any) =>
                    rol.nombre === 'Coordinador de proyectos'
                );

                if (!rolCoordinador) {
                    const rolesDisponibles = roles.map((r: any) => r.nombre).join(', ');
                    throw new Error(`El rol "Coordinador de proyectos" no existe. Roles disponibles: ${rolesDisponibles}`);
                }
            } catch (error: any) {
                throw new Error(`Error al verificar roles: ${error.message}`);
            }

            setMensaje('Verificando usuario existente...');
            try {
                const personasRes = await fetch('http://localhost:8080/api/personas');
                const personas = await personasRes.json();
                const usuarioExiste = personas.find((p: any) =>
                    p.documento === '123456789'
                );

                if (usuarioExiste) {
                    setEstado('error');
                    setMensaje(`El usuario con documento 123456789 ya existe. ID: ${usuarioExiste.idPersona}, Nombre: ${usuarioExiste.nombre} ${usuarioExiste.apellido}`);
                    return;
                }
            } catch (error) {
                console.log('Error al verificar usuarios, continuando...');
            }

            setMensaje('Creando usuario coordinador...');
            const nuevoUsuario = {
                nombre: 'Coordinador',
                apellido: 'Proyectos',
                documento: '123456789',
                password: 'admin123',
                estado: true,
                rol: rolCoordinador,
                profesion: 'Coordinador de Proyectos',
                especialidad: 'Gestión de Proyectos'
            };

            const usuarioRes = await fetch('http://localhost:8080/api/personas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoUsuario)
            });

            if (!usuarioRes.ok) {
                const error = await usuarioRes.json();
                throw new Error(error.message || 'Error al crear el usuario');
            }

            const usuario = await usuarioRes.json();
            setUsuarioCreado(usuario);
            setEstado('exito');
            setMensaje('¡Usuario coordinador creado exitosamente!');

        } catch (error: any) {
            setEstado('error');
            setMensaje(`Error: ${error.message}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Crear Usuario Coordinador
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Script para crear el usuario coordinador inicial del sistema
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">
                                Datos del usuario a crear:
                            </h3>
                            <ul className="mt-3 text-sm text-gray-600 space-y-1">
                                <li><strong>Usuario:</strong> 123456789</li>
                                <li><strong>Contraseña:</strong> admin123</li>
                                <li><strong>Documento:</strong> 123456789</li>
                                <li><strong>Nombre:</strong> Coordinador Proyectos</li>
                                <li><strong>Rol:</strong> Coordinador de proyectos</li>
                            </ul>
                        </div>

                        <div>
                            <button
                                onClick={crearUsuarioCoordinador}
                                disabled={estado === 'cargando'}
                                className={`
                                    w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                                    ${estado === 'cargando'
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                    }
                                `}
                            >
                                {estado === 'cargando' ? 'Creando...' : 'Crear Usuario Coordinador'}
                            </button>
                        </div>

                        {mensaje && (
                            <div className={`
                                p-4 rounded-md
                                ${estado === 'exito' ? 'bg-green-50 text-green-800' : ''}
                                ${estado === 'error' ? 'bg-red-50 text-red-800' : ''}
                                ${estado === 'cargando' ? 'bg-blue-50 text-blue-800' : ''}
                            `}>
                                <p className="text-sm">{mensaje}</p>
                            </div>
                        )}

                        {usuarioCreado && estado === 'exito' && (
                            <div className="bg-green-50 border border-green-200 rounded-md p-4">
                                <h4 className="text-sm font-medium text-green-800 mb-2">
                                    Usuario creado exitosamente:
                                </h4>
                                <ul className="text-sm text-green-700 space-y-1">
                                    <li><strong>ID:</strong> {usuarioCreado.idPersona}</li>
                                    <li><strong>Nombre:</strong> {usuarioCreado.nombre} {usuarioCreado.apellido}</li>
                                    <li><strong>Documento:</strong> {usuarioCreado.documento}</li>
                                    <li><strong>Usuario:</strong> {usuarioCreado.usuario}</li>
                                    <li><strong>Rol:</strong> {usuarioCreado.rol.nombre}</li>
                                </ul>

                                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                                    <p className="text-sm text-yellow-800">
                                        <strong>Credenciales de acceso:</strong><br />
                                        Usuario: <code className="bg-yellow-100 px-1 rounded">123456789</code><br />
                                        Contraseña: <code className="bg-yellow-100 px-1 rounded">admin123</code>
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="text-center">
                            <a
                                href="/"
                                className="text-sm text-indigo-600 hover:text-indigo-500"
                            >
                                ← Volver al inicio
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}