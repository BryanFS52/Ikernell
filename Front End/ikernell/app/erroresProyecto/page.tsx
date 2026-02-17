"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ErrorProyecto } from "@/types/errorProyecto";
import { getErrorProyectos, eliminarErrorProyecto, desactivarErrorProyecto } from "@/services/errorProyecto.service";
import { handler } from "next/dist/build/templates/app-page";

export default function ErroresProyectoPage() {
    const router = useRouter();
    const [errores, setErrores] = useState<ErrorProyecto[]>([]);
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    useEffect(() => {
        cargarErrores();
    }, []);

    async function cargarErrores() {
        setLoading(true);
        setServerError(null);
        try {
            const data = await getErrorProyectos();
            setErrores(data);
        } catch (error: any) {
            console.error("Error al cargar errores:", error);
            setServerError(error.message || "Error de conexión con el servidor");
            setErrores([]);
        } finally {
            setLoading(false);
        }
    }

    async function handleEliminar(id: number) {
        if (!confirm("¿Estás seguro de que deseas desactivar este error?")) return;
        try {
            await desactivarErrorProyecto(id);
            cargarErrores();
        } catch (error) {
            console.error("Error al eliminar:", error);
        }
    }


    function handleEditar(id: number) {
        router.push(`/erroresProyecto/editar/${id}`);
    }

    if (loading) {
        return <p className="text-center mt-10">Cargando errores</p>;
    }

    return (
        <div className="page">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Errores de Proyectos</h1>
                <div className="flex gap-2">
                    <button
                        onClick={() => router.push("/erroresProyecto/crear")}
                        className="btn-primary"
                    >
                        Nuevo Error
                    </button>
                </div>
            </div>

            <div className="table-container">
                <table className="custom-table">
                <thead>
                    <tr>
                        <th>Tipo de Error</th>
                        <th>Fase</th>
                        <th>Proyecto</th>
                        <th>Responsable</th>
                        <th className="text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {errores.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="text-center py-4 text-gray-500">
                                No hay errores registrados
                            </td>
                        </tr>
                    ) : (
                        errores.map((error) => (
                            <tr key={error.idError}>
                                <td>{error.tipoError}</td>
                                <td>{error.fase}</td>
                                <td>{error.proyecto?.nombre ?? "Sin proyecto"}</td>
                                <td>
                                    {error.persona
                                        ? `${error.persona.nombre} ${error.persona.apellido}`
                                        : "Sin asignar"}
                                </td>
                                <td className="actions">
                                    <button className="btn-edit"
                                    onClick={() => handleEditar(error.idError)}>
                                        Editar
                                    </button>
                                    <button
                                        className="btn-delete"
                                        onClick={() => handleEliminar(error.idError)}
                                    >
                                        Eliminar
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
            