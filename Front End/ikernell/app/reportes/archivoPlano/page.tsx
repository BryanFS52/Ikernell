"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    descargarArchivoPlano,
    getArchivoPlanoOptimizado
} from "@/services/reportes.service";
import { Proyecto } from "@/types/proyecto";

export default function ArchivoPlanoPage() {
    const [loading, setLoading] = useState(false);
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [error, setError] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        const cargarProyectos = async () => {
            setLoading(true);
            setError("");
            try {
                const data = await getArchivoPlanoOptimizado();
                console.log("Datos de proyectos cargados:", data);
                setProyectos(data);
            } catch (error) {
                const mensaje = error instanceof Error ? error.message : "Error desconocido";
                console.error("Error al cargar proyectos:", error);
                setError(mensaje);
            } finally {
                setLoading(false);
            }
        };
        cargarProyectos();
    }, []);

    const handleDescargar = async () => {
        setLoading(true);
        setError("");
        try {
            await descargarArchivoPlano();
            alert("Archivo descargado exitosamente");
        } catch (error) {
            const mensaje = error instanceof Error ? error.message : "Error al descargar archivo";
            console.error(error);
            setError(mensaje);
            alert(mensaje);
        } finally {
            setLoading(false);
        }
    };

    const handleRecargar = () => {
        window.location.reload();
    };

    if (loading && proyectos.length === 0) {
        return (
            <div className="page">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-lg">Cargando proyectos para reporte...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="page">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Archivo Plano - Proyectos y Trabajadores</h1>
                <button
                    className="btn-secondary"
                    onClick={() => router.push("/reportes")}
                >
                    ← Volver
                </button>
            </div>

            {/* Mensajes de error */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <strong>Error:</strong> {error}
                    <button
                        onClick={handleRecargar}
                        className="ml-4 text-sm underline hover:no-underline"
                    >
                        Reintentar
                    </button>
                </div>
            )}

            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg border">
                    <h3 className="text-sm font-medium text-blue-800">Total Proyectos</h3>
                    <p className="text-2xl font-bold text-blue-600">{proyectos.length}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border">
                    <h3 className="text-sm font-medium text-purple-800">Formato</h3>
                    <p className="text-lg font-semibold text-purple-600">CSV Brasil</p>
                </div>
            </div>

            {/* Botón de descarga mejorado */}
            <div className="flex gap-3 mb-6">
                <button
                    className="btn-primary flex items-center gap-2"
                    onClick={handleDescargar}
                    disabled={loading || proyectos.length === 0}
                >
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                            Generando...
                        </>
                    ) : (
                        <>
                            Descargar CSV
                        </>
                    )}
                </button>

                <button
                    className="btn-secondary"
                    onClick={handleRecargar}
                    disabled={loading}
                >
                    Actualizar Datos
                </button>
            </div>

            {/* Tabla mejorada */}
            <div className="overflow-x-auto">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>Proyecto</th>
                            <th>Personas Asignadas</th>
                            <th>Fecha Inicio</th>
                            <th>Fecha Fin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proyectos.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-8 text-gray-500">
                                    <div>
                                        <p className="text-lg mb-2">No hay datos disponibles</p>
                                        <p className="text-sm">Verifica la conexión con el servidor</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            proyectos.map((proyecto, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="font-medium">{proyecto.nombre}</td>
                                    <td>
                                        {proyecto.personas && proyecto.personas.length > 0
                                            ? proyecto.personas.map((persona) => persona.nombre).join(", ")
                                            : <span className="text-gray-500 italic">Sin asignar</span>
                                        }
                                    </td>
                                    <td>
                                        {proyecto.fechaInicio
                                            ? new Date(proyecto.fechaInicio).toLocaleDateString('pt-BR')
                                            : <span className="text-gray-400">--</span>
                                        }
                                    </td>
                                    <td>
                                        {proyecto.fechaFin
                                            ? new Date(proyecto.fechaFin).toLocaleDateString('pt-BR')
                                            : <span className="text-gray-400">--</span>
                                        }
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer informativo */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                    <strong>Información:</strong> El archivo CSV se genera con formato brasileño (PT-BR)
                    e incluye datos optimizados para procesamiento empresarial.
                </p>
            </div>
        </div>
    );
}
