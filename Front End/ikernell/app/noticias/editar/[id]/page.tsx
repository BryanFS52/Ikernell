"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getNoticias, actualizarNoticia } from "@/services/noticia.service";
import { Noticia } from "@/types/noticia";

export default function EditarNoticiaPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [noticia, setNoticia] = useState<Noticia | null>(null);
    const [titulo, setTitulo] = useState("");
    const [contenido, setContenido] = useState("");

    useEffect(() => {
        if (id) cargarNoticia();
    }, [id]);

    async function cargarNoticia() {
        try {
            const noticias = await getNoticias();
            const n = noticias.find((n) => n.idNoticia === Number(id));
            if (!n) throw new Error("Noticia no encontrada");
            setNoticia(n);
            setTitulo(n.titulo);
            setContenido(n.contenido);
        } catch (error) {
            console.error(error);
            alert("No se pudo cargar la noticia");
            router.push("/noticias");
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!titulo || !contenido) return;

        try {
            await actualizarNoticia(Number(id), { titulo, contenido });
            alert("Noticia actualizada");
            router.push("/noticias");
        } catch (error) {
            console.error(error);
            alert("Error al actualizar noticia");
        }
    }

    if (!noticia) return <p>Cargando...</p>;

    return (
        <div className="page max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Editar Noticia</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="input"
                    required
                />
                <textarea
                    value={contenido}
                    onChange={(e) => setContenido(e.target.value)}
                    className="input"
                    required
                />
                <button type="submit" className="btn-primary">Guardar</button>
            </form>
        </div>
    );
}
