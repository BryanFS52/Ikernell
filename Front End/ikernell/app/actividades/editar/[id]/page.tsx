"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ActividadForm from "../../components/ActividadForm";
import { Actividad } from "@/types/actividad";

export default function EditarActividadPage() {
    const { id } = useParams();
    const router = useRouter();
    const [actividad, setActividad] = useState<Actividad | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        cargarActividad();
    }, [id]);

    async function cargarActividad() {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8080/api/actividades/${id}`);
            
            if (!response.ok) {
                throw new Error("Error al cargar la actividad");
            }
            
            const data = await response.json();
            setActividad(data);
        } catch (error) {
            console.error("Error al cargar actividad:", error);
            setError("Error al cargar la actividad");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="page">
                <p className="text-center mt-10">Cargando actividad...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page">
                <div className="flex flex-col items-center mt-10">
                    <p className="text-red-500 mb-4">{error}</p>
                    <button
                        onClick={() => router.push("/actividades")}
                        className="btn-secondary"
                    >
                        Volver a Actividades
                    </button>
                </div>
            </div>
        );
    }

    if (!actividad) {
        return (
            <div className="page">
                <p className="text-center mt-10">Actividad no encontrada</p>
            </div>
        );
    }

    return (
        <div className="page">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Editar Actividad</h1>
                <button
                    onClick={() => router.push("/actividades")}
                    className="btn-secondary"
                >
                    Volver
                </button>
            </div>

            <ActividadForm
                mode="editar"
                initialData={actividad}
                onSuccess={() => {
                    alert("Actividad actualizada exitosamente");
                    router.push("/actividades");
                }}
            />
        </div>
    );
}