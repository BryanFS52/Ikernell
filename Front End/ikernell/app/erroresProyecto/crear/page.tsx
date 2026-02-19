"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Proyecto } from "@/types/proyecto";
import { Persona } from "@/types/persona";
import { getProyecto } from "@/services/proyecto.service";
import { getPersonasAsignables } from "@/services/persona.service";
import { crearErrorProyecto } from "@/services/errorProyecto.service";

export default function CrearErrorProyectoPage() {
    const router = useRouter();
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

    async function cargarDatos() {
        try {
            const [proyectosData, personasData] = await Promise.all([
                getProyecto(),
                getPersonasAsignables()
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
        setLoading(true);

        try {
            await crearErrorProyecto({
                tipoError: form.tipoError,
                fase: form.fase,
                idProyecto: Number(form.idProyecto),
                idPersona: Number(form.idPersona)
            });

            alert("Error de proyecto creado exitosamente");
            router.push("/erroresProyecto");
        } catch (error) {
            console.error("Error al crear:", error);
            alert("Error al crear el error de proyecto");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="page">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Nuevo Error en proyecto</h1>
                <button
                    onClick={() => router.push("/erroresProyecto")}
                    className="btn-secondary"
                >
                    Volver
                </button>
            </div>

            <form onSubmit={handleSubmit} className="form">
                <div className="form-grid-2">
                    <div className="form-field">
                        <label htmlFor="tipoError" className="form-label">
                            Tipo de error
                        </label>
                        <input
                            type="text"
                            id="tipoError"
                            name="tipoError"
                            value={form.tipoError}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Describe el tipo de error..."
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="fase" className="form-label">
                            Fase del proyecto
                        </label>
                        <select
                            id="fase"
                            name="fase"
                            value={form.fase}
                            onChange={handleChange}
                            className="form-select"
                            required
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

                    <div className="form-field">
                        <label htmlFor="idProyecto" className="form-label">
                            Proyecto afectado
                        </label>
                        <select
                            id="idProyecto"
                            name="idProyecto"
                            value={form.idProyecto}
                            onChange={handleChange}
                            className="form-select"
                            required
                        >
                            <option value="">Seleccione el proyecto</option>
                            {proyectos.map((proyecto) => (
                                <option key={proyecto.idProyecto} value={proyecto.idProyecto}>
                                    {proyecto.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-field">
                        <label htmlFor="idPersona" className="form-label">
                            Persona responsable
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
                </div>

                <div className="flex gap-3 mt-6">
                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                    >
                        {loading ? "Creando..." : "Crear Error"}
                    </button>
                </div>
            </form>
        </div>
    );
}
