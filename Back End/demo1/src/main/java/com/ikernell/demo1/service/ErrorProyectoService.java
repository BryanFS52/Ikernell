package com.ikernell.demo1.service;
import com.ikernell.demo1.dto.ErrorProyectoDTO;
import com.ikernell.demo1.entities.ErrorProyecto;
import com.ikernell.demo1.entities.Persona;
import com.ikernell.demo1.entities.Proyecto;
import com.ikernell.demo1.repositories.ErrorProyectoRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class ErrorProyectoService {

    private final ErrorProyectoRepository errorProyectoRepository;
    private final PersonaService personaService;
    private final ProyectoService proyectoService;

    public ErrorProyectoService(ErrorProyectoRepository errorProyectoRepository, PersonaService personaService, ProyectoService proyectoService) {
        this.errorProyectoRepository = errorProyectoRepository;
        this.personaService = personaService;
        this.proyectoService = proyectoService;
    }

    public List<ErrorProyecto> listar(){
        return errorProyectoRepository.findAll();
    }

    public ErrorProyecto buscarPorId(Long id){
        return errorProyectoRepository.findById(id).orElse(null);
    }

    public ErrorProyecto guardarDesdeDTO(ErrorProyectoDTO dto){

        Persona persona = personaService.buscarPorId(dto.getIdPersona());
        if (persona == null) {
            throw new RuntimeException("Persona no encontrada");
        }

        Proyecto proyecto = proyectoService.buscarPorId(dto.getIdProyecto());
        if (proyecto == null) {
            throw new RuntimeException("Proyecto no encontrado");
        }

        ErrorProyecto error = new ErrorProyecto();
        error.setTipoError(dto.getTipoError());
        error.setFase(dto.getFase());
        error.setPersona(persona);
        error.setProyecto(proyecto);

        return errorProyectoRepository.save(error);
    }

    public ErrorProyecto actualizarDesdeDTO(Long id, ErrorProyectoDTO dto) {
        ErrorProyecto existente = buscarPorId(id);
        if (existente == null)
            throw new RuntimeException("Error no encontrado");

        Persona persona = personaService.buscarPorId(dto.getIdPersona());
        Proyecto proyecto = proyectoService.buscarPorId(dto.getIdProyecto());

        existente.setTipoError(dto.getTipoError());
        existente.setFase(dto.getFase());
        existente.setPersona(persona);
        existente.setProyecto(proyecto);

        return errorProyectoRepository.save(existente);
    }

    public void eliminar(Long id){
        errorProyectoRepository.deleteById(id);
    }
}
