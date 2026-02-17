"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { crearProyecto } from "@/services/proyecto.service";

export default function CrearProyectoPage() {
    const router = useRouter();
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        setLoading(true);

        try {
            const nuevoProyecto = {
                nombre,
                descripcion,
                fechaInicio,
                fechaFin,
                estado: true
            };

            await crearProyecto(nuevoProyecto);

            setNombre("");
            setDescripcion("");
            setFechaInicio("");
            setFechaFin("");
            
            router.push("/proyectos");
        } catch (error) {
            console.error("Error al crear el proyecto:", error);
            alert("Error al crear el proyecto. Por favor, intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="page">
            <h1 className="text-2xl font-bold mb-4">Nuevo Proyecto</h1>

            <form onSubmit={handleSubmit} className="form">
                <div className="form-grid-2">
                    <div className="form-field">
                        <label htmlFor="nombre" className="form-label">Nombre del proyecto</label>
                        <input
                            type="text"
                            id="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="Ingrese el nombre del proyecto"
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="fechaInicio" className="form-label">Fecha de inicio</label>
                        <input
                            type="date"
                            id="fechaInicio"
                            value={fechaInicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-field form-field-full">
                        <label htmlFor="descripcion" className="form-label">Descripción del proyecto</label>
                        <textarea
                            id="descripcion"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            placeholder="Ingrese una descripción del proyecto"
                            rows={3}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="fechaFin" className="form-label">Fecha de finalización</label>
                        <input
                            type="date"
                            id="fechaFin"
                            value={fechaFin}
                            onChange={(e) => setFechaFin(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <button className="btn-primary" disabled={loading} style={{marginTop: "auto"}}>
                            {loading ? "Guardando..." : "Crear Proyecto"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}