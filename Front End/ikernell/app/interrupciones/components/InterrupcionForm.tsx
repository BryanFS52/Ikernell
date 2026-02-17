"use client";

import { useEffect, useState } from "react";
import { Persona } from "@/types/persona";
import { Proyecto } from "@/types/proyecto";
import { Interrupcion } from "@/types/interrupcion";
import { useRouter } from "next/navigation";
import { crearInterrupcion, actualizarInterrupcion } from "@/services/interrupcion.service";

export type InterrupcionFormProps = {
    initialData?: Interrupcion;
    mode: "crear" | "editar";
    onSuccess: () => void;
};

export default function InterrupcionForm({
    initialData,
    mode,
    onSuccess
}: InterrupcionFormProps) {
    const [personas, setPersonas] = useState<Persona[]>([]);
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const router = useRouter();

    const initialForm = {
        tipo: "",
        fecha: "",
        duracion: "",
        fase: "",
        idPersona: "",
        idProyecto: ""
    };

    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        cargarDatos();
    }, []);

    useEffect(() => {
        if (initialData) {
            setForm({
                tipo: initialData.tipo || "",
                fecha: initialData.fecha || "",
                duracion: initialData.duracion || "",
                fase: initialData.fase || "",
                idPersona: initialData.persona?.idPersona?.toString() || "",
                idProyecto: initialData.proyecto?.idProyecto?.toString() || "",
            });
        }
    }, [initialData]);

    async function cargarDatos() {
        try {
            const [personasData, proyectosData] = await Promise.all([
                fetch("/api/personas/asignables").then(res => res.json()),
                fetch("/api/proyectos").then(res => res.json())
            ]);
            setPersonas(personasData);
            setProyectos(proyectosData);
        } catch (error) {
            console.error("Error al cargar datos:", error);
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!form.tipo || !form.fecha || !form.duracion || !form.fase || !form.idPersona || !form.idProyecto) {
            alert("Por favor completa todos los campos");
            return;
        }

        const payload = {
            tipo: form.tipo,
            fecha: form.fecha,
            duracion: form.duracion,
            fase: form.fase,
            idPersona: Number(form.idPersona),
            idProyecto: Number(form.idProyecto),
        };

        try {
            if (mode === "crear") {
                await crearInterrupcion(payload);
            } else if (mode === "editar" && initialData) {
                await actualizarInterrupcion(initialData.idInterrupcion, payload);
            }
            onSuccess();
        } catch (error) {
            console.error("Error al guardar interrupción:", error);
            alert("Ocurrió un error al guardar la interrupción. Por favor intenta nuevamente.");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="form-container flex flex-col gap-4">
            <input
                name="tipo" value={form.tipo} placeholder="Tipo" onChange={handleChange} required
            />
            <input
                type="date" name="fecha" value={form.fecha} onChange={handleChange} required
            />
            <input
                name="duracion" value={form.duracion} placeholder="Duración (minutos)" onChange={handleChange} type="number" required
            />
            <input
                name="fase" value={form.fase} placeholder="Fase del proyecto" onChange={handleChange} required
            />

            <select name="idPersona" value={form.idPersona} onChange={handleChange} required>
                <option value="">Selecciona un responsable</option>
                {personas.map(p => (
                    <option key={p.idPersona} value={p.idPersona}>
                        {p.nombre} {p.apellido}
                    </option>
                ))}
            </select>

            <select name="idProyecto" value={form.idProyecto} onChange={handleChange} required>
                <option value="">Selecciona un proyecto</option>
                {proyectos.map(p => (
                    <option key={p.idProyecto} value={p.idProyecto}>
                        {p.nombre}
                    </option>
                ))}
            </select>

            <button type="submit" className="btn-primary">
                {mode === "crear" ? "Crear Interrupción" : "Actualizar Interrupción"}
            </button>
        </form>
    );
}
