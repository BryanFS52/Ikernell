"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { descargarArchivoPlano, getArchivoPlano } from "@/services/reportes.service";
import { Proyecto } from "@/types/proyecto";

export default function ArchivoPlanoPage() {
    const [loading, setLoading] = useState(false);
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const router = useRouter();

    useEffect(() => {
        const cargarProyectos = async () => {
            try {
                const data = await getArchivoPlano();
                console.log(data);
                setProyectos(data);
            } catch (error) {
                console.error("Error al cargar proyectos:", error);
            }
        };
        cargarProyectos();
    }, []);

    const handleDescargar = async () => {
        setLoading(true);
        try {
            await descargarArchivoPlano();
        } catch (error) {
            console.error(error);
            alert("Hubo un error al descargar el archivo.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p className="mt-6">Generando archivo...</p>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Archivo plano sobre los proyectos</h1>
                <button
                    className="btn-secondary"
                    onClick={() => router.push("/reportes")}
                >
                    Volver
                </button>
            </div>

            <button
                className="btn-primary mb-4"
                onClick={handleDescargar}
                disabled={loading}
            >
                {loading ? "Generando..." : "Descargar Archivo Plano"}
            </button>

            <table className="custom-table">
                <thead>
                    <tr>
                        <th>Proyecto</th>
                        <th>Persona Asignada</th>
                        <th>Fecha de incio</th>
                        <th>Fecha de fin</th>
                    </tr>
                </thead>
                <tbody>
                    {proyectos.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="text-center py-4 text-gray-500">
                                No hay datos disponibles
                            </td>
                        </tr>
                    ) : (
                        proyectos.map((proyecto, index) => (
                            <tr key={index}>
                                <td>{proyecto.nombre}</td>
                                <td>{proyecto.personas ? proyecto.personas.map((persona) => persona.nombre).join(", ") : "No asignada"}</td>
                                <td>{proyecto.fechaInicio ? new Date(proyecto.fechaInicio).toLocaleDateString() : "No disponible"}</td>
                                <td>{proyecto.fechaFin ? new Date(proyecto.fechaFin).toLocaleDateString() : "No disponible"}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
