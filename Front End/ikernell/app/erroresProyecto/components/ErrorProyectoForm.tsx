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

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        
        if (name === "idPersona") {
            const nuevaPersonaId = Number(value);
            let nuevoProyecto = form.idProyecto;
            
            if (form.idProyecto && value) {
                const proyectoActual = proyectos.find(p => p.idProyecto === Number(form.idProyecto));
                const personaEstaAsignada = proyectoActual?.personas?.some(p => p.idPersona === nuevaPersonaId);
                
                if (!personaEstaAsignada) {
                    nuevoProyecto = "";
                }
            }
            
            setForm({
                ...form,
                [name]: value,
                idProyecto: nuevoProyecto
            });
        }
        else if (name === "idProyecto") {
            const nuevoProyectoId = Number(value);
            let nuevaPersona = form.idPersona;
            
            if (form.idPersona && value) {
                const proyectoNuevo = proyectos.find(p => p.idProyecto === nuevoProyectoId);
                const personaEstaAsignada = proyectoNuevo?.personas?.some(p => p.idPersona === Number(form.idPersona));
                
                if (!personaEstaAsignada) {
                    nuevaPersona = "";
                }
            }
            
            setForm({
                ...form,
                [name]: value,
                idPersona: nuevaPersona
            });
        }
        else {
            setForm({
                ...form,
                [name]: value,
            });
        }
    }

    const proyectosFiltrados = form.idPersona
        ? proyectos.filter(proyecto =>
            proyecto.personas?.some(persona => persona.idPersona === Number(form.idPersona))
        )
        : proyectos;

    const personasFiltradas = form.idProyecto
        ? personas.filter(persona => {
            if (persona.nombre === "Coordinador" && persona.apellido === "Proyectos") return false;
            
            const proyecto = proyectos.find(p => p.idProyecto === Number(form.idProyecto));
            return proyecto?.personas?.some(p => p.idPersona === persona.idPersona);
        })
        : personas.filter(p => !(p.nombre === "Coordinador" && p.apellido === "Proyectos"));

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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Proyecto afectado</label>
                    <select
                        name="idProyecto"
                        value={form.idProyecto}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <option value="">Seleccione el proyecto</option>
                        {proyectosFiltrados.map((proyecto) => (
                            <option key={proyecto.idProyecto} value={proyecto.idProyecto}>
                                {proyecto.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Persona responsable</label>
                    <select
                        name="idPersona"
                        value={form.idPersona}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        <option value="">Seleccione una persona</option>
                        {personasFiltradas.map((persona) => (
                            <option key={persona.idPersona} value={persona.idPersona}>
                                {persona.nombre} {persona.apellido}
                            </option>
                        ))}
                    </select>
                    {form.idProyecto && personasFiltradas.length === 0 && (
                        <p className="text-sm text-amber-600 mt-1">
                            No hay personas asignadas a este proyecto
                        </p>
                    )}
                    {form.idPersona && proyectosFiltrados.length === 0 && (
                        <p className="text-sm text-amber-600 mt-1">
                            Esta persona no está asignada a ningún proyecto
                        </p>
                    )}
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

