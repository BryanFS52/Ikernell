"use client";

import { useEffect, useState } from "react";
import { Etapa } from "@/types/etapa";
import { Actividad } from "@/types/actividad";
import { Persona } from "@/types/persona";
import { getPersonasAsignables } from "@/services/persona.service";
import { getEtapas } from "@/services/etapa.service";
import { usePermissions } from "@/hooks/usePermissions";
import { useAuth } from "@/app/context/AuthContext";

export type ActividadFormProps = {
    initialData?: Actividad;
    mode: "crear" | "editar";
    onSuccess: () => void;
};

export default function ActividadForm({
    initialData,
    mode,
    onSuccess,
}: ActividadFormProps) {
    const [personas, setPersonas] = useState<Persona[]>([]);
    const [etapas, setEtapas] = useState<Etapa[]>([]);
    const [loading, setLoading] = useState(false);
    const { usuario } = useAuth();
    const { isDesarrollador, canCompleteAllActivities } = usePermissions();

    const initialForm = {
        nombre: "",
        descripcion: "",
        idPersona: "",
        idEtapa: ""
    };

    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        cargarDatos();
    }, []);

    useEffect(() => {
        if (initialData) {
            setForm({
                nombre: initialData.nombre || "",
                descripcion: initialData.descripcion || "",
                idPersona: initialData.persona ? String(initialData.persona.idPersona) : "",
                idEtapa: initialData.etapa ? String(initialData.etapa.idEtapa) : ""
            });
        }
    }, [initialData]);

    async function cargarDatos() {
        try {
            const [personasData, etapasData] = await Promise.all([
                getPersonasAsignables(),
                getEtapas()
            ]);

            let personasFiltradas = personasData;

            // Si es desarrollador, solo puede asignarse actividades a sí mismo
            // y solo si está asignado a un proyecto
            if (isDesarrollador() && usuario) {
                personasFiltradas = personasData.filter(persona =>
                    persona.idPersona === usuario.idPersona && persona.proyecto
                );
            }

            setPersonas(personasFiltradas);
            setEtapas(etapasData);
        } catch (error) {
            console.error("Error al cargar datos:", error);
        }
    }

    function handleChange(e: any) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            const personaSeleccionada = personas.find(p => p.idPersona === Number(form.idPersona));
            const etapaSeleccionada = etapas.find(e => e.idEtapa === Number(form.idEtapa));

            const payload = {
                nombre: form.nombre,
                descripcion: form.descripcion,
                estado: "INICIACION",
                persona: { idPersona: Number(form.idPersona) },
                etapa: { idEtapa: Number(form.idEtapa) }
            };

            const url = mode === "crear"
                ? "http://localhost:8080/api/actividades"
                : `http://localhost:8080/api/actividades/${initialData?.idActividad}`;

            const method = mode === "crear" ? "POST" : "PUT";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Error al guardar la actividad");
            }

            onSuccess();
        } catch (error) {
            console.error("Error:", error);
            alert("Error al guardar la actividad");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            {isDesarrollador() && personas.length === 0 ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <div className="flex">
                        <div className="text-yellow-600 text-xl mr-3">AVISO</div>
                        <div>
                            <h3 className="font-medium text-yellow-800 mb-1">
                                No puedes crear actividades
                            </h3>
                            <p className="text-yellow-700 text-sm">
                                No estás asignado a ningún proyecto actualmente.
                                Contacta al líder de proyectos para que te asigne a un proyecto.
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre de la actividad
                        </label>
                        <input
                            type="text"
                            name="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Descripción
                        </label>
                        <textarea
                            name="descripcion"
                            value={form.descripcion}
                            onChange={handleChange}
                            rows={3}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Asignar a Persona
                            </label>
                            <select
                                name="idPersona"
                                value={form.idPersona}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                <option value="">Seleccione una persona</option>
                                {personas.map((persona) => (
                                    <option key={persona.idPersona} value={persona.idPersona}>
                                        {persona.nombre} {persona.apellido}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Seleccionar Etapa
                            </label>
                            <select
                                name="idEtapa"
                                value={form.idEtapa}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                <option value="">Seleccione una etapa</option>
                                {etapas.map((etapa) => (
                                    <option key={etapa.idEtapa} value={etapa.idEtapa}>
                                        {etapa.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition shadow"
                        disabled={loading}
                    >
                        {loading
                            ? "Guardando..."
                            : mode === "crear"
                                ? "Crear Actividad"
                                : "Actualizar Actividad"}
                    </button>

                </form>

            )}
        </div>
    );
}