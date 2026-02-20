"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ErrorProyectoForm from "../../components/ErrorProyectoForm";
import { ErrorProyecto } from "@/types/errorProyecto";

export default function EditarErrorProyectoPage() {
    const { id } = useParams<{ id: string }>();
    const [errorData, setErrorData] = useState<ErrorProyecto | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (!id) return;

        async function fetchError() {
            try {
                const res = await fetch(`http://localhost:8080/api/errores/${id}`);
                if (!res.ok) throw new Error("Error al cargar el error del proyecto");

                const data = await res.json();
                setErrorData(data);
            } catch (err) {
                console.error(err);
                router.push("/erroresProyecto");
            }
        }

        fetchError();
    }, [id, router]);

    if (!errorData) return <p>Cargando...</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

                {/* Header */}
                <div className="flex justify-between items-center px-8 py-6 border-b bg-gray-50">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Editar Error de Proyecto</h1>
                        <p className="text-gray-500 text-sm mt-1">Modifica la información del error</p>
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
                    <ErrorProyectoForm
                        initialData={errorData}
                        mode="editar"
                        onSuccess={() => {
                            alert("Error actualizado exitosamente");
                            router.push("/erroresProyecto");
                        }}
                    />
                </div>

            </div>
        </div>
    );
}
