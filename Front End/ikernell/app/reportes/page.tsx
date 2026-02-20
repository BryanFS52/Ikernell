"use client";

import { useRouter } from "next/navigation";
import { usePermissions } from "@/hooks/usePermissions";

export default function ReportesPage() {
    const router = useRouter();
    const { canViewReports } = usePermissions();

    // Verificar permisos para ver reportes
    if (!canViewReports()) {
        return (
            <div className="max-w-6xl mx-auto p-6">
                <h1 className="text-2xl font-bold text-red-600">Acceso Denegado</h1>
                <p className="mt-4 text-gray-600">No tienes permisos para ver esta página.</p>
            </div>
        );
    }

    const reportes = [
        {
            title: "Reporte de Interrupciones",
            description: "Visualiza y analiza las interrupciones registradas en el sistema, con detalles de frecuencia y tiempo de duración.",
            path: "/reportes/interrupciones",
            color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
            buttonColor: "bg-blue-600 hover:bg-blue-700"
        },
        {
            title: "Reporte de Desempeño",
            description: "Evalúa el rendimiento y productividad del equipo con métricas detalladas y análisis comparativo.",
            path: "/reportes/desempeno",
            color: "bg-green-50 border-green-200 hover:bg-green-100",
            buttonColor: "bg-green-600 hover:bg-green-700"
        },
        {
            title: "Errores por Proyecto",
            description: "Monitorea y categoriza los errores identificados por proyecto para un mejor control de calidad.",
            path: "/reportes/erroresProyecto",
            color: "bg-red-50 border-red-200 hover:bg-red-100",
            buttonColor: "bg-red-600 hover:bg-red-700"
        },
        {
            title: "Archivo Plano Brasil",
            description: "Genera archivo de datos estructurado específicamente para cumplir con los requerimientos de la empresa brasileña.",
            path: "/reportes/archivoPlano",
            color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
            buttonColor: "bg-purple-600 hover:bg-purple-700"
        }
    ];

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Reportes</h1>
                <p className="text-gray-600">Accede a todos los reportes y análisis del sistema</p>
            </div>

            {/* Grid de Reportes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reportes.map((reporte, index) => (
                    <div
                        key={index}
                        className={`bg-white rounded-xl shadow border-2 p-6 transition-all duration-200 hover:shadow-lg ${reporte.color}`}
                    >
                        <div className="flex flex-col h-full">
                            <div className="flex-grow">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    {reporte.title}
                                </h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {reporte.description}
                                </p>
                            </div>
                            
                            <button
                                onClick={() => router.push(reporte.path)}
                                className={`w-full px-6 py-3 text-white font-medium rounded-lg transition-colors duration-200 ${reporte.buttonColor}`}
                            >
                                Generar Reporte
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Información adicional */}
            <div className="mt-8 bg-gray-50 rounded-xl p-6 border">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Información Importante</h3>
                <ul className="text-gray-600 space-y-2">
                    <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Los reportes se generan en tiempo real con la información más actualizada
                    </li>
                    <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Puedes exportar los datos en diferentes formatos según el tipo de reporte
                    </li>
                    <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Los permisos necesarios se verifican automáticamente para cada reporte
                    </li>
                </ul>
            </div>
        </div>
    );
}