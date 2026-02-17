"use client";

import { useEffect, useState } from "react";
import { ErrorProyecto } from "@/types/errorProyecto";
import { Persona } from "@/types/persona";
import { Proyecto } from "@/types/proyecto";
import { useRouter } from "next/navigation";
import { getProyecto } from "@/services/proyecto.service";
import { crearErrorProyecto, actualizarErrorProyecto } from "@/services/errorProyecto.service";
import { getPersona } from "@/services/persona.service";

export type ErrorProyectoFormProps = {
    initialData?: ErrorProyecto;
    mode: "crear" | "editar";
    onSuccess: () => void;
};

export default function ErrorProyectoForm({
    initialData,
    mode,
    onSuccess
}: ErrorProyectoFormProps) {
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [personas, setPersonas] = useState<Persona[]>([]);
    const [loading, setLoading] = useState(false);

    const initialForm = {
        tipoError: "",
        fase: "",
        idProyecto: "",
        idPersona: ""
    };
    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        cargarDatos();
    }, []);

    useEffect(() => {
        if (initialData) {
            setForm({
                tipoError: initialData.tipoError || "",
                fase: initialData.fase || "",
                idProyecto: initialData.proyecto?.idProyecto?.toString() || "",
                idPersona: initialData.persona?.idPersona?.toString() || ""
            });
        }
    }, [initialData]);

    async function cargarDatos() {
        try {
            const [proyectosData, personasData] = await Promise.all([
                getProyecto(),
                getPersona()
            ]);
            setProyectos(proyectosData);
            setPersonas(personasData);
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

        try {
            if (mode === "crear") {
                await crearErrorProyecto({
                    tipoError: form.tipoError,
                    fase: form.fase,
                    idProyecto: Number(form.idProyecto),
                    idPersona: Number(form.idPersona)
                });
            } else if (mode === "editar" && initialData) {
                await actualizarErrorProyecto(initialData.idError, {
                    tipoError: form.tipoError,
                    fase: form.fase,
                    idProyecto: Number(form.idProyecto),
                    idPersona: Number(form.idPersona)
                });
            }
            onSuccess();
        } catch (error) {
            console.error("Error al guardar el error del proyecto:", error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="form-container flex flex-col gap-4">
            <input
                name="tipo de error" value={form.tipoError} onChange={handleChange} required
            />
            <input
                name="fase" value={form.fase} onChange={handleChange} required
            />

            <select name="idProyecto" value={form.idProyecto} onChange={handleChange} required>
                <option value="">Selecciona un proyecto</option>
                {proyectos.map((proyecto) => (
                    <option key={proyecto.idProyecto} value={proyecto.idProyecto}>
                        {proyecto.nombre}
                    </option>
                ))}
            </select>

            <select name="idPersona" value={form.idPersona} onChange={handleChange} required>
                <option value="">Selecciona una persona</option>
                {personas.map((persona) => (
                    <option key={persona.idPersona} value={persona.idPersona}>
                        {persona.nombre} {persona.apellido}
                    </option>
                ))}
            </select>

            <button type="submit" className="btn-primary">
                {mode === "crear" ? "Crear" : "Guardar"}
            </button>
        </form>
    );
}

