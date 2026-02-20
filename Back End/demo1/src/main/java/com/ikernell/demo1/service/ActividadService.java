package com.ikernell.demo1.service;
import com.ikernell.demo1.entities.Actividad;
import com.ikernell.demo1.entities.Persona;
import com.ikernell.demo1.repositories.ActividadRepository;
import com.ikernell.demo1.repositories.PersonaRepository;
import com.ikernell.demo1.repositories.ProyectoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ActividadService {

    private final ActividadRepository actividadRepository;
    private final PersonaRepository personaRepository;
    private final ProyectoRepository proyectoRepository;

    public ActividadService(ActividadRepository actividadRepository, PersonaRepository personaRepository, ProyectoRepository proyectoRepository) {
        this.actividadRepository = actividadRepository;
        this.personaRepository = personaRepository;
        this.proyectoRepository = proyectoRepository;
    }

    public List<Actividad> listar(){
        return actividadRepository.findAll();
    }

    public Actividad buscarPorId(Long id){
        return actividadRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Actividad no encontrada"));
    }

    public Actividad guardar(Actividad actividad){

        Persona persona = personaRepository
                .findById(actividad.getPersona().getIdPersona())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Persona no encontrada"));

        var proyecto = persona.getProyectos()
                .stream()
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "La persona no está asignada a ningún proyecto"));

        actividad.setPersona(persona);
        actividad.setProyecto(proyecto);

        return actividadRepository.save(actividad);
    }

    public void actualizar(Actividad actividad){
        actividadRepository.save(actividad);
    }

    public void eliminar(Long id){
        actividadRepository.deleteById(id);
    }
}
