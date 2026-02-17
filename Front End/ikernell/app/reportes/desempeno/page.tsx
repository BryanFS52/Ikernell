"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ReporteDesempeno } from "@/types/desempeno";
import { descargarReporteDesempeno, getReporteDesempeno } from "@/services/reportes.service";

export default function ReporteDesempenoPage() {

    const [data, setData] = useState<ReporteDesempeno[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {

        getReporteDesempeno()
            .then(res => {
                setData(res);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="mt-6">Cargando reporte de desempeño...</p>;

    return (
        <div className="page">

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">
                    Reporte de Desempeño
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
                    onClick={() => descargarReporteDesempeno()}
                >
                    Descargar CSV
                </button>

            <table className="custom-table">
                <thead>
                    <tr>
                        <th>Persona</th>
                        <th>Total actividades</th>
                        <th>Actividades finalizadas</th>
                        <th>Total interrupciones</th>
                        <th>Total minutos de interrupción</th>
                    </tr>
                </thead>

                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="text-center py-4">
                                No hay datos disponibles
                            </td>
                        </tr>
                    ) : (
                        data.map((r, index) => (
                            <tr key={index}>
                                <td>{r.persona}</td>
                                <td>{r.totalActividades}</td>
                                <td>{r.actividadesFinalizadas}</td>
                                <td>{r.totalInterrupciones}</td>
                                <td>{r.totalMinutosInterrupcion}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
