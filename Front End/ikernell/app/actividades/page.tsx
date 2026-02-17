"use client";

import { useEffect, useState } from "react";
import { Actividad } from "@/types/actividad";
import { getActividades, eliminarActividad } from "@/services/actividad.service";
import { useRouter } from "next/navigation";
import { Proyecto } from "@/types/proyecto";
import { getProyecto } from "@/services/proyecto.service";
import { EstadoActividad } from "@/types/actividad";

export default function ActividadesPage() {
    const [actividad, setActividad] = useState<Actividad[]>([]);
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        cargarActividades();
        cargarProyectos();
    }, []);

    async function cargarProyectos() {
        try {
            const data = await getProyecto();
            setProyectos(data);
            console.log("Proyectos cargados:", data);
        } catch (error) {
            console.error("Error al cargar proyectos:", error);
        }
    }

    async function cargarActividades() {
        setLoading(true);
        try {
            const data = await getActividades();
            setActividad(data);

        } catch (error) {
            console.error("Error al cargar actividades:", error);
        } finally {
            setLoading(false);
        }
    }

    function encontrarProyectoDePersona(idPersona: number) {
        const proyecto = proyectos.find(p =>
            p.personas && p.personas.some(persona => persona.idPersona === idPersona)
        );
        return proyecto ? proyecto.nombre : "Sin proyecto";
    }

    async function handleEliminar(id: number) {
        if (!confirm("¿Estás seguro de que deseas eliminar esta actividad?")) return;
        try {
            await eliminarActividad(id);
            cargarActividades();
        } catch (error) {
            console.error("Error al eliminar actividad:", error);
        }
    }

    async function marcarActividadFinalizada(id: number) {
    try {
        const res = await fetch(`http://localhost:8080/api/actividades/${id}/finalizar`, {
            method: 'PUT',
        });
        if (res.ok) {
            cargarActividades();
        } else {
            console.error('Error al finalizar actividad', await res.text());
        }
    } catch (error) {
        console.error("Error al finalizar actividad:", error);
    }
}

    function handleEditar(id: number) {
        router.push(`/actividades/editar/${id}`);
    }

    if (loading) {
        return <p className="text-center mt-10">Cargando actividades</p>;
    }

    return (
        <div className="page">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Actividades</h1>

                <div className="flex gap-2">
                    <button
                        onClick={() => router.push("/actividades/crear")}
                        className="btn-primary"
                    >
                        Nueva Actividad
                    </button>
                </div>
            </div>

            <div className="table-container">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Proyecto</th>
                            <th>Asignado</th>
                            <th>Etapa</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {actividad.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-4 text-gray-500">
                                    No hay actividades registradas
                                </td>
                            </tr>
                        ) : (
                            actividad.map((act) => (
                                <tr key={act.idActividad}>
                                    <td>{act.nombre}</td>

                                    <td>
                                        {act.proyecto?.nombre ??
                                            (act.persona ? encontrarProyectoDePersona(act.persona.idPersona) : "Sin proyecto")}
                                    </td>

                                    <td>
                                        {act.persona
                                            ? `${act.persona.nombre} ${act.persona.apellido}`
                                            : "Sin asignar"}
                                    </td>

                                    <td>{act.estado}</td>

                                    <td className="actions">
                                        <button className="btn-edit" onClick={() => handleEditar(act.idActividad)}>
                                            Editar
                                        </button>
                                        <button className="btn-delete" onClick={() => handleEliminar(act.idActividad)}>
                                            Eliminar
                                        </button>
                                        {act.estado !== EstadoActividad.CIERRE && (
                                            <button
                                                className="btn-complete"
                                                onClick={() => marcarActividadFinalizada(act.idActividad)}
                                            >
                                                Finalizar
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            )))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
