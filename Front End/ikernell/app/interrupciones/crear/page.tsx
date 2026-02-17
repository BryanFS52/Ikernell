"use client";

import { useEffect, useState } from "react";
import { getPersona } from "@/services/persona.service";
import { getProyecto } from "@/services/proyecto.service";
import { crearInterrupcion } from "@/services/interrupcion.service";
import { Persona } from "@/types/persona";
import { Proyecto } from "@/types/proyecto";
import { useRouter } from "next/navigation";

export default function CrearInterrupcionPage() {
    const router = useRouter();

    const [tipo, setTipo] = useState("");
    const [fecha, setFecha] = useState("");
    const [duracion, setDuracion] = useState("");
    const [fase, setFase] = useState("");
    const [idPersona, setIdPersona] = useState("");
    const [idProyecto, setIdProyecto] = useState("");

    const [personas, setPersonas] = useState<Persona[]>([]);
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function cargarDatos() {
            try {
                const personasData = await getPersona();
                const proyectosData = await getProyecto();

                const personasFiltradas = personasData.filter(
                    (p:Persona) =>
                        p.rol?.nombre === "Desarrollador" ||
                        p.rol.nombre === "Líder de Proyecto"
                );

                setPersonas(personasFiltradas);
                setProyectos(proyectosData);
            } catch (error) {
                console.error("Error cargando datos:", error);
            }
        }

        cargarDatos();
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try{
            const nuevaInterrupcion = {
                tipo,
                fecha,
                duracion: parseInt(duracion),
                fase,
                persona: { idPersona: parseInt(idPersona) },
                proyecto: { idProyecto: parseInt(idProyecto) }
            };

            await crearInterrupcion(nuevaInterrupcion);

            router.push("/interrupciones");
        } catch (error) {
            console.error("Error al crear interrupción:", error);
            alert("Error al crear la interrupción. Por favor, intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="page">
            <h1 className="text-2xl font-bold mb-4">Nueva Interrupción</h1>

            <form onSubmit={handleSubmit} className="form">
                <div className="form-grid-2">

                    <div className="form-field">
                        <label className="form-label">Tipo de interrupción</label>
                        <input
                            type="text"
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label className="form-label">Fecha</label>
                        <input
                            type="date"
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label className="form-label">Duración (min)</label>
                        <input
                            type="number"
                            value={duracion}
                            onChange={(e) => setDuracion(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label className="form-label">Fase del Proyecto</label>
                        <select
                            value={fase}
                            onChange={(e) => setFase(e.target.value)}
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
                        <label className="form-label">Responsable</label>
                        <select
                            value={idPersona}
                            onChange={(e) => setIdPersona(e.target.value)}
                            className="form-select"
                            required
                        >
                            <option value="">Seleccione un responsable</option>
                            {personas.map((persona) => (
                                <option
                                    key={persona.idPersona}
                                    value={persona.idPersona}
                                >
                                    {persona.nombre} {persona.apellido}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-field">
                        <label className="form-label">Proyecto</label>
                        <select
                            value={idProyecto}
                            onChange={(e) => setIdProyecto(e.target.value)}
                            className="form-select"
                            required
                        >
                            <option value="">Seleccione un proyecto</option>
                            {proyectos.map((proyecto) => (
                                <option
                                    key={proyecto.idProyecto}
                                    value={proyecto.idProyecto}
                                    >
                                    {proyecto.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <button type="submit" className="btn-primary mt-4">
                    Crear Interrupción
                </button>
            </form>
        </div>
    );
}