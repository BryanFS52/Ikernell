"use client";

import { useRouter } from "next/navigation";
import { usePermissions } from "@/hooks/usePermissions";
import NoticiaForm from "../components/NoticiaForm";

export default function CrearNoticiaPage() {
    const router = useRouter();
    const { canCreateNews } = usePermissions();

    // Verificar permisos para crear noticias
    if (!canCreateNews()) {
        return (
            <div className="max-w-6xl mx-auto p-6">
                <h1 className="text-2xl font-bold text-red-600">Acceso Denegado</h1>
                <p className="mt-4">No tienes permisos para crear noticias.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
            <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Crear Noticia</h1>
                    <button
                        onClick={() => router.push("/noticias")}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow"
                    >
                        Volver
                    </button>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <NoticiaForm mode="crear" />
                </div>
            </div>
        </div>
    );
}
