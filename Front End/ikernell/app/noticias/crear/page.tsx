"use client";

import { useState } from "react";
import { crearNoticia } from "@/services/noticia.service";
import { useRouter } from "next/navigation";

export default function CrearNoticiaPage() {
    const [titulo, setTitulo] = useState("");
    const [contenido, setContenido] = useState("");
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!titulo || !contenido) {
            alert("Complete los campos");
            return;
        }

        try {
            await crearNoticia({ titulo, contenido });
            alert("Noticia creada correctamente");
            router.push("/noticias");
        } catch (error) {
            console.error(error);
            alert("Error al crear noticia");
        }
    }

    return (
        <div className="page max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Crear Noticia</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="input"
                    required
                />
                <textarea
                    placeholder="Contenido"
                    value={contenido}
                    onChange={(e) => setContenido(e.target.value)}
                    className="input"
                    required
                />
                <button type="submit" className="btn-primary">Crear</button>
            </form>
        </div>
    );
}
