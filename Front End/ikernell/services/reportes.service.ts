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
    try {
        const res = await fetch(`${API_URL}/proyectos-y-trabajadores/csv`);

        if (!res.ok) {
            console.warn('Endpoint CSV no disponible, generando desde datos...');
            return await generarCSVDesdeProyectos();
        }

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `projetos_brasil_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error en descarga principal, intentando método alternativo:', error);
        return await generarCSVDesdeProyectos();
    }
}

export async function generarCSVDesdeProyectos() {
    try {
        const proyectos = await getArchivoPlanoOptimizado();
        
        if (!proyectos || proyectos.length === 0) {
            throw new Error('No hay datos de proyectos para exportar');
        }

        const headers = 'ID,Projeto,Equipe,Data_Inicio,Data_Fim,Status,Num_Pessoas\n';
        const csvContent = proyectos.map((p: any) => {
            const equipe = p.personas ? p.personas.map((per: any) => per.nombre).join(';') : 'Não atribuído';
            const dataInicio = p.fechaInicio ? new Date(p.fechaInicio).toLocaleDateString('pt-BR') : '';
            const dataFim = p.fechaFin ? new Date(p.fechaFin).toLocaleDateString('pt-BR') : 'Em andamento';
            const status = (!p.fechaFin || new Date(p.fechaFin) > new Date()) ? 'Ativo' : 'Finalizado';
            const numPessoas = p.personas ? p.personas.length : 0;
            
            const nomeEscapado = p.nombre?.replace(/"/g, '""') || '';
            const equipeEscapado = equipe.replace(/"/g, '""');
            
            return [
                p.idProyecto || '',
                `"${nomeEscapado}"`,
                `"${equipeEscapado}"`,
                dataInicio,
                dataFim,
                status,
                numPessoas
            ].join(',');
        }).join('\n');

        const csvData = headers + csvContent;
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `projetos_brasil_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
        
        return 'Arquivo CSV gerado com sucesso!';
    } catch (error) {
        console.error('Error al generar CSV:', error);
        throw new Error('Erro ao gerar arquivo CSV: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
    }
}

