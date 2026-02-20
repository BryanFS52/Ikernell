"use client";

import { useEffect, useState } from "react";
import { Persona } from "@/types/persona";
import { Proyecto } from "@/types/proyecto";
import { Interrupcion } from "@/types/interrupcion";
import { useRouter } from "next/navigation";
import { crearInterrupcion, actualizarInterrupcion } from "@/services/interrupcion.service";
import { getPersona } from "@/services/persona.service";
import { getProyecto } from "@/services/proyecto.service";

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
                getPersona(),
                getProyecto(),
            ]);
            setPersonas(personasData);
            setProyectos(proyectosData);
        } catch (error) {
            console.error("Error al cargar datos:", error);
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
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
            duracion: Number(form.duracion),
            fase: form.fase,
            persona: { idPersona: Number(form.idPersona) },
            proyecto: { idProyecto: Number(form.idProyecto) },
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
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("Ocurrió un error al guardar la interrupción. Por favor intenta nuevamente.");
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de interrupción</label>
                <input
                    name="tipo"
                    value={form.tipo}
                    placeholder="Tipo"
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                    <input
                        type="date"
                        name="fecha"
                        value={form.fecha}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duración (min)</label>
                    <input
                        name="duracion"
                        value={form.duracion}
                        placeholder="Duración (minutos)"
                        onChange={handleChange}
                        type="number"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fase</label>
                <select
                    name="fase"
                    value={form.fase}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                    <option value="">Seleccione una fase</option>
                    <option value="Planificacion">Planificación</option>
                    <option value="Analisis">Análisis</option>
                    <option value="Diseno">Diseño</option>
                    <option value="Desarrollo">Desarrollo</option>
                    <option value="Pruebas">Pruebas</option>
                    <option value="Implementacion">Implementación</option>
                    <option value="Mantenimiento">Mantenimiento</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Responsable</label>
                    <select
                        name="idPersona"
                        value={form.idPersona}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <option value="">Selecciona un responsable</option>
                        {personas.map(p => (
                            <option key={p.idPersona} value={p.idPersona}>
                                {p.nombre} {p.apellido}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Proyecto</label>
                    <select
                        name="idProyecto"
                        value={form.idProyecto}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <option value="">Selecciona un proyecto</option>
                        {proyectos.map(p => (
                            <option key={p.idProyecto} value={p.idProyecto}>
                                {p.nombre}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="pt-4">
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition shadow"
                >
                    {mode === "crear" ? "Crear Interrupción" : "Actualizar Interrupción"}
                </button>
            </div>
        </form>
    );
}
