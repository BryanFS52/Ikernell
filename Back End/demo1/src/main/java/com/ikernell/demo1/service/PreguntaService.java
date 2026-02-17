package com.ikernell.demo1.service;
import com.ikernell.demo1.entities.Pregunta;
import com.ikernell.demo1.repositories.PreguntaRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;
import java.util.List;

@Service
public class PreguntaService {

    private final PreguntaRepository preguntaRepository;

    public PreguntaService(PreguntaRepository preguntaRepository){
        this.preguntaRepository = preguntaRepository;
    }

    public List<Pregunta> listar(){
        return preguntaRepository.findAll();
    }

    public Pregunta guardar(Pregunta pregunta){
        if (pregunta.getDescripcion() == null || pregunta.getDescripcion().trim().isEmpty()) {
            throw new RuntimeException("La descripcion no puede estar vacia");
        }

        if (pregunta.getTitulo() == null || pregunta.getTitulo().trim().isEmpty()) {
            pregunta.setTitulo("Sin titulo");
        }

        if (pregunta.getFecha() == null) {
            pregunta.setFecha(LocalDate.now());
        }

        return preguntaRepository.save(pregunta);
    }

    public Pregunta agregarRespuesta(Long idPregunta, String respuestaTexto) {
        Pregunta pregunta = preguntaRepository.findById(idPregunta)
                .orElseThrow(() -> new RuntimeException("Pregunta no encontrada"));

        pregunta.getRespuestas().add(respuestaTexto);

        return preguntaRepository.save(pregunta);
    }

    public void eliminar(Long id){
        preguntaRepository.deleteById(id);
    }

    public Pregunta eliminarRespuesta(Long idPregunta, int indexRespuesta) {
        Pregunta pregunta = preguntaRepository.findById(idPregunta)
                .orElseThrow(() -> new RuntimeException("Pregunta no encontrada"));

        if (indexRespuesta >= 0 && indexRespuesta < pregunta.getRespuestas().size()) {
            pregunta.getRespuestas().remove(indexRespuesta);
            return preguntaRepository.save(pregunta);
        }else {
            throw new RuntimeException("Respuesta no encontrada");
        }
    }
}
