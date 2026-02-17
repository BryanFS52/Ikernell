"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getReporteErrores, descargarReporteErrores } from "@/services/reportes.service";


interface ErrorReporte{
    idError: number;
    tipoError: string;
    fase: string;
    persona: {
        nombre: string;
        apellido: string;
    };
    proyecto:{
        nombre: string
    };
}

export default function ReporteErroresPage(){

    const [data, setData] = useState<ErrorReporte[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        getReporteErrores()
        .then(res => {
            setData(res);
            setLoading(false);
        })
        .catch(error => {
            console.error(error);
            setLoading(false);
        });
}, []);

if (loading) return <p className="mt-6">Cargando reporte de errores..</p>;

    return(
        <div className="page">

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">
                    Reporte de Errores por Proyecto
                </h1>

                <button
                    className="btn-secondary"
                    onClick={() => router.push("/reportes")}
                >
                    Volver
                </button>
            </div>

            <button
                className="btn-primary mb-4"
                onClick={() => descargarReporteErrores()}
            >
                Descargar CSV
            </button>

            <table className="custom-table">
                <thead>
                    <tr>
                        <th>Tipo Error</th>
                        <th>Fase</th>
                        <th>Persona</th>
                        <th>Proyecto</th>
                    </tr>
                </thead>

                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="text-center py-4">
                                No hay datos disponibles
                            </td>
                        </tr>
                    ) : (
                        data.map((e) => (
                            <tr key={e.idError}>
                                <td>{e.tipoError}</td>
                                <td>{e.fase}</td>
                                <td>{e.persona?.nombre} {e.persona?.apellido}</td>
                                <td>{e.proyecto?.nombre}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}