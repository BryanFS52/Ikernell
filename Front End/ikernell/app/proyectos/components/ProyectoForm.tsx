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
        <form onSubmit={handleSubmit} className="space-y-6">

            {/* Nombre */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre del proyecto
                </label>
                <input
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>

            {/* Descripción */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                </label>
                <textarea
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>

            {/* Fechas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fecha de inicio
                    </label>
                    <input
                        type="date"
                        name="fechaInicio"
                        value={form.fechaInicio}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fecha de finalización
                    </label>
                    <input
                        type="date"
                        name="fechaFin"
                        value={form.fechaFin}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
            </div>

            {/* Botón */}
            <div className="pt-4">
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition shadow"
                >
                    {mode === "crear" ? "Crear Proyecto" : "Actualizar Proyecto"}
                </button>
            </div>

        </form>
    );
}
