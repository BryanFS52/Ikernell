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


export async function descargarArchivoPlano() {
    const res = await fetch(`${API_URL}/proyectos-y-trabajadores/csv`);

    if (!res.ok) {
        throw new Error('Error al descargar el archivo plano');
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'proyectos_y_trabajadores.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

