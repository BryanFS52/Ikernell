"use client";

import { useEffect, useState } from "react";
import { Etapa } from "@/types/etapa";
import { Actividad} from "@/types/actividad";
import { Persona } from "@/types/persona";
import { getPersonasAsignables } from "@/services/persona.service";
import { getEtapas } from "@/services/etapa.service";

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
            setPersonas(personasData);
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
                persona: personaSeleccionada,
                etapa: etapaSeleccionada,
                proyecto: personaSeleccionada?.proyecto
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
        <form onSubmit={handleSubmit} className="form">
            <div className="form-grid-2">
                <div className="form-field">
                    <label htmlFor="nombre" className="form-label">
                        Nombre de la actividad
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="descripcion" className="form-label">
                        Descripción
                    </label>
                    <input
                        type="text"
                        id="descripcion"
                        name="descripcion"
                        value={form.descripcion}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="idPersona" className="form-label">
                        Asignar a Persona
                    </label>
                    <select
                        id="idPersona"
                        name="idPersona"
                        value={form.idPersona}
                        onChange={handleChange}
                        className="form-select"
                        required
                    >
                        <option value="">Seleccione una persona</option>
                        {personas.map((persona) => (
                            <option key={persona.idPersona} value={persona.idPersona}>
                                {persona.nombre} {persona.apellido}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-field">
                    <label htmlFor="idEtapa" className="form-label">
                        Seleccionar Etapa
                    </label>
                    <select
                        id="idEtapa"
                        name="idEtapa"
                        value={form.idEtapa}
                        onChange={handleChange}
                        className="form-select"
                        required
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
                className="btn-primary mt-4"
                disabled={loading}
            >
                {loading
                    ? "Guardando..."
                    : mode === "crear"
                        ? "Crear Actividad"
                        : "Actualizar Actividad"
                }
            </button>
        </form>
    );
}