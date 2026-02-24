"use client";

import { useEffect, useState } from "react";
import { getNoticias, eliminarNoticia } from "@/services/noticia.service";
import { Noticia } from "@/types/noticia";
import { useRouter } from "next/navigation";
import { usePermissions } from "@/hooks/usePermissions";

export default function NoticiasPage() {
    const [noticias, setNoticias] = useState<Noticia[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTitulo, setSearchTitulo] = useState("");
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
        if (!confirm("¿Estás seguro de que deseas eliminar esta noticia?")) return;
        try {
            await eliminarNoticia(id);
            cargarNoticias();
        } catch (error) {
            console.error(error);
            alert("Error al eliminar noticia");
        }
    }

    const noticiasFiltradas = noticias.filter(n =>
        n.titulo.toLowerCase().includes(searchTitulo.toLowerCase())
    );

    // Verificar permisos básicos para ver noticias
    if (!canViewNews()) {
        return (
            <div className="max-w-6xl mx-auto p-6">
                <h1 className="text-2xl font-bold text-red-600">Acceso Denegado</h1>
                <p className="mt-4">No tienes permisos para ver esta página.</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Noticias</h1>
                {canCreateNews() && (
                    <button
                        onClick={() => router.push("/noticias/crear")}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Nueva noticia
                    </button>
                )}
            </div>

            {/* Barra de búsqueda */}
            {!loading && noticias.length > 0 && (
                <div className="bg-white p-4 rounded-xl shadow border mb-6">
                    <input
                        type="text"
                        placeholder="Buscar por título"
                        value={searchTitulo}
                        onChange={(e) => setSearchTitulo(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
            )}

            {/* Contenido */}
            {loading ? (
                <div className="text-center py-12">
                    <p className="text-gray-500">Cargando noticias...</p>
                </div>
            ) : noticiasFiltradas.length === 0 ? (
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                    <p className="text-gray-500">No hay noticias registradas.</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Título</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Fecha</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {noticiasFiltradas.map((noticia) => (
                                <tr key={noticia.idNoticia} className="border-b border-gray-200 hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-medium text-gray-900">{noticia.titulo}</p>
                                            <p className="text-sm text-gray-600 line-clamp-1">{noticia.contenido}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {new Date(noticia.fecha).toLocaleDateString('es-CO')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            {canEditNews() && (
                                                <button
                                                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                                                    onClick={() => router.push(`/noticias/editar/${noticia.idNoticia}`)}
                                                >
                                                    Editar
                                                </button>
                                            )}
                                            {canDeleteNews() && (
                                                <button
                                                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                                                    onClick={() => handleEliminar(noticia.idNoticia)}
                                                >
                                                    Eliminar
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
