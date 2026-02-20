"use client";

import { useEffect, useState } from "react";
import { crearNoticia, actualizarNoticia } from "@/services/noticia.service";
import { useRouter } from "next/navigation";

export type NoticiaFormProps = {
    initialData?: { idNoticia: number; titulo: string; contenido: string };
    mode: "crear" | "editar";
};

export default function NoticiaForm({
    initialData,
    mode,
}: NoticiaFormProps) {
    const [form, setForm] = useState({
        titulo: "",
        contenido: "",
    });
    const [error, setError] = useState("");
    const [enviando, setEnviando] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (initialData) {
            setForm({
                titulo: initialData.titulo || "",
                contenido: initialData.contenido || "",
            });
        }
    }, [initialData]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value,
        }));
        setError("");
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setEnviando(true);
        setError("");

        try {
            if (mode === "crear") {
                await crearNoticia({
                    titulo: form.titulo,
                    contenido: form.contenido,
                });
            } else {
                await actualizarNoticia(initialData!.idNoticia, {
                    titulo: form.titulo,
                    contenido: form.contenido,
                });
            }
            router.push("/noticias");
        } catch (err: any) {
            setError(err.message || "Error en la operación");
            console.error(err);
        } finally {
            setEnviando(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="p-4 bg-red-100 border border-red-400 rounded-lg">
                    <p className="text-red-700 font-medium">{error}</p>
                </div>
            )}

            {/* Título */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título de la noticia
                </label>
                <input
                    type="text"
                    name="titulo"
                    value={form.titulo}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                    placeholder="Ingresa el título de la noticia"
                />
            </div>

            {/* Contenido */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contenido
                </label>
                <textarea
                    name="contenido"
                    value={form.contenido}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                    placeholder="Escribe el contenido de la noticia"
                />
            </div>

            {/* Botón */}
            <div className="pt-4">
                <button
                    type="submit"
                    disabled={enviando}
                    className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition shadow disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                    {enviando
                        ? "Procesando..."
                        : mode === "crear"
                            ? "Crear Noticia"
                            : "Actualizar Noticia"
                    }
                </button>
            </div>
        </form>
    );
}
