"use client";

import { useRouter } from "next/navigation";

export default function ReportesPage() {
    const router = useRouter();

    return (
        <div className="page">
            <h1 className="text-2xl font-bold mb-6">Reportes</h1>

            <div className="flex flex-col gap-4 max-w-md">

                <button
                    className="btn-primary"
                    onClick={() => router.push("/reportes/interrupciones")}
                >
                    Reporte de interrupciones
                </button>

                <button
                    className="btn-primary"
                    onClick={() => router.push("/reportes/desempeno")}
                >
                    Reporte de desempeño
                </button>

                <button
                    className="btn-primary"
                    onClick={() => router.push("/reportes/erroresProyecto")}
                >
                    Reporte de errores por proyecto
                </button>

                <button
                    className="btn-primary"
                    onClick={() => router.push("/reportes/archivoPlano")}
                >
                    Archivo plano para empresa brasileña
                </button>
            </div>
        </div>
    );
}