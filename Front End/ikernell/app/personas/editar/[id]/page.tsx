"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PersonaForm from "../../components/PersonaForm";
import { getPersonaPorId } from "@/services/persona.service";
import { Persona } from "@/types/persona";

export default function EditarPersonaPage() {
    const { id } = useParams();
    const router = useRouter();
    const [persona, setPersona] = useState<Persona | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const cargarPersona = async () => {
            try {
                const data = await getPersonaPorId(Number(id));
                setPersona(data);
            } catch (error) {
                console.error("Error al cargar persona:", error);
                router.push("/personas");
            } finally {
                setLoading(false);
            }
        };

        cargarPersona();
    }, [id]);

    if (loading) return <p className="text-center mt-10">Cargando persona...</p>;
    if (!persona) return <p className="text-center mt-10">Persona no encontrada.</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

                {/* Header */}
                <div className="flex justify-between items-center px-8 py-6 border-b bg-gray-50">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Editar Persona
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Modifica la información de la persona
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
                        mode="editar"
                        initialData={persona}
                        onSuccess={() => router.push("/personas")}
                    />
                </div>
            </div>
        </div>
    );
}
