package com.ikernell.demo1.service;
import com.ikernell.demo1.entities.Noticia;
import com.ikernell.demo1.repositories.NoticiaRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class NoticiaService {

    private final NoticiaRepository noticiaRepository;

    public NoticiaService(NoticiaRepository noticiaRepository){
        this.noticiaRepository = noticiaRepository;
    }

    public List<Noticia> listar(){
        return noticiaRepository.findAll(Sort.by(Sort.Direction.DESC, "fecha"));
    }

    public List<Noticia> listarUltimas(int cantidad){
        return noticiaRepository.findAll(
                PageRequest.of(0, cantidad, Sort.by(Sort.Direction.DESC, "fecha"))
        ).getContent();
    }

    public Noticia buscarPorId(Long id){
        return noticiaRepository.findById(id).orElse(null);
    }

    public Noticia guardar(Noticia noticia){
        if (noticia.getFecha() == null) {
            noticia.setFecha(LocalDate.now());
        }
        return noticiaRepository.save(noticia);
    }

    public void eliminar(Long id){
        noticiaRepository.deleteById(id);
    }
}
