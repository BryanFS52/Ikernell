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
        <div className="page">
            <h1 className="text-2xl font-bold mb-4">Crear Nueva Persona</h1>

            <PersonaForm
                mode="crear"
                onSuccess={() => {
                    alert("Persona creada exitosamente");
                    router.push("/personas");
                }}
            />
        </div>
    );
}