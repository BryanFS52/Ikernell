"use client";

import PersonaForm from "../components/PersonaForm";
import { useRouter } from "next/navigation";
import { usePermissions } from "@/hooks/usePermissions";

export default function CrearPersonaPage() {
    const router = useRouter();
    const { canCreatePersonas } = usePermissions();

    // Verificar permisos para crear personas
    if (!canCreatePersonas()) {
        return (
            <div className="page">
                <h1 className="text-2xl font-bold text-red-600">Acceso Denegado</h1>
                <p className="mt-4">No tienes permisos para crear personas.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

                {/* Header */}
                <div className="flex justify-between items-center px-8 py-6 border-b bg-gray-50">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Crear Nueva Persona
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Registra una nueva persona en el sistema
                        </p>
                    </div>

                    <button
                        onClick={() => router.back()}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow"
                    >
                        Volver
                    </button>
                </div>

                {/* Formulario */}
                <div className="p-8">
                    <PersonaForm
                        mode="crear"
                        onSuccess={() => {
                            alert("Persona creada exitosamente");
                            router.push("/personas");
                        }}
                    />
                </div>
            </div>
        </div>
    );
}