export const FASES_PROYECTO = [
    { value: "Planificacion", label: "Planificación" },
    { value: "Analisis", label: "Análisis" },
    { value: "Diseno", label: "Diseño" },
    { value: "Desarrollo", label: "Desarrollo" },
    { value: "Pruebas", label: "Pruebas" }, 
    { value: "Implementacion", label: "Implementación" },
    { value: "Mantenimiento", label: "Mantenimiento" }
] as const;

export type FaseProyecto = typeof FASES_PROYECTO[number]["value"];