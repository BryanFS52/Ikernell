package com.ikernell.demo1.service;
import com.ikernell.demo1.entities.Actividad;
import com.ikernell.demo1.repositories.ActividadRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ActividadService {

    private final ActividadRepository actividadRepository;

    public ActividadService(ActividadRepository actividadRepository){
        this.actividadRepository = actividadRepository;
    }

    public List<Actividad> listar(){
        return actividadRepository.findAll();
    }

    public Actividad buscarPorId(Long id){
        return actividadRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Actividad no encontrada"));
    }

    public Actividad guardar(Actividad actividad){
        return actividadRepository.save(actividad);
    }

    public void actualizar(Actividad actividad){
        actividadRepository.save(actividad);
    }

    public void eliminar(Long id){
        actividadRepository.deleteById(id);
    }
}
