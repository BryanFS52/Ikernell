"use client";

import { useEffect, useState } from "react";
import { Proyecto } from "@/types/proyecto";
import {
    reactivarProyecto,
    getProyectosDesactivados,
} from "@/services/proyecto.service";
import { useRouter } from "next/navigation";

export default function ProyectosDesactivadosPage() {
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        cargarProyectosDesactivados();
    }, []);

    async function cargarProyectosDesactivados() {
        try {
            setLoading(true);
            const data = await getProyectosDesactivados();
            setProyectos(data);
        } catch (error) {
            console.error("Error cargando proyectos:", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleReactivar(id: number) {
        await reactivarProyecto(id);
        cargarProyectosDesactivados();
    }

    if (loading) {
        return (
            <div className="max-w-5xl mx-auto p-6">
                <p className="text-center text-gray-500">
                    Cargando proyectos desactivados...
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

                {/* Header */}
                <div className="flex justify-between items-center px-8 py-6 border-b bg-gray-50">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Proyectos desactivados
                    </h1>

                    <button
                        onClick={() => router.push("/proyectos")}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Ver proyectos activos
                    </button>
                </div>

                {/* Tabla */}
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">Nombre del proyecto</th>
                                <th className="px-6 py-3">Descripción</th>
                                <th className="px-6 py-3 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {proyectos.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="text-center py-6 text-gray-500">
                                        No hay proyectos desactivados
                                    </td>
                                </tr>
                            ) : (
                                proyectos.map((proyecto) => (
                                    <tr key={proyecto.idProyecto} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium">
                                            {proyecto.nombre}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {proyecto.descripcion}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() =>
                                                    handleReactivar(proyecto.idProyecto)
                                                }
                                                className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                                            >
                                                Reactivar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
}
