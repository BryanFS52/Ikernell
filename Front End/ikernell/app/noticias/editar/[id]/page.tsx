"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getNoticias } from "@/services/noticia.service";
import { Noticia } from "@/types/noticia";
import NoticiaForm from "../../components/NoticiaForm";

export default function EditarNoticiaPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [noticia, setNoticia] = useState<Noticia | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) cargarNoticia();
    }, [id]);

    async function cargarNoticia() {
        try {
            const noticias = await getNoticias();
            const n = noticias.find((n) => n.idNoticia === Number(id));
            if (!n) throw new Error("Noticia no encontrada");
            setNoticia(n);
        } catch (error) {
            console.error(error);
            alert("No se pudo cargar la noticia");
            router.push("/noticias");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto p-6 text-center">
                <p className="text-gray-500">Cargando noticia...</p>
            </div>
        );
    }

    if (!noticia) {
        return (
            <div className="max-w-6xl mx-auto p-6">
                <p className="text-red-600">Noticia no encontrada</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
            <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Editar Noticia</h1>
                    <button
                        onClick={() => router.push("/noticias")}
                        className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                    >
                        Volver
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8">
                    <NoticiaForm
                        initialData={{
                            idNoticia: noticia.idNoticia,
                            titulo: noticia.titulo,
                            contenido: noticia.contenido,
                        }}
                        mode="editar"
                    />
                </div>
            </div>
        </div>
    );
}
