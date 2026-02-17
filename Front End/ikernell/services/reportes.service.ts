const API_URL = 'http://localhost:8080/api/reportes';

export async function descargarReporteInterrupciones() {
    const res = await fetch(`${API_URL}/interrupciones/csv`);

    if (!res.ok) {
        throw new Error('Error al descargar el reporte');
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'reporte_interrupciones.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

export async function getReporteDesempeno() {
    const res = await fetch(`${API_URL}/desempeno`);

    if (!res.ok) {
        throw new Error('Error al obtener el reporte de desempeño');
    }

    return res.json();
    
}

export async function descargarReporteDesempeno() {
    const res = await fetch(`${API_URL}/desempeno/csv`);

    if (!res.ok) {
        throw new Error('Error al descargar el reporte de desempeño');
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'reporte_desempeno.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

export async function getReporteErrores(){
    const res = await fetch(`${API_URL}/errores`);

    if (!res.ok) {
        throw new Error('Error al obtener el reporte de errores');
    }

    return res.json();
}

export async function descargarReporteErrores() {
    const res = await fetch(`${API_URL}/errores/csv`);

    if (!res.ok) {
        throw new Error('Error al descargar el reporte de errores');
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'reporte_errores.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

export async function getArchivoPlano() {
    const res = await fetch(`${API_URL}/proyectos`);

    if (!res.ok) {
        throw new Error('Error al obtener los proyectos');
    }

    return res.json();
}

// Nueva función específica para empresa brasileña
export async function getArchivoPlanoOptimizado() {
    try {
        const res = await fetch(`${API_URL}/proyectos`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept-Charset': 'UTF-8'
            }
        });

        if (!res.ok) {
            throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        
        // Formatear datos para empresa brasileña
        return data.map((proyecto: any) => ({
            ...proyecto,
            fechaFormateada: new Date(proyecto.fechaInicio).toLocaleDateString('pt-BR'),
            descripcionProcesada: proyecto.descripcion?.trim() || 'Sin descripción'
        }));
    } catch (error) {
        console.error('Error detallado:', error);
        throw new Error('Error al cargar datos para reporte brasileño');
    }
}

export async function descargarArchivoPlano() {
    const res = await fetch(`${API_URL}/proyectos-y-trabajadores/csv`);

    if (!res.ok) {
        throw new Error('Error al descargar el archivo plano');
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `proyectos_y_trabajadores_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

