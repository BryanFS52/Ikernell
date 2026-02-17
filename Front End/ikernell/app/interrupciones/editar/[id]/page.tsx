"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import InterrupcionForm from "../../components/InterrupcionForm";
import { getInterrupcionPorId } from "@/services/interrupcion.service";
import { Interrupcion } from "@/types/interrupcion";

export default function EditarInterrupcionPage() {
    const {id} = useParams();
    const router = useRouter();
    const [interrupcion, setInterrupcion] = useState<Interrupcion | null>(null);

    useEffect(() => {
        if (!id) return;

        const cargarInterrupcion = async () => {
            try {
                const data = await getInterrupcionPorId(Number(id));
                setInterrupcion(data);
            } catch (error) {
                console.error("Error al cargar interrupción:", error);
                router.push("/interrupciones");
            }
        };

        cargarInterrupcion();
    }, [id]);

    if (!interrupcion) return <p>Cargando</p>;

    return (
        <div className="page">
            <h1>Editar Interrupción</h1>
            
            <InterrupcionForm
                mode="editar"
                initialData={interrupcion}
                onSuccess={() => {
                    router.push("/interrupciones");
                }}
            />
        </div>
    );
}