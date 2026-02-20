package com.ikernell.demo1.controller;
import com.ikernell.demo1.dto.ReporteDesempenoDTO;
import com.ikernell.demo1.entities.*;
import com.ikernell.demo1.repositories.InterrupcionRepository;
import com.ikernell.demo1.repositories.ProyectoRepository;
import com.ikernell.demo1.service.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;


@RestController
@RequestMapping("/api/reportes")
@CrossOrigin(origins = "*")
public class ReporteController {

    private final InterrupcionRepository interrupcionRepository;
    private final ReporteService reporteService;
    private final ActividadService actividadService;
    private final ErrorProyectoService errorProyectoService;
    private final ProyectoRepository proyectoRepository;
    private final ProyectoService proyectoService;

    public ReporteController(InterrupcionRepository interrupcionRepository,
                             ReporteService reporteService,
                             ActividadService actividadService,
                             ErrorProyectoService errorProyectoService,
                             ProyectoRepository proyectoRepository,
                             ProyectoService proyectoService) {

        this.interrupcionRepository = interrupcionRepository;
        this.reporteService = reporteService;
        this.actividadService = actividadService;
        this.errorProyectoService = errorProyectoService;
        this.proyectoRepository = proyectoRepository;
        this.proyectoService = proyectoService;
    }


    @GetMapping("/interrupciones")
    public List<Interrupcion> reporteInterrupciones() {
        return interrupcionRepository.findAll();
    }

    @GetMapping("/interrupciones/csv")
    public ResponseEntity<String> descargarCSV() {

        List<Interrupcion> lista = interrupcionRepository.findAll();

        StringBuilder csv = new StringBuilder();
        csv.append("TIPO;FECHA;DURACION;FASE;PERSONA;PROYECTO\n");

        for (Interrupcion i : lista) {

            String nombrePersona = i.getPersona() != null
                    ? i.getPersona().getNombre() + " " + i.getPersona().getApellido()
                    : "";

            String nombreProyecto = i.getProyecto() != null
                    ? i.getProyecto().getNombre()
                    : "";

            csv.append(i.getTipo()).append(";")
                    .append(i.getFecha()).append(";")
                    .append(i.getDuracion()).append(";")
                    .append(i.getFase()).append(";")
                    .append(nombrePersona).append(";")
                    .append(nombreProyecto)
                    .append("\n");

        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=reporte_interrupciones.csv")
                .header(HttpHeaders.CONTENT_TYPE, "text/csv")
                .body(csv.toString());
    }

    @GetMapping("/desempeno")
    public List<ReporteDesempenoDTO> reporteDesempeno() {
        return reporteService.generarReporteDesempeno();
    }

    @GetMapping("/desempeno/csv")
    public ResponseEntity<String> descargarCSVDesempeno() {

        List<ReporteDesempenoDTO> reporte = reporteService.generarReporteDesempeno();

        StringBuilder csv = new StringBuilder();
        csv.append("Persona; Total Actividades; Actividades Finalizadas; Total Interrupciones; Total Minutos Interrupcion\n");

        for (ReporteDesempenoDTO r : reporte) {
            csv.append(r.getPersona()).append(";")
                    .append(r.getTotalActividades()).append(";")
                    .append(r.getActividadesFinalizadas()).append(";")
                    .append(r.getTotalInterrupciones()).append(";")
                    .append(r.getTotalMinutosInterrupcion())
                    .append("\n");
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=reporte_desempeno.csv")
                .header(HttpHeaders.CONTENT_TYPE, "text/csv")
                .body(csv.toString());
    }

    @GetMapping("/errores")
    public List<ErrorProyecto> reporteErrores() {
        return errorProyectoService.listar();
    }

    @GetMapping("/errores/csv")
    public ResponseEntity<String> descargarCSVErrores() {

        List<ErrorProyecto> lista = errorProyectoService.listar();

        StringBuilder csv = new StringBuilder();
        csv.append("TIPO ERROR,FASE,PERSONA,PROYECTO\n");

        for (ErrorProyecto e : lista) {

            String nombrePersona = e.getPersona() != null
                    ? e.getPersona().getNombre() + " " + e.getPersona().getApellido()
                    : "";

            String nombreProyecto = e.getProyecto() != null
                    ? e.getProyecto().getNombre()
                    : "";

            csv.append(e.getTipoError()).append(",")
                    .append(e.getFase()).append(",")
                    .append(nombrePersona).append(",")
                    .append(nombreProyecto)
                    .append("\n");
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=reporte_errores.csv")
                .header(HttpHeaders.CONTENT_TYPE, "text/csv")
                .body(csv.toString());
    }

    @GetMapping("/proyectos")
    public ResponseEntity<List<Proyecto>> obtenerProyectos() {
        try {
            List<Proyecto> proyectos = proyectoService.obtenerProyectos();
            return ResponseEntity.ok(proyectos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
