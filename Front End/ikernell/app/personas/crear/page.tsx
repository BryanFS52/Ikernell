"use client";

import PersonaForm from "../components/PersonaForm";
import { useRouter } from "next/navigation";

export default function CrearPersonaPage() {
    const router = useRouter();

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