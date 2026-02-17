package com.ikernell.demo1.repositories;
import com.ikernell.demo1.entities.Persona;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PersonaRepository extends JpaRepository<Persona,Long>{

    List<Persona> findByEstadoTrue();
    List<Persona> findByEstadoFalse();
    List<Persona> findByEstadoTrueAndRol_NombreIn(List<String> nombres);
    Optional<Persona> findByDocumentoAndPassword(String documento, String password);
}
