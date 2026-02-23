"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { verPersona, getProyectosDePersona } from "@/services/persona.service";
import { Persona } from "@/types/persona";
import { Proyecto } from "@/types/proyecto";

export default function VerPersonaPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [persona, setPersona] = useState<Persona | null>(null);
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            cargarPersona();
        }
    }, [id]);

    async function cargarPersona() {
        if (!id) return;

        setLoading(true);
        try {
            // Cargar datos de persona
            const personaData = await verPersona(Number(id));
            console.log("Datos de persona recibidos:", personaData);
            setPersona(personaData);

            // Cargar proyectos de la persona
            const proyectosData = await getProyectosDePersona(Number(id));
            console.log("Proyectos de persona recibidos:", proyectosData);
            setProyectos(proyectosData || []);
        } catch (error) {
            console.error("Error al cargar persona:", error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <p className="text-center mt-10">Cargando proyectos</p>;
    }

    if (!persona) {
        return <p className="text-center mt-10">Persona no encontrada.</p>
    }

    return (
        <div className="page max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

                {/* Header */}
                <div className="px-8 py-6 border-b bg-gray-50">
                    <div className="flex justify-between items-start flex-wrap gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">
                                {persona.nombre} {persona.apellido}
                            </h1>
                            <p className="text-gray-500 mt-1">
                                Detalles de la persona
                            </p>
                        </div>

                        <div className="flex flex-col items-end gap-3">
                            <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${persona.estado
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                    }`}
                            >
                                {persona.estado ? "Activo" : "Inactivo"}
                            </span>

                            <button
                                onClick={() => router.back()}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                            >
                                Volver
                            </button>
                        </div>
                    </div>
                </div>

                {/* Contenido */}
                <div className="p-8 space-y-8">

                    {/* Foto */}
                    {persona.foto && (
                        <div className="flex justify-center mb-6">
                            <img
                                src={persona.foto}
                                alt={`${persona.nombre}`}
                                className="w-28 h-28 object-cover rounded-full border shadow"
                            />
                        </div>
                    )}

                    {/* Información básica */}
                    <section>
                        <h3 className="text-xl font-semibold mb-4 border-b pb-2">Información básica</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <p className="font-semibold">Documento</p>
                                <p className="text-gray-700">{persona.documento || "No especificado"}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Fecha de Nacimiento</p>
                                <p className="text-gray-700">{persona.fechaNacimiento ? new Date(persona.fechaNacimiento).toLocaleDateString() : "No especificada"}</p>
                            </div>
                        </div>
                    </section>

                    {/* Contacto */}
                    <section>
                        <h3 className="text-xl font-semibold mb-4 border-b pb-2">Contacto</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <p className="font-semibold">Correo electrónico</p>
                                <p className="text-gray-700">{persona.correo || "No especificado"}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Dirección</p>
                                <p className="text-gray-700">{persona.direccion || "No especificada"}</p>
                            </div>
                        </div>
                    </section>

                    {/* Profesional */}
                    <section>
                        <h3 className="text-xl font-semibold mb-4 border-b pb-2">Profesional</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <p className="font-semibold">Profesión</p>
                                <p className="text-gray-700">{persona.profesion || "No especificada"}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Especialidad</p>
                                <p className="text-gray-700">{persona.especialidad || "No especificada"}</p>
                            </div>
                        </div>
                    </section>

                    {/* Otros */}
                    <section>
                        <h3 className="text-xl font-semibold mb-4 border-b pb-2">Otros</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <p className="font-semibold">Rol</p>
                                <p className="text-gray-700">{persona.rol ? persona.rol.nombre : "No asignado"}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Proyectos asignados</p>
                                {proyectos && proyectos.length > 0 ? (
                                    <ul className="list-disc list-inside text-gray-700">
                                        {proyectos.map(proy => (
                                            <li key={proy.idProyecto}>{proy.nombre}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-700">No asignado</p>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
