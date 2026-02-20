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
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

                {/* Header */}
                <div className="flex justify-between items-center px-8 py-6 border-b bg-gray-50">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Editar Interrupción</h1>
                        <p className="text-gray-500 text-sm mt-1">Modifica la información de la interrupción</p>
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
                    <InterrupcionForm
                        mode="editar"
                        initialData={interrupcion}
                        onSuccess={() => {
                            alert("Interrupción actualizada exitosamente");
                            router.push("/interrupciones");
                        }}
                    />
                </div>

            </div>
        </div>
    );
}