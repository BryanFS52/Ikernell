"use client";

import { useEffect, useState } from "react";
import { getNoticias, eliminarNoticia } from "@/services/noticia.service";
import { Noticia } from "@/types/noticia";
import { useRouter } from "next/navigation";
import { usePermissions } from "@/hooks/usePermissions";

export default function NoticiasPage() {
    const [noticias, setNoticias] = useState<Noticia[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { canViewNews, canCreateNews, canEditNews, canDeleteNews } = usePermissions();

    useEffect(() => {
        cargarNoticias();
    }, []);

    async function cargarNoticias() {
        setLoading(true);
        try {
            const data = await getNoticias();
            setNoticias(data);
        } catch (error) {
            console.error(error);
            setNoticias([]);
        } finally {
            setLoading(false);
        }
    }

    async function handleEliminar(id: number) {
        if (!confirm("¿Deseas eliminar esta noticia?")) return;
        try {
            await eliminarNoticia(id);
            cargarNoticias();
        } catch (error) {
            console.error(error);
            alert("Error al eliminar noticia");
        }
    }

    // Verificar permisos básicos para ver noticias
    if (!canViewNews()) {
        return (
            <div className="page max-w-4xl mx-auto p-6">
                <h1 className="text-2xl font-bold text-red-600">Acceso Denegado</h1>
                <p className="mt-4">No tienes permisos para ver esta página.</p>
            </div>
        );
    }

    return (
        <div className="page max-w-4xl mx-auto p-6">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">Noticias</h1>
                {canCreateNews() && (
                    <button
                        onClick={() => router.push("/noticias/crear")}
                        className="btn-primary"
                    >
                        Nueva Noticia
                    </button>
                )}
            </div>

            {loading ? (
                <p>Cargando noticias...</p>
            ) : noticias.length === 0 ? (
                <p>No hay noticias registradas.</p>
            ) : (
                <div className="space-y-4">
                    {noticias.map((n) => (
                        <div key={n.idNoticia} className="border p-4 rounded shadow-sm">
                            <h2 className="font-semibold text-lg">{n.titulo}</h2>
                            <p className="text-gray-700">{n.contenido}</p>
                            <p className="text-sm text-gray-500">Fecha: {n.fecha}</p>
                            <div className="mt-2 space-x-2">
                                {canEditNews() && (
                                    <button
                                        className="btn-edit"
                                        onClick={() => router.push(`/noticias/editar/${n.idNoticia}`)}
                                    >
                                        Editar
                                    </button>
                                )}
                                {canDeleteNews() && (
                                    <button
                                        className="btn-delete"
                                        onClick={() => handleEliminar(n.idNoticia)}
                                    >
                                        Eliminar
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
