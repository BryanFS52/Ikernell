"use client";

import { useEffect, useState } from "react";
import { Persona } from "@/types/persona"
import { getPersona, desactivarPersona } from "@/services/persona.service";
import { useRouter } from "next/navigation";
import { usePermissions } from "@/hooks/usePermissions";

export default function PersonaPage() {
    const [persona, setPersona] = useState<Persona[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchNombre, setSearchNombre] = useState("");
    const [searchRol, setSearchRol] = useState("");
    const router = useRouter();
    const {
        canManagePersonas,
        canCreatePersonas,
        canEditPersonas,
        canDeletePersonas
    } = usePermissions();

    useEffect(() => {
        cargarPersonas();
    }, []);

    async function cargarPersonas() {
        setLoading(true);
        try {
            const data = await getPersona();
            setPersona(data || []);
        } catch (error) {
            console.error("Error al cargar personas:", error);
            setPersona([]);
        } finally {
            setLoading(false);
        }
    }

    async function handleEliminar(id: number) {
        if (!confirm("¿Estás seguro de que deseas desactivar a esta persona?")) return;

        try {
            await desactivarPersona(id);
            cargarPersonas();
        } catch (error) {
            console.error("Error al desactivar persona:", error);
        }
    }

    function handleEditar(id: number) {
        router.push(`/personas/editar/${id}`);
    }

    const personaFiltradas = persona.filter((p) => {
        const nombreCompleto = `${p.nombre ?? ""} ${p.apellido ?? ""}`.toLowerCase();

        const coincideNombre = nombreCompleto.includes(searchNombre.toLowerCase());

        const coincideRol = searchRol
            ? p.rol?.nombre.toLowerCase() === searchRol.toLowerCase()
            : true;

        return coincideNombre && coincideRol;
    });

    if (loading) {
        return <p className="text-center mt-10">Cargando personas</p>;
    }

    // Verificar permisos básicos para ver la página
    if (!canManagePersonas()) {
        return (
            <div className="page">
                <h1 className="text-2xl font-bold text-red-600">Acceso Denegado</h1>
                <p className="mt-4">No tienes permisos para ver esta página.</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Personas</h1>

                <div className="flex gap-2">
                    {canCreatePersonas() && (
                        <button
                            onClick={() => router.push("/personas/crear")}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Nueva Persona
                        </button>
                    )}

                    <button
                        onClick={() => router.push("/personas/desactivadas")}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Personas Desactivadas
                    </button>
                </div>
            </div>

            {/*Barra de búsqueda */}
            <div className="bg-white p-4 rounded-xl shadow border mb-6">
                <div className="grid md:grid-cols-3 gap-4">

                    <input
                        type="text"
                        placeholder="Buscar por nombre"
                        value={searchNombre}
                        onChange={(e) => setSearchNombre(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />

                    <input
                        type="text"
                        placeholder="Filtrar por rol"
                        value={searchRol}
                        onChange={(e) => setSearchRol(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />

                    <button
                        onClick={() => {
                            setSearchNombre("");
                            setSearchRol("");
                        }}
                        className="bg-gray-200 text-gray-700 rounded-lg px-4 py-2 hover:bg-gray-300 transition"
                    >
                        Limpiar filtros
                    </button>

                </div>
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-xl shadow border overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-blue-900 text-white uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3">Nombre</th>
                            <th className="px-6 py-3">Documento</th>
                            <th className="px-6 py-3">Rol</th>
                            <th className="px-6 py-3">Estado</th>
                            <th className="px-6 py-3 text-center">Acciones</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {personaFiltradas.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-6 text-gray-500">
                                    No se encontraron personas
                                </td>
                            </tr>
                        ) : (
                            personaFiltradas.map((p) => (
                                <tr key={p.idPersona} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        {p.nombre} {p.apellido}
                                    </td>
                                    <td className="px-6 py-4">{p.documento}</td>
                                    <td className="px-6 py-4">
                                        {p.rol?.nombre || "Sin rol"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {p.estado ? (
                                            <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                                                Activo
                                            </span>
                                        ) : (
                                            <span className="px-3 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                                                Inactivo
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-center space-x-2">
                                        <button
                                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                                            onClick={() => router.push(`/personas/ver/${p.idPersona}`)}
                                        >
                                            Ver
                                        </button>

                                        {canEditPersonas() && (
                                            <button
                                                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                                                onClick={() => handleEditar(p.idPersona)}
                                            >
                                                Editar
                                            </button>
                                        )}

                                        {canDeletePersonas() && (
                                            <button
                                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                                onClick={() => handleEliminar(p.idPersona)}
                                            >
                                                Desactivar
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}