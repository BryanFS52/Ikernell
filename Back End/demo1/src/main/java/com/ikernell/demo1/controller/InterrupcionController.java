package com.ikernell.demo1.controller;
import com.ikernell.demo1.entities.Interrupcion;
import com.ikernell.demo1.entities.Persona;
import com.ikernell.demo1.entities.Proyecto;
import com.ikernell.demo1.repositories.InterrupcionRepository;
import com.ikernell.demo1.repositories.PersonaRepository;
import com.ikernell.demo1.repositories.ProyectoRepository;
import com.ikernell.demo1.service.InterrupcionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/interrupciones")
@CrossOrigin(origins = "*")
public class InterrupcionController {

    private final InterrupcionService interrupcionService;
    private final PersonaRepository personaRepository;
    private final ProyectoRepository proyectoRepository;

    public InterrupcionController(
            InterrupcionService interrupcionService,
            PersonaRepository personaRepository,
            ProyectoRepository proyectoRepository) {
        this.interrupcionService = interrupcionService;
        this.personaRepository = personaRepository;
        this.proyectoRepository = proyectoRepository;
    }

    @GetMapping
    public List<Interrupcion> listar(){
        return interrupcionService.listar();
    }

    @GetMapping("/{id}")
    public Interrupcion buscarPorId(@PathVariable Long id){
        return interrupcionService.buscarPorId(id);
    }

    @PostMapping
    public Interrupcion guardar(@RequestBody Interrupcion interrupcion){

        Persona persona = personaRepository
                .findById(interrupcion.getPersona().getIdPersona())
                .orElseThrow(() -> new RuntimeException("Persona no encontrada"));

        Proyecto proyecto = proyectoRepository
                .findById(interrupcion.getProyecto().getIdProyecto())
                .orElseThrow(() -> new RuntimeException("Proyecto no encontrado"));

        interrupcion.setPersona(persona);
        interrupcion.setProyecto(proyecto);

        return interrupcionService.guardar(interrupcion);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        interrupcionService.eliminar(id);
    }
}
