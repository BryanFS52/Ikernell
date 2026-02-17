"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { crearRol } from "@/services/rol.service";

const ROLES_VALIDOS = ["Coordinador de proyectos", "Lider de proyectos", "Desarrollador"];

export default function CrearRolPage() {
    const router = useRouter();
    const [rolSeleccionado, setRolSeleccionado] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!ROLES_VALIDOS.includes(rolSeleccionado)) {
            alert("Rol invalido");
            return;
        }

        setLoading(true);
        try {
            await crearRol(rolSeleccionado);
            router.push("/roles");
        } catch (error) {
            console.error("Error al crear el rol:", error);
            alert("Error al crear el rol");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="page max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Nuevo Rol</h1>

            <form onSubmit={handleSubmit} className="form flex flex-col gap-4">
                <select
                    className="border rounded p-2"
                    value={rolSeleccionado}
                    onChange={(e) => setRolSeleccionado(e.target.value)}
                    required
                >
                    <option value="">Seleccione un rol</option>
                    {ROLES_VALIDOS.map((r) => (
                        <option key={r} value={r}>{r}</option>
                    ))}
                </select>

                <button className="btn-primary" disabled={loading}>
                    {loading ? "Guardando..." : "Crear Rol"}
                </button>
            </form>
        </div>
    );
}

    