package com.ikernell.demo1.controller;
import com.ikernell.demo1.entities.Actividad;
import com.ikernell.demo1.entities.EstadoActividad;
import com.ikernell.demo1.service.ActividadService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/actividades")
@CrossOrigin(origins = "*")
public class ActividadController {

    private final ActividadService actividadService;

    public ActividadController(ActividadService actividadService){
        this.actividadService = actividadService;
    }

    @GetMapping
    public List<Actividad> listar(){
        return actividadService.listar();
    }

    @GetMapping("/{id}")
    public Actividad buscarPorId(@PathVariable Long id){
        return actividadService.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public Actividad actualizar(@PathVariable Long id, @RequestBody Actividad actividad){
        actividad.setIdActividad(id);
        return actividadService.guardar(actividad);
    }

    @PutMapping("/{id}/finalizar")
    public Actividad finalizarActividad(@PathVariable Long id) {
        Actividad actividad = actividadService.buscarPorId(id);

        if (actividad == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Actividad no encontrada");
        }
            actividad.setEstado(EstadoActividad.CIERRE);
            return actividadService.guardar(actividad);
    }

    @PostMapping
    public Actividad guardar(@RequestBody Actividad actividad){
        return actividadService.guardar(actividad);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        actividadService.eliminar(id);
    }
}
