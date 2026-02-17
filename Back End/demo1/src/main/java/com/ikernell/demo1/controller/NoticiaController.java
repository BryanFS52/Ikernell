package com.ikernell.demo1.controller;
import com.ikernell.demo1.entities.Noticia;
import com.ikernell.demo1.service.NoticiaService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/noticias")
@CrossOrigin(origins = "*")
public class NoticiaController {

    private NoticiaService noticiaService;

    public NoticiaController(NoticiaService noticiaService){
        this.noticiaService = noticiaService;
    }

    @GetMapping
    public List<Noticia> listar(){
        return noticiaService.listar();
    }

    @GetMapping("/ultimas")
    public List<Noticia> listarUltimas(){
        return noticiaService.listarUltimas(5);
    }

    @GetMapping("/{id}")
    public Noticia buscarPorId(@PathVariable Long id){
        return noticiaService.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public Noticia actualizar(@PathVariable Long id, @RequestBody Noticia noticia) {
        // Buscamos la noticia existente
        Noticia existente = noticiaService.buscarPorId(id);
        if (existente == null) {
            throw new RuntimeException("Noticia no encontrada");
        }

        // Actualizamos campos
        if (noticia.getTitulo() != null) {
            existente.setTitulo(noticia.getTitulo());
        }
        if (noticia.getContenido() != null) {
            existente.setContenido(noticia.getContenido());
        }
        // Fecha opcional: actualizar solo si viene
        if (noticia.getFecha() != null) {
            existente.setFecha(noticia.getFecha());
        }

        return noticiaService.guardar(existente);
    }

    @PostMapping
    public Noticia guardar(@RequestBody Noticia noticia){
        return noticiaService.guardar(noticia);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        noticiaService.eliminar(id);
    }
}
