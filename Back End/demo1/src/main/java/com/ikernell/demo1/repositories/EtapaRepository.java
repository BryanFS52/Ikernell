package com.ikernell.demo1.repositories;
import com.ikernell.demo1.entities.Etapa;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface EtapaRepository extends JpaRepository<Etapa,Long>{

    Optional<Etapa> findByNombre(String nombre);
}
