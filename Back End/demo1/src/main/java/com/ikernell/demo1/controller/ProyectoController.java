package com.ikernell.demo1.controller;
import com.ikernell.demo1.entities.Proyecto;
import com.ikernell.demo1.service.ProyectoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/proyectos")
@CrossOrigin(origins = "*")
public class ProyectoController {

    private ProyectoService proyectoService;

    public ProyectoController(ProyectoService proyectoService){
        this.proyectoService = proyectoService;
    }

    @GetMapping
    public List<Proyecto> listar(){
        return proyectoService.listarTodos();
    }

    @GetMapping("/todos")
    public List<Proyecto> listarTodos(){
        return proyectoService.listarTodos();
    }

    @GetMapping("/desactivados")
    public List<Proyecto> listarDesactivados(){
        return proyectoService.listarDesactivados();
    }

    @GetMapping("/{id}")
    public Proyecto buscarPorId(@PathVariable Long id){
        return proyectoService.buscarPorId(id);
    }

    @PostMapping
    public Proyecto guardar(@RequestBody Proyecto proyecto){
        return proyectoService.guardar(proyecto);
    }

    @PutMapping("/{id}")
    public Proyecto actualizar(@PathVariable Long id, @RequestBody Proyecto proyecto){
        return proyectoService.actualizar(id, proyecto);
    }

    @PutMapping("/asignar/{idProyecto}")
    public Proyecto asignar(
            @PathVariable Long idProyecto,
            @RequestBody Map<String, Long> body
    ) {
        return proyectoService.asignarPersona(idProyecto, body.get("idPersona"));
    }

    @PutMapping("/desactivar/{id}")
    public void desactivar(@PathVariable Long id){
        proyectoService.desactivar(id);
    }

    @PutMapping("/reactivar/{id}")
    public void reactivar(@PathVariable Long id) {
        proyectoService.reactivar(id);
    }
}
