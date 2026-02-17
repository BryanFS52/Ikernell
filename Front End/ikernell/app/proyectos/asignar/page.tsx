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
        <div className="page max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">
                Asignar Desarrolladores a Proyectos
            </h1>

            <div className="mb-4">
                <label className="block mb-1 font-medium">Proyecto</label>
                <select
                    className="w-full border rounded p-2"
                    value={proyectoId}
                    onChange={(e) => {
                        const value = e.target.value;
                        setProyectoId(value === "" ? "" : Number(value))
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

            <div className="mb-6">
                <label className="block mb-1 font-medium">Desarrollador</label>
                <select
                    className="w-full border rounded p-2"
                    value={personaId}
                    onChange={(e) => {
                        const value = e.target.value;
                        setPersonaId(value === "" ? "" : Number(value))
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

            <button
                onClick={handleAsignar} className="btn-primary w-full"
            >
                Asignar
            </button>
        </div>
    );
}

