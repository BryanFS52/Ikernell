"use client";

import { useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import { Proyecto } from "@/types/proyecto";
import { getProyecto, desactivarProyecto } from "@/services/proyecto.service";
import { Persona } from "@/types/persona";

export default function ProyectosPage() {
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        cargarProyectos();
    }, []);

    async function cargarProyectos() {
        setLoading(true);
        try {
            console.log("Cargando proyectos...");
            const data = await getProyecto();
            console.log("Proyectos cargados:", data);
            const uniqueProyectos = data.filter((p, index, self) =>
                index === self.findIndex((t) => (
                    t.idProyecto === p.idProyecto
                ))
            );
            console.log("Proyectos únicos:", uniqueProyectos);
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

                <button
                    onClick={() => router.push("/proyectos/crear")}
                    className="btn-primary"
                >
                    Nuevo Proyecto
                </button>
                <button
                    onClick={() => router.push("/proyectos/desactivados")}
                    className="btn-secondary"
                >
                    Proyectos Desactivados
                </button>
                <button
                    onClick={() => router.push("/proyectos/asignar")}
                    className="btn-secondary"
                >
                    Asignar Desarrollador
                </button>
            </div>

            <div className="table-container">
            <table className="custom-table" >
                <thead>
                    <tr>
                        <th>Nombre del proyecto</th>
                        <th>Desarrollador</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
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
                                    <button
                                        className="btn-edit"
                                        onClick={() => handleEditar(p.idProyecto)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn-delete"
                                        onClick={() => handleEliminar(p.idProyecto)}
                                    >
                                        Desactivar
                                    </button>
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
