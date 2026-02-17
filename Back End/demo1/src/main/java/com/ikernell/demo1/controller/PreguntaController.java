package com.ikernell.demo1.controller;
import com.ikernell.demo1.entities.Pregunta;
import com.ikernell.demo1.service.PreguntaService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/preguntas")
@CrossOrigin(origins = "*")

public class PreguntaController {

    private PreguntaService preguntaService;

    public PreguntaController(PreguntaService preguntaService){
        this.preguntaService = preguntaService;
    }

    @GetMapping
    public List<Pregunta> listar(){
        return preguntaService.listar();
    }

    @PostMapping
    public Pregunta guardar(@RequestBody Pregunta pregunta){

        if (pregunta.getDescripcion() == null || pregunta.getDescripcion().trim().isEmpty()) {
            throw new RuntimeException("La descripcion no puede estar vacia");
        }

        if (pregunta.getTitulo() == null || pregunta.getTitulo().trim().isEmpty()) {
            pregunta.setTitulo("Sin titulo");
        }

        return preguntaService.guardar(pregunta);
    }

    @PostMapping("/{idPregunta}/respuestas")
    public Pregunta responderPregunta(@PathVariable Long idPregunta, @RequestBody Map<String, String> payload) {
        String contenido = payload.get("contenido");
        return preguntaService.agregarRespuesta(idPregunta, contenido);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        preguntaService.eliminar(id);
    }

    @DeleteMapping("/{idPregunta}/respuestas/{indexRespuesta}")
    public Pregunta elimiarRespuesta(@PathVariable Long idPregunta, @PathVariable int indexRespuesta) {
        return preguntaService.eliminarRespuesta(idPregunta, indexRespuesta);
    }
}
