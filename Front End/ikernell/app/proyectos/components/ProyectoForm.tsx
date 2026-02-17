"use client";

import { useEffect, useState } from "react";
import { Proyecto } from "@/types/proyecto";

export type ProyectoFormProps = {
    initialData?: Proyecto;
    mode: "crear" | "editar";
    onSuccess: () => void;
};

export default function ProyectoForm({
    initialData,
    mode,
    onSuccess,
}: ProyectoFormProps) {

    const initialForm = {
        nombre: "",
        descripcion: "",
        fechaInicio: "",
        fechaFin: "",
        estado: true,
    };

    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        if (initialData) {
            setForm({
                nombre: initialData.nombre || "",
                descripcion: initialData.descripcion || "",
                fechaInicio: initialData.fechaInicio || "",
                fechaFin: initialData.fechaFin || "",

                estado: initialData.estado ?? true,
            });
        }
    }, [initialData]);

    function handleChange(e: any) {
        const { name, type, value, checked } = e.target;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const payload = {
            nombre: form.nombre,
            descripcion: form.descripcion,
            fechaInicio: form.fechaInicio,
            fechaFin: form.fechaFin,
            estado: form.estado,
        };

        if (mode === "crear") {
            await fetch("http://localhost:8080/api/proyectos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
        } else {
            await fetch(
                `http://localhost:8080/api/proyectos/${initialData?.idProyecto}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );
        }

        onSuccess();
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <input name="nombre" value={form.nombre} placeholder="Nombre" onChange={handleChange} required
            />

            <input
                name="descripcion" value={form.descripcion} placeholder="Descripción" onChange={handleChange} required
            />

            <input
                type="date" name="fechaInicio" value={form.fechaInicio} onChange={handleChange} required
            />

            <input
                type="date" name="fechaFin" value={form.fechaFin} onChange={handleChange} required
            />

            <label>
                <input type="checkbox" name="estado" checked={form.estado} onChange={handleChange}
                />
                Activo
            </label>

            <button type="submit" className="btn-submit">
                {mode === "crear" ? "Crear Proyecto" : "Actualizar Proyecto"}
            </button>
        </form>
    );
}
