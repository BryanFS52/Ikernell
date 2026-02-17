"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Etapa } from "@/types/etapa";
import { getEtapas } from "@/services/etapa.service";
import { Proyecto } from "@/types/proyecto";

export default function EtapasPage() {
    const router = useRouter();
    const [etapas, setEtapas] = useState<Etapa[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        cargarEtapas();
    }, []);

    async function cargarEtapas() {
        setLoading(true);
        const data = await getEtapas();
        setEtapas(data);
        setLoading(false);
    }

    if (loading) {
        return <p className="text-center mt-10">Cargando etapas</p>;
    }

    return (
        <div className="page">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Etapas</h1>
                <button
                    onClick={() => router.push("/")}
                    className="btn-secondary"
                >
                    ← Volver
                </button>
            </div>

            <div className="table-container">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th style={{textAlign: 'center', width: '50%'}}>Etapas</th>
                            <th style={{textAlign: 'center', width: '50%'}}>Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {etapas.length === 0 ? (
                            <tr>
                                <td colSpan={2} className="text-center py-4 text-gray-500">
                                    No hay etapas registradas
                                </td>
                            </tr>
                        ) : (
                            etapas.map((e) => (
                                <tr key={e.idEtapa}>
                                    <td style={{textAlign: 'center'}}>{e.nombre}</td>
                                    <td style={{textAlign: 'center'}}>{e.descripcion}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}



