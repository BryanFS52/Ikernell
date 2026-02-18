"use client";

import { useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import { Proyecto } from "@/types/proyecto";
import { getProyecto, desactivarProyecto } from "@/services/proyecto.service";
import { Persona } from "@/types/persona";
import { usePermissions } from "@/hooks/usePermissions";
import { ConditionalRender } from "@/components/ConditionalRender";
import { useAuth } from "@/app/context/AuthContext";

export default function ProyectosPage() {
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { usuario } = useAuth();
    const {
        canCreateProjects,
        canAssignDevelopers,
        canDeactivateProjects,
        canViewAllProjects,
        canViewAssignedProjectsOnly,
        isDesarrollador
    } = usePermissions();
    
    useEffect(() => {
        cargarProyectos();
    }, []);

    async function cargarProyectos() {
        setLoading(true);
        try {
            console.log("Cargando proyectos...");
            const data = await getProyecto();
            console.log("Proyectos cargados:", data);
            
            let proyectosFiltrados = data;
            
            // Si es desarrollador, solo mostrar proyectos asignados
            if (isDesarrollador() && usuario) {
                proyectosFiltrados = data.filter(proyecto => 
                    proyecto.personas?.some(persona => 
                        persona.idPersona === usuario.idPersona
                    )
                );
            }
            
            const uniqueProyectos = proyectosFiltrados.filter((p, index, self) =>
                index === self.findIndex((t) => (
                    t.idProyecto === p.idProyecto
                ))
            );
            console.log("Proyectos únicos filtrados:", uniqueProyectos);
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

    if (loading) {
        return <p className="text-center mt-10">Cargando proyectos...</p>;
    }

    return (
        <div className="page">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold mr-4">Proyectos</h1>
                
                <div className="flex gap-2">
                    <ConditionalRender condition={canCreateProjects()}>
                        <button
                            onClick={() => router.push("/proyectos/crear")}
                            className="btn-primary"
                        >
                            Nuevo proyecto
                        </button>
                    </ConditionalRender>
                    
                    <ConditionalRender condition={canViewAllProjects()}>
                        <button
                            onClick={() => router.push("/proyectos/desactivados")}
                            className="btn-secondary"
                        >
                            Proyectos desactivados
                        </button>
                    </ConditionalRender>
                    
                    <ConditionalRender condition={canAssignDevelopers()}>
                        <button
                            onClick={() => router.push("/proyectos/asignar")}
                            className="btn-secondary"
                        >
                            Asignar desarrollador
                        </button>
                    </ConditionalRender>
                </div>
            </div>

            <div className="table-container">
            <table className="custom-table" >
                <thead>
                    <tr>
                        <th>Nombre del proyecto</th>
                        <th>Desarrollador</th>
                        <th>Fecha inicio</th>
                        <th>Fecha fin</th>
                        <th className="text-center">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {proyectos.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="text-center py-4 text-gray-500">
                                No hay proyectos registrados
                            </td>
                        </tr>
                    ) : (
                        proyectos.map((p) => (
                            <tr key={p.idProyecto ?? `${p.nombre}-${p.fechaInicio}`}>
                                <td>{p.nombre}</td>
                                <td>{p.personas && p.personas.length > 0 ? `${p.personas[0].nombre} ${p.personas[0].apellido}` : "No asignado"}</td>
                                <td>{new Date(p.fechaInicio).toLocaleDateString()}</td>
                                <td>{p.fechaFin ? new Date(p.fechaFin).toLocaleDateString() : "No especificada"}</td>
                                <td className="actions">
                                    <button
                                        className="btn-view"
                                        onClick={() => router.push(`/proyectos/ver/${p.idProyecto}`)}
                                    >
                                        Ver
                                    </button>
                                    
                                    <ConditionalRender condition={canCreateProjects()}>
                                        <button
                                            className="btn-edit"
                                            onClick={() => handleEditar(p.idProyecto)}
                                        >
                                            Editar
                                        </button>
                                    </ConditionalRender>
                                    
                                    <ConditionalRender condition={canDeactivateProjects()}>
                                        <button
                                            className="btn-delete"
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
