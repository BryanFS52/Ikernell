"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Proyecto } from "@/types/proyecto";
import { getProyecto, desactivarProyecto } from "@/services/proyecto.service";
import { Persona } from "@/types/persona";
import { usePermissions } from "@/hooks/usePermissions";
import { ConditionalRender } from "@/components/ConditionalRender";
import { useAuth } from "@/app/context/AuthContext";

export default function ProyectosPage() {
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchNombre, setSearchNombre] = useState("");
    const [searchFechaInicio, setSearchFechaInicio] = useState("");
    const [searchFechaFin, setSearchFechaFin] = useState("");
    const router = useRouter();
    const { usuario } = useAuth();
    const {
        canCreateProjects,
        canAssignDevelopers,
        canDeactivateProjects,
        canViewAllProjects,
        isDesarrollador
    } = usePermissions();

    useEffect(() => {
        cargarProyectos();
    }, []);

    async function cargarProyectos() {
        setLoading(true);
        try {
            const data = await getProyecto();

            let proyectosFiltrados = data;

            // Si es desarrollador, solo mostrar proyectos asignados
            if (isDesarrollador() && usuario) {
                proyectosFiltrados = data.filter(proyecto =>
                    proyecto.personas?.some(persona =>
                        persona.idPersona === usuario.idPersona
                    )
                );
            }

            const uniqueProyectos = proyectosFiltrados.filter(
                (p, index, self) =>
                    index ===
                    self.findIndex(t => t.idProyecto === p.idProyecto)
            );

            setProyectos(uniqueProyectos);
        } catch (error) {
            console.error("Error al cargar proyectos:", error);
            alert("Error al cargar proyectos. Verifica que el servidor esté funcionando.");
        } finally {
            setLoading(false);
        }
    }

    async function handleEliminar(id: number) {
        if (!confirm("¿Estás seguro de que deseas desactivar este proyecto?")) return;

        try {
            await desactivarProyecto(id);
            cargarProyectos();
        } catch (error) {
            console.error("Error al eliminar proyecto:", error);
        }
    }

    function handleEditar(id: number) {
        router.push(`/proyectos/editar/${id}`);
    }

    const proyectosFiltrados = proyectos.filter((p) => {
        const coincideNombre = p.nombre
            .toLowerCase()
            .includes(searchNombre.toLowerCase());

        const coincideFechaInicio = searchFechaInicio
            ? new Date(p.fechaInicio).toISOString().slice(0, 10) === searchFechaInicio
            : true;

        const coincideFechaFin = searchFechaFin
            ? p.fechaFin && new Date(p.fechaFin).toISOString().slice(0, 10) === searchFechaFin
            : true;

        return coincideNombre && coincideFechaInicio && coincideFechaFin;
    })

    if (loading) {
        return <p className="text-center mt-10">Cargando proyectos...</p>;
    }

    return (
        <div className="max-w-6xl mx-auto p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Proyectos</h1>

                <div className="flex gap-2">
                    <ConditionalRender condition={canCreateProjects()}>
                        <button
                            onClick={() => router.push("/proyectos/crear")}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Nuevo proyecto
                        </button>
                    </ConditionalRender>

                    <ConditionalRender condition={canViewAllProjects()}>
                        <button
                            onClick={() => router.push("/proyectos/desactivados")}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Proyectos desactivados
                        </button>
                    </ConditionalRender>

                    <ConditionalRender condition={canAssignDevelopers()}>
                        <button
                            onClick={() => router.push("/proyectos/asignar")}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Asignar desarrollador
                        </button>
                    </ConditionalRender>
                </div>
            </div>

            {/*Barra de búsqueda */}
            <div className="bg-white p-4 rounded-xl shadow border mb-6">
                <div className="grid md:grid-cols-4 gap-4">

                    <input
                        type="text"
                        placeholder="Buscar por nombre"
                        value={searchNombre}
                        onChange={(e) => setSearchNombre(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />

                    <input
                        type="date"
                        value={searchFechaInicio}
                        onChange={(e) => setSearchFechaInicio(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />

                    <input
                        type="date"
                        value={searchFechaFin}
                        onChange={(e) => setSearchFechaFin(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />

                    <button
                        onClick={() => {
                            setSearchNombre("");
                            setSearchFechaInicio("");
                            setSearchFechaFin("");
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
                            <th className="px-6 py-3">Desarrollador</th>
                            <th className="px-6 py-3">Fecha inicio</th>
                            <th className="px-6 py-3">Fecha fin</th>
                            <th className="px-6 py-3 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {proyectosFiltrados.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-6 text-gray-500">
                                    No se encontraron proyectos
                                </td>
                            </tr>
                        ) : (
                            proyectosFiltrados.map((p) => (
                                <tr key={p.idProyecto} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">{p.nombre}</td>
                                    <td className="px-6 py-4">
                                        {p.personas && p.personas.length > 0
                                            ? `${p.personas[0].nombre} ${p.personas[0].apellido}`
                                            : "No asignado"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(p.fechaInicio).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        {p.fechaFin
                                            ? new Date(p.fechaFin).toLocaleDateString()
                                            : "No especificada"}
                                    </td>
                                    <td className="px-6 py-4 text-center space-x-2">
                                        <button
                                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-800 transition"
                                            onClick={() => router.push(`/proyectos/ver/${p.idProyecto}`)}
                                        >
                                            Ver
                                        </button>

                                        <ConditionalRender condition={canCreateProjects()}>
                                            <button
                                                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                                                onClick={() => handleEditar(p.idProyecto)}
                                            >
                                                Editar
                                            </button>
                                        </ConditionalRender>

                                        <ConditionalRender condition={canDeactivateProjects()}>
                                            <button
                                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                                onClick={() => handleEliminar(p.idProyecto)}
                                            >
                                                Desactivar
                                            </button>
                                        </ConditionalRender>
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
