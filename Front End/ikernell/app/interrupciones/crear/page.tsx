"use client";

import InterrupcionForm from "../components/InterrupcionForm";
import { useRouter } from "next/navigation";

export default function CrearInterrupcionPage() {
    const router = useRouter();

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

                {/* Header */}
                <div className="flex justify-between items-center px-8 py-6 border-b bg-gray-50">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Nueva Interrupción</h1>
                        <p className="text-gray-500 text-sm mt-1">Registra una nueva interrupción</p>
                    </div>

                    <button
                        onClick={() => router.push("/interrupciones")}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow"
                    >
                        Volver
                    </button>
                </div>

                {/* Formulario */}
                <div className="p-8">
                    <InterrupcionForm
                        mode="crear"
                        onSuccess={() => {
                            alert("Interrupción creada exitosamente");
                            router.push("/interrupciones");
                        }}
                    />
                </div>

            </div>
        </div>
    );
}
