"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProyectoForm from "../../components/ProyectoForm";

export default function EditarProyectoPage() {
    const { id } = useParams();
    const router = useRouter();
    const [proyecto, setProyecto] = useState<any>(null);

    useEffect(() => {
        if (!id) return;

        fetch(`http://localhost:8080/api/proyectos/${id}`)
            .then((res) => res.json())
            .then((data) => setProyecto(data));
    }, [id]);

    if (!proyecto) return <p>Cargando</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

                {/* Header */}
                <div className="flex justify-between items-center px-8 py-6 border-b bg-gray-50">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Editar Proyecto
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Modifica la información del proyecto
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
                    <ProyectoForm
                        mode="editar"
                        initialData={proyecto}
                        onSuccess={() => {
                            alert("Proyecto actualizado exitosamente");
                            router.push("/proyectos");
                        }}
                    />
                </div>

            </div>
        </div>
    );
}