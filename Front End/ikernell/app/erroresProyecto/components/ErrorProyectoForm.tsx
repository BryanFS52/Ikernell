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
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
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
        <form onSubmit={handleSubmit} className="space-y-6">

            {/* Tipo de error */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de error</label>
                <input
                    name="tipoError"
                    value={form.tipoError}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>

            {/* Fase */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fase</label>
                <input
                    name="fase"
                    value={form.fase}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>

            {/* Proyecto y persona */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        {proyectos.map((proyecto) => (
                            <option key={proyecto.idProyecto} value={proyecto.idProyecto}>
                                {proyecto.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Responsable</label>
                    <select
                        name="idPersona"
                        value={form.idPersona}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <option value="">Selecciona una persona</option>
                        {personas.map((persona) => (
                            <option key={persona.idPersona} value={persona.idPersona}>
                                {persona.nombre} {persona.apellido}
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
                    {mode === "crear" ? "Registrar error" : "Actualizar error"}
                </button>
            </div>

        </form>
    );
}

