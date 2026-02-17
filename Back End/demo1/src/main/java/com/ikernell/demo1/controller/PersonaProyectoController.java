package com.ikernell.demo1.controller;
import com.ikernell.demo1.entities.PersonaProyecto;
import com.ikernell.demo1.repositories.PersonaProyectoRepository;
import com.ikernell.demo1.service.PersonaProyectoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/persona-proyecto")
@CrossOrigin(origins = "*")
public class PersonaProyectoController {

    private PersonaProyectoService personaProyectoService;

    public PersonaProyectoController(PersonaProyectoService personaProyectoService){
        this.personaProyectoService = personaProyectoService;
    }

    @PostMapping
    public PersonaProyecto asignar(@RequestBody PersonaProyecto pp){
        return personaProyectoService.guardar(pp);
    }

    @GetMapping
    public List<PersonaProyecto> listar(){
        return personaProyectoService.listar();
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        personaProyectoService.eliminar(id);
    }
}

