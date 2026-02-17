package com.ikernell.demo1.controller;
import com.ikernell.demo1.dto.ErrorProyectoDTO;
import com.ikernell.demo1.entities.ErrorProyecto;
import com.ikernell.demo1.entities.Persona;
import com.ikernell.demo1.entities.Proyecto;
import com.ikernell.demo1.service.ErrorProyectoService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/errores")
@CrossOrigin(origins = "*")
public class ErrorProyectoController {

    private final ErrorProyectoService errorProyectoService;

    public ErrorProyectoController(ErrorProyectoService errorProyectoService){
        this.errorProyectoService = errorProyectoService;
    }

    @GetMapping
    public List<ErrorProyecto> listar(){
        return errorProyectoService.listar();
    }

    @GetMapping("/{id}")
    public ErrorProyecto buscarPorId(@PathVariable Long id){
        return errorProyectoService.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public ErrorProyecto actualizar(@PathVariable Long id, @RequestBody ErrorProyectoDTO dto){
        return errorProyectoService.actualizarDesdeDTO(id, dto);
    }

    @PostMapping
    public ErrorProyecto guardar(@RequestBody ErrorProyectoDTO dto){
        return errorProyectoService.guardarDesdeDTO(dto);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        errorProyectoService.eliminar(id);
    }
}
