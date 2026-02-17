package com.ikernell.demo1.controller;
import com.ikernell.demo1.entities.Servicio;
import com.ikernell.demo1.service.ServicioService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/servicios")
@CrossOrigin(origins = "*")
public class ServicioController {

    private ServicioService servicioService;

    public ServicioController(ServicioService servicioService){
        this.servicioService = servicioService;
    }

    @GetMapping
    public List<Servicio> listar(){
        return servicioService.listar();
    }

    @PostMapping
    public Servicio guardar(@RequestBody Servicio servicio){
        return servicioService.guardar(servicio);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        servicioService.eliminar(id);
    }
}
