"use client";

import { useRouter } from "next/navigation";
import ErrorProyectoForm from "../components/ErrorProyectoForm";

export default function CrearErrorProyectoPage() {
    const router = useRouter();

    function handleSuccess() {
        router.push("/erroresProyecto");
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Nuevo Error en proyecto</h1>
                    <button
                        onClick={() => router.push("/erroresProyecto")}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow"
                    >
                        Volver
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <ErrorProyectoForm
                        mode="crear"
                        onSuccess={handleSuccess}
                    />
                </div>
            </div>
        </div>
    );
}
