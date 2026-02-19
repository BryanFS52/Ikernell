"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Proyecto } from "@/types/proyecto";
import { Persona } from "@/types/persona";
import { getPersonasAsignables } from "@/services/persona.service";
import { getProyecto, asignarDesarrollador } from "@/services/proyecto.service";


export default function AsignarDesarrolladorPage() {
    const router = useRouter();
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [personas, setPersonas] = useState<Persona[]>([]);
    const [proyectoId, setProyectoId] = useState<number | "">("");
    const [personaId, setPersonaId] = useState<number | "">("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarDatos();
    }, []);

    async function cargarDatos() {
        setLoading(true);
        try {
            const proyectosData = await getProyecto();
            const personasData = await getPersonasAsignables();

            // Filtrar proyectos únicos y válidos
            const proyectosValidos = proyectosData
                .filter((p, index, self) =>
                    p.idProyecto &&
                    typeof p.idProyecto === "number" &&
                    index === self.findIndex(proyecto => proyecto.idProyecto === p.idProyecto)
                );

            // Filtrar personas únicas y válidas
            const personasValidas = personasData
                .filter((p, index, self) =>
                    p.idPersona &&
                    typeof p.idPersona === "number" &&
                    index === self.findIndex(persona => persona.idPersona === p.idPersona)
                );

            setProyectos(proyectosValidos);
            setPersonas(personasValidas);

        } catch (error) {
            console.error("Error al cargar datos:", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleAsignar() {
        if (proyectoId === "" || personaId === "") {
            alert("Por favor, selecciona un proyecto y un desarrollador.");
            return;
        }

        try {
            await asignarDesarrollador(proyectoId, personaId);
            alert("Desarrollador asignado al proyecto exitosamente.");
            setProyectoId("");
            setPersonaId("");
            router.push("/proyectos");
        } catch (error: any) {
            console.error("Error al asignar desarrollador:", error);
            alert(error.message || "Error al asignar desarrollador al proyecto.");
        }
    }

    if (loading) {
        return <p className="text-center mt-10">Cargando datos...</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

                {/* Header */}
                <div className="flex justify-between items-center px-8 py-6 border-b bg-gray-50">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Asignar desarrollador
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Vincula un desarrollador a un proyecto existente
                        </p>
                    </div>

                    <button
                        onClick={() => router.back()}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow"
                    >
                        Volver
                    </button>
                </div>

                {/* Contenido */}
                <div className="p-8 space-y-6">

                    {/* Proyecto */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Proyecto
                        </label>
                        <select
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={proyectoId}
                            onChange={(e) => {
                                const value = e.target.value;
                                setProyectoId(value === "" ? "" : Number(value));
                            }}
                        >
                            <option value="">Seleccione un proyecto</option>
                            {proyectos.map((p) => (
                                <option key={p.idProyecto} value={p.idProyecto}>
                                    {p.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Desarrollador */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Desarrollador
                        </label>
                        <select
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={personaId}
                            onChange={(e) => {
                                const value = e.target.value;
                                setPersonaId(value === "" ? "" : Number(value));
                            }}
                        >
                            <option value="">Seleccione un desarrollador</option>
                            {personas.map((p) => (
                                <option key={p.idPersona} value={p.idPersona}>
                                    {p.nombre} {p.apellido}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Botón */}
                    <div className="pt-4">
                        <button
                            onClick={handleAsignar}
                            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition shadow"
                        >
                            Asignar desarrollador
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

