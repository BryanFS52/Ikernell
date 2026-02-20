package com.ikernell.demo1.service;
import com.ikernell.demo1.dto.ReporteDesempenoDTO;
import com.ikernell.demo1.entities.EstadoActividad;
import com.ikernell.demo1.entities.Persona;
import com.ikernell.demo1.repositories.ActividadRepository;
import com.ikernell.demo1.repositories.InterrupcionRepository;
import com.ikernell.demo1.repositories.PersonaRepository;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReporteService {

    private final PersonaRepository personaRepository;
    private final ActividadRepository actividadRepository;
    private final InterrupcionRepository interrupcionRepository;

    public ReporteService(PersonaRepository personaRepository,
                          ActividadRepository actividadRepository,
                          InterrupcionRepository interrupcionRepository) {
        this.personaRepository = personaRepository;
        this.actividadRepository = actividadRepository;
        this.interrupcionRepository = interrupcionRepository;
    }

    public List<ReporteDesempenoDTO> generarReporteDesempeno(){

        List<Persona> personas = personaRepository.findAll();
        List<ReporteDesempenoDTO> reporte = new ArrayList<>();

        for (Persona p : personas) {

            Long totalActividades = actividadRepository.countByPersona(p);

            Long actividadesFinalizadas = actividadRepository.countByPersonaAndEstadoNombre(p, EstadoActividad.CIERRE);

            Long totalInterrupciones = interrupcionRepository.countByPersona(p);

            Long totalMinutos = interrupcionRepository.sumDuracionByPersona(p);

            reporte.add(new ReporteDesempenoDTO(
                    p.getNombre() + " " + p.getApellido(),
                    totalActividades,
                    actividadesFinalizadas,
                    totalInterrupciones,
                    totalMinutos != null ? totalMinutos : 0L
            ));
        }
        return reporte;
    }
}
