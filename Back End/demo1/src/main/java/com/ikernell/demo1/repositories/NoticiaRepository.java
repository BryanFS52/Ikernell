package com.ikernell.demo1.repositories;
import com.ikernell.demo1.entities.Noticia;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticiaRepository extends JpaRepository<Noticia,Long>{

}
