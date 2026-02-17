package com.ikernell.demo1.controller;
import com.ikernell.demo1.entities.Persona;
import com.ikernell.demo1.service.PersonaService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/personas")
public class PersonaController {

    private final PersonaService personaService;

    public PersonaController(PersonaService personaService){
        this.personaService = personaService;
    }

    @GetMapping
    public List<Persona> listar(){
        return personaService.listarActivos();
    }

    @GetMapping("/desactivadas")
    public List<Persona> listarDesactivadas(){
        return personaService.listarDesactivadas();
    }

    @GetMapping("/{id}")
    public Persona buscarPorId(@PathVariable Long id){
        return personaService.buscarPorId(id);
    }

    @GetMapping("/asignables")
    public List<Persona> listarAsignables(){
        return personaService.listarParaAsignacionProyecto();
    }

    @PostMapping(consumes = "multipart/form-data")
    public Persona guardar(
            @RequestParam String nombre,
            @RequestParam String apellido,
            @RequestParam String documento,
            @RequestParam(required = false) String direccion,
            @RequestParam(required = false) String profesion,
            @RequestParam(required = false) String especialidad,
            @RequestParam String idRol,
            @RequestParam(required = false) String password,
            @RequestParam(required = false) MultipartFile foto
    ) throws Exception {

        return personaService.guardarConFoto(
                nombre,
                apellido,
                documento,
                direccion,
                profesion,
                especialidad,
                idRol,
                password,
                foto
        );
    }

    @PostMapping("/login")
    public Persona login(@RequestBody Persona persona){
        return personaService.login(persona.getDocumento(), persona.getPassword());
    }

    @PutMapping("/{id}")
    public Persona actualizar(@PathVariable Long id,
                              @RequestBody Persona persona){
        return personaService.actualizar(id, persona);
    }

    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public Persona actualizarConFoto(
            @PathVariable Long id,
            @RequestParam String nombre,
            @RequestParam String apellido,
            @RequestParam String documento,
            @RequestParam(required = false) String direccion,
            @RequestParam(required = false) String profesion,
            @RequestParam(required = false) String especialidad,
            @RequestParam String idRol,
            @RequestParam(required = false) String password,
            @RequestParam(required = false) MultipartFile foto
    ) throws Exception {
        return personaService.actualizarConFoto(id, nombre, apellido, documento, direccion, profesion, especialidad, idRol, password, foto);
    }

    @PutMapping("/desactivar/{id}")
    public void desactivar(@PathVariable Long id){
        personaService.desactivar(id);
    }

    @PutMapping("/reactivar/{id}")
    public void reactivar(@PathVariable Long id){
        personaService.reactivar(id);
    }
}

