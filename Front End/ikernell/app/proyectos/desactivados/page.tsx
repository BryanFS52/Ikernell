"use client";

import { useEffect, useState} from "react";
import { Proyecto } from "@/types/proyecto";
import { reactivarProyecto } from "@/services/proyecto.service";
import { useRouter } from "next/navigation";
import { getProyectosDesactivados } from "@/services/proyecto.service";

export default function ProyectosDesactivadosPage() {
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        cargarProyectosDesactivados();
    }, []);

    async function cargarProyectosDesactivados() {
        setLoading(true);
        try {
            const data = await getProyectosDesactivados();
            setProyectos(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function handleReactivar(id: number) {
        await reactivarProyecto(id);
        cargarProyectosDesactivados();
    }

    if (loading) {
        return <p className="text-center mt-10">Cargando proyectos desactivados...</p>;
    }

    return (
        <div className="page">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Proyectos desactivados</h1>

                <button
                    onClick={() => router.push("/proyectos")}
                    className="btn-primary"
                >
                    Proyectos activos
                </button>
            </div>

            <table className="custom-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {proyectos.map((proyecto) => (
                        <tr key={proyecto.idProyecto}>
                            <td>{proyecto.idProyecto}</td>
                            <td>{proyecto.nombre}</td>
                            <td>{proyecto.descripcion}</td>
                            <td>
                                <button
                                    onClick={() => handleReactivar(proyecto.idProyecto)}
                                    className="btn-secondary"
                                >
                                    Reactivar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}