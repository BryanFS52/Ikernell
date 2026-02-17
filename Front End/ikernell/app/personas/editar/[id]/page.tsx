"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PersonaForm from "../../components/PersonaForm";
import { getPersonaPorId } from "@/services/persona.service";
import { Persona } from "@/types/persona";

export default function EditarPersonaPage() {
    const {id} = useParams();
    const router = useRouter();
    const [persona, setPersona] = useState<Persona | null>(null);

    useEffect(() => {
        if (!id) return;

        const cargarPersona = async () => {
            try {
                const data = await getPersonaPorId(Number(id));
                setPersona(data);
            } catch (error) {
                console.error("Error al cargar persona:", error);
                router.push("/personas");
            }
        };

        cargarPersona();
    }, [id]);

    if (!persona) return <p>Cargando</p>;

    return (
        <div className="page">
            <h1>Editar Persona</h1>
            
            <PersonaForm
                mode="editar"
                initialData={persona}
                onSuccess={() => {
                    router.push("/personas");
                }}
            />
        </div>
    );
}

