package com.ikernell.demo1.service;
import com.ikernell.demo1.entities.Persona;
import com.ikernell.demo1.entities.Proyecto;
import com.ikernell.demo1.repositories.PersonaRepository;
import com.ikernell.demo1.repositories.ProyectoRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProyectoService {

    private final ProyectoRepository proyectoRepository;
    private final PersonaRepository personaRepository;

    public ProyectoService(ProyectoRepository proyectoRepository, PersonaRepository personaRepository) {
        this.proyectoRepository = proyectoRepository;
        this.personaRepository = personaRepository;
    }

    public List<Proyecto> listarTodos(){
        return proyectoRepository.findByEstadoTrue();
    }

    public List<Proyecto> listarDesactivados(){
        return proyectoRepository.findByEstadoFalse();
    }

    public Proyecto buscarPorId(Long id){
        return proyectoRepository.findById(id).orElse(null);
    }

    public Proyecto guardar(Proyecto proyecto){
        proyecto.setEstado(true);
        return proyectoRepository.save(proyecto);
    }

    public Proyecto actualizar(Long id, Proyecto proyecto){

        Proyecto existente = proyectoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Proyecto no encontrado"));

        existente.setNombre(proyecto.getNombre());
        existente.setDescripcion(proyecto.getDescripcion());
        existente.setEstado(proyecto.getEstado());

        if (proyecto.getFechaInicio() != null) {
            existente.setFechaInicio(proyecto.getFechaInicio());
        }

        if (proyecto.getFechaFin() != null) {
            existente.setFechaFin(proyecto.getFechaFin());
        }

        return proyectoRepository.save(existente);
    }

    public void desactivar(Long id){
        Proyecto proyecto = buscarPorId(id);
        if (proyecto != null) {
            proyecto.setEstado(false);
            proyectoRepository.save(proyecto);
        }
    }

    public void reactivar(Long id){
        Proyecto proyecto = buscarPorId(id);
        proyecto.setEstado(true);
        proyectoRepository.save(proyecto);
    }

    public Proyecto asignarPersona(Long idProyecto, Long idPersona){

        Proyecto proyecto = proyectoRepository.findById(idProyecto)
                .orElseThrow(() -> new RuntimeException("Proyecto no encontrado"));

        Persona persona = personaRepository.findById(idPersona)
                .orElseThrow(() -> new RuntimeException("Persona no encontrada"));

        if (persona.getProyectos().contains(proyecto)) {
            throw new RuntimeException("El desarrollador ya está asignado a este proyecto");
        }

        persona.getProyectos().add(proyecto);

        personaRepository.save(persona);
        return proyecto;
    }

    public List<Proyecto> obtenerProyectos() {
        return proyectoRepository.findAll();
    }
}
