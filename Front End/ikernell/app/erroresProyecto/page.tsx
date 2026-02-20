"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ErrorProyecto } from "@/types/errorProyecto";
import { getErrorProyectos, eliminarErrorProyecto, desactivarErrorProyecto } from "@/services/errorProyecto.service";
import { handler } from "next/dist/build/templates/app-page";
import { usePermissions } from "@/hooks/usePermissions";
import { ConditionalRender } from "@/components/ConditionalRender";
import { useAuth } from "@/app/context/AuthContext";

export default function ErroresProyectoPage() {
    const router = useRouter();
    const [errores, setErrores] = useState<ErrorProyecto[]>([]);
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const { usuario } = useAuth();
    const {
        canRegisterErrors,
        canViewAllErrors,
        isDesarrollador
    } = usePermissions();

    useEffect(() => {
        cargarErrores();
    }, []);

    async function cargarErrores() {
        setLoading(true);
        setServerError(null);
        try {
            const data = await getErrorProyectos();
            
            let erroresFiltrados = data;
            
            // Si es desarrollador, solo mostrar errores de proyectos donde esté asignado
            if (isDesarrollador() && usuario) {
                erroresFiltrados = data.filter(error => 
                    error.proyecto?.personas?.some(persona => 
                        persona.idPersona === usuario.idPersona
                    )
                );
            }
            
            setErrores(erroresFiltrados);
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
        return <p className="text-center mt-10">Cargando errores...</p>;
    }

    return (
        <div className="max-w-6xl mx-auto p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Errores en proyectos</h1>

                <div className="flex gap-2">
                    <ConditionalRender condition={canRegisterErrors()}>
                        <button
                            onClick={() => router.push("/erroresProyecto/crear")}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Nuevo Error
                        </button>
                    </ConditionalRender>
                </div>
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-xl shadow border overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-blue-900 text-white uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3">Tipo de error</th>
                            <th className="px-6 py-3">Fase</th>
                            <th className="px-6 py-3">Proyecto</th>
                            <th className="px-6 py-3">Responsable</th>
                            <th className="px-6 py-3 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {errores.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-6 text-gray-500">
                                    No hay errores registrados
                                </td>
                            </tr>
                        ) : (
                            errores.map((error) => (
                                <tr key={error.idError} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">{error.tipoError}</td>
                                    <td className="px-6 py-4">{error.fase}</td>
                                    <td className="px-6 py-4">{error.proyecto?.nombre ?? "Sin proyecto"}</td>
                                    <td className="px-6 py-4">{error.persona ? `${error.persona.nombre} ${error.persona.apellido}` : "Sin asignar"}</td>
                                    <td className="px-6 py-4 text-center space-x-2">
                                        <ConditionalRender condition={canViewAllErrors()}>
                                            <button
                                                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                                                onClick={() => handleEditar(error.idError)}
                                            >
                                                Editar
                                            </button>
                                        </ConditionalRender>

                                        <ConditionalRender condition={canViewAllErrors()}>
                                            <button
                                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                                onClick={() => handleEliminar(error.idError)}
                                            >
                                                Eliminar
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
