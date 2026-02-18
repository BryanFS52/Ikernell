'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { usePermissions } from '@/hooks/usePermissions';
import { ConditionalRender } from '@/components/ConditionalRender';

export function Navbar() {
    const { usuario, cerrarSesion } = useAuth();
    const {
        canViewProjects,
        canManagePersonas,
        canManageRoles,
        canViewActivities,
        canRegisterErrors,
        canRegisterInterruptions,
        canViewReports,
        isCoordinador
    } = usePermissions();
    const router = useRouter();
    const [dropdownAbierto, setDropdownAbierto] = useState('');

    const handleCerrarSesion = () => {
        cerrarSesion();
        router.push('/');
    };

    const toggleDropdown = (nombre: string) => {
        setDropdownAbierto(dropdownAbierto === nombre ? '' : nombre);
    };

    const cerrarDropdowns = () => {
        setDropdownAbierto('');
    };

    if (!usuario) return null;

    // Filtrar menús según permisos del usuario
    const menuGestionItems = [
        { nombre: 'Proyectos', href: '/proyectos', descripcion: 'Gestión de proyectos empresariales', show: canViewProjects() },
        { nombre: 'Personas', href: '/personas', descripcion: 'Administrar usuarios del sistema', show: canManagePersonas() },
        { nombre: 'Roles', href: '/roles', descripcion: 'Definir permisos y accesos', show: canManageRoles() },
        { nombre: 'Actividades', href: '/actividades', descripcion: 'Seguimiento de tareas', show: canViewActivities() }
    ];
    const menuGestion = menuGestionItems.filter(item => item.show);

    const menuCalidadItems = [
        { nombre: 'Errores en proyecto', href: '/erroresProyecto', descripcion: 'Registro y seguimiento de incidencias', show: canRegisterErrors() },
        { nombre: 'Interrupciones', href: '/interrupciones', descripcion: 'Control de pausas en proyectos', show: canRegisterInterruptions() },
        { nombre: 'Reportes', href: '/reportes', descripcion: 'Análisis y estadísticas', show: canViewReports() }
    ];
    const menuCalidad = menuCalidadItems.filter(item => item.show);

    const menuRecursos = [
        { nombre: 'Biblioteca', href: '/biblioteca', descripcion: 'Recursos y documentación' },
        { nombre: 'Tutoriales', href: '/tutoriales', descripcion: 'Guías de capacitación' },
        { nombre: 'Chat Corporativo', href: '/chat', descripcion: 'Comunicación interna' }
    ];

    const menuEmpresa = [
        { nombre: 'Servicios', href: '/servicios', descripcion: 'Portafolio de soluciones' },
        { nombre: 'Lineamientos', href: '/lineamientos', descripcion: 'Misión, visión y valores' },
        { nombre: 'Sitios de interés', href: '/sitios-interes', descripcion: 'Enlaces útiles externos' },
        { nombre: 'Contacto', href: '/contacto', descripcion: 'Información de contacto' }
    ];

    return (
        <nav className="bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-lg relative z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2" onClick={cerrarDropdowns}>
                        <h1 className="text-2xl font-bold text-blue-300">Ikernell</h1>
                    </Link>

                    {/* Nav Links */}
                    <div className="hidden lg:flex items-center space-x-1">
                        <Link href="/" className="text-gray-300 hover:text-white hover:bg-gray-700 transition px-4 py-2 rounded-md font-medium" onClick={cerrarDropdowns}>
                            Inicio
                        </Link>

                        {/* Dropdown Gestión */}
                        <ConditionalRender condition={menuGestion.length > 0}>
                            <div className="relative">
                                <button
                                    onClick={() => toggleDropdown('gestion')}
                                    className="text-gray-300 hover:text-white hover:bg-gray-700 transition px-4 py-2 rounded-md flex items-center font-medium"
                                >
                                    Gestión
                                </button>
                                {dropdownAbierto === 'gestion' && (
                                    <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-3 z-50">
                                        <div className="px-4 py-2 border-b border-gray-100 mb-2">
                                            <h3 className="font-semibold text-gray-900 text-sm">Administración del Sistema</h3>
                                            <p className="text-xs text-gray-500 mt-1">Herramientas de gestión empresarial</p>
                                        </div>
                                        {menuGestion.map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition group"
                                                onClick={cerrarDropdowns}
                                            >
                                                <div className="font-medium text-sm group-hover:text-blue-600">{item.nombre}</div>
                                                <div className="text-xs text-gray-500 mt-1">{item.descripcion}</div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </ConditionalRender>

                        {/* Dropdown Calidad */}
                        <ConditionalRender condition={menuCalidad.length > 0}>
                            <div className="relative">
                                <button
                                    onClick={() => toggleDropdown('calidad')}
                                    className="text-gray-300 hover:text-white hover:bg-gray-700 transition px-4 py-2 rounded-md flex items-center font-medium"
                                >
                                    Calidad
                                </button>
                                {dropdownAbierto === 'calidad' && (
                                    <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-3 z-50">
                                        <div className="px-4 py-2 border-b border-gray-100 mb-2">
                                            <h3 className="font-semibold text-gray-900 text-sm">Control de Calidad</h3>
                                            <p className="text-xs text-gray-500 mt-1">Seguimiento y análisis de proyectos</p>
                                        </div>
                                        {menuCalidad.map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition group"
                                                onClick={cerrarDropdowns}
                                            >
                                                <div className="font-medium text-sm group-hover:text-blue-600">{item.nombre}</div>
                                                <div className="text-xs text-gray-500 mt-1">{item.descripcion}</div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </ConditionalRender>

                        {/* Dropdown Recursos */}
                        <div className="relative">
                            <button
                                onClick={() => toggleDropdown('recursos')}
                                className="text-gray-300 hover:text-white hover:bg-gray-700 transition px-4 py-2 rounded-md flex items-center font-medium"
                            >
                                Recursos
                            </button>
                            {dropdownAbierto === 'recursos' && (
                                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-3 z-50">
                                    <div className="px-4 py-2 border-b border-gray-100 mb-2">
                                        <h3 className="font-semibold text-gray-900 text-sm">Recursos Disponibles</h3>
                                        <p className="text-xs text-gray-500 mt-1">Herramientas y documentación</p>
                                    </div>
                                    {menuRecursos.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition group"
                                            onClick={cerrarDropdowns}
                                        >
                                            <div className="font-medium text-sm group-hover:text-blue-600">{item.nombre}</div>
                                            <div className="text-xs text-gray-500 mt-1">{item.descripcion}</div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Dropdown Empresa */}
                        <div className="relative">
                            <button
                                onClick={() => toggleDropdown('empresa')}
                                className="text-gray-300 hover:text-white hover:bg-gray-700 transition px-4 py-2 rounded-md flex items-center font-medium"
                            >
                                Empresa
                            </button>
                            {dropdownAbierto === 'empresa' && (
                                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-3 z-50">
                                    <div className="px-4 py-2 border-b border-gray-100 mb-2">
                                        <h3 className="font-semibold text-gray-900 text-sm">Información Corporativa</h3>
                                        <p className="text-xs text-gray-500 mt-1">Conozca más sobre Ikernell</p>
                                    </div>
                                    {menuEmpresa.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition group"
                                            onClick={cerrarDropdowns}
                                        >
                                            <div className="font-medium text-sm group-hover:text-blue-600">{item.nombre}</div>
                                            <div className="text-xs text-gray-500 mt-1">{item.descripcion}</div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Separador */}
                        <div className="w-px h-6 bg-gray-600 mx-2"></div>

                        {/* Links directos */}
                        <Link href="/noticias" className="text-gray-300 hover:text-white hover:bg-gray-700 transition px-4 py-2 rounded-md font-medium" onClick={cerrarDropdowns}>
                            Noticias
                        </Link>
                        <Link href="/preguntas" className="text-gray-300 hover:text-white hover:bg-gray-700 transition px-4 py-2 rounded-md font-medium" onClick={cerrarDropdowns}>
                            Preguntas
                        </Link>
                    </div>

                    {/* User Info */}
                    <div className="flex items-center space-x-4">
                        <div className="text-right hidden sm:block">
                            <p className="font-medium text-sm">
                                {usuario.nombre} {usuario.apellido}
                            </p>
                            <p className="text-xs text-gray-400">{usuario.rol.nombre}</p>
                        </div>
                        <button
                            onClick={handleCerrarSesion}
                            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition text-sm font-medium"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>

            {/* Overlay para cerrar dropdowns */}
            {dropdownAbierto && (
                <div
                    className="fixed inset-0 z-10"
                    onClick={cerrarDropdowns}
                ></div>
            )}
        </nav>
    );
}
