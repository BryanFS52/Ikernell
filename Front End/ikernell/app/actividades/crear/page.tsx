"use client";

import { useEffect, useState } from "react";
import { getPersona, getPersonasAsignables } from "@/services/persona.service"
import { Persona } from "@/types/persona"
import { useRouter } from "next/navigation";
import { getEtapas } from "@/services/etapa.service";
import { Etapa } from "@/types/etapa";

export default function CrearActividadPage() {
    const [personas, setPersonas] = useState<Persona[]>([]);
    const [etapas, setEtapas] = useState<Etapa[]>([]);
    const router = useRouter();
    const initialForm = {
        nombre: "",
        descripcion: "",
        idPersona: "",
        idEtapa: ""
    }
    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        console.log("=== DEBUGGING PERSONAS ===");
        
        getPersona().then(data => {
            console.log("getPersona() retorna:", data);
        });
        
        getPersonasAsignables().then(data => {
            console.log("getPersonasAsignables() retorna:", data);
            setPersonas(data);
        }).catch(error => {
            console.error("Error con getPersonasAsignables:", error);
            getPersona().then(data => {
                console.log("Usando getPersona() como fallback:", data);
                setPersonas(data);
            });
        });

        getEtapas().then(data => {
            console.log("Etapas cargadas:", data);
            setEtapas(data);
        });
    }, []);

    function handleChange(e: any) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

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

        console.log("Persona seleccionada:", personaSeleccionada);
        console.log("Proyecto de la persona:", personaSeleccionada?.proyecto);
        console.log("Payload a enviar:", payload);

        await fetch("http://localhost:8080/api/actividades", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        setForm(initialForm);

        router.push("/actividades");

        alert("Actividad creada exitosamente");
    }

    return (
        <div className="page">
            <h1 className="text-2xl font-bold mb-4">Nueva Actividad</h1>

            <form onSubmit={handleSubmit} className="form">
                <div className="form-grid-2">
                    <div className="form-field">
                        <label htmlFor="nombre" className="form-label">Nombre de la actividad</label>
                        <input
                            type="text"
                            id="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            name="nombre"
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="descripcion" className="form-label">Descripción</label>
                        <input
                            type="text"
                            id="descripcion"
                            value={form.descripcion}
                            onChange={handleChange}
                            name="descripcion"
                            className="form-input"
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="idPersona" className="form-label">Asignar a Persona</label>
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

                <button type="submit" className="btn-primary mt-4">
                    Crear Actividad
                </button>
            </form>
        </div>
    );
}