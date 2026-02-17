"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { verPersona } from "@/services/persona.service";
import { Rol } from "@/types/rol";
import { Proyecto } from "@/types/proyecto";

export interface Persona {
    idPersona: number;
    nombre: string;
    apellido: string;
    documento: string;
    direccion?: string;
    profesion?: string;
    especialidad?: string;
    estado: boolean;
    foto?: string;
    fechaNacimiento?: string;
    rol: Rol;
    proyecto?: Proyecto;
    password?: string;
}

export default function VerPersonaPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [persona, setPersona] = useState<Persona | null>(null);
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
            const personaData = await verPersona(Number(id));
            setPersona(personaData);
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
            <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">
                Detalle de la Persona
            </h1>

            {persona.foto && (
                <div className="flex justify-center mb-6">
                    <img
                        src={persona.foto}
                        alt={`${persona.nombre}`}
                        style={{ width: "120px", height: "110px", objectFit: "cover" }}
                        className="rounded-full border shadow"
                    />
                </div>
            )}

            <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800">{persona.nombre}{persona.apellido}</h2>
                <p className="text-gray-700">{persona.documento}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600 mt-4">
                <div className="bg-gray-50 p-4 rounded shadow-sm">
                    <h3 className="font-medium text-gray-700 mb-1">Direccion</h3>
                    <p className="text-gray-700">{persona.direccion}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600 mt-4">
                <div className="bg-gray-50 p-4 rounded shadow-sm">
                    <h3 className="font-medium text-gray-700 mb-1">Profesion</h3>
                    <p className="text-gray-700">{persona.profesion}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600 mt-4">
                <div className="bg-gray-50 p-4 rounded shadow-sm">
                    <h3 className="font-medium text-gray-700 mb-1">Especialidad</h3>
                    <p className="text-gray-700">{persona.especialidad}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600 mt-4">
                <div className="bg-gray-50 p-4 rounded shadow-sm">
                    <h3 className="font-medium text-gray-700 mb-1">Rol</h3>
                    <p className="text-gray-700">{persona.rol ? persona.rol.nombre : 'No asignado'}</p>
                </div>
            </div>

            <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${persona.estado
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                    }`}
            >
                {persona.estado ? "Activo" : "Inactivo"}
            </span>
            <div className="mt-6 flex justify-start">
                <button
                    onClick={() => router.back()}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Volver
                </button>
            </div>
        </div>
    );
}