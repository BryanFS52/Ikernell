package com.ikernell.demo1.repositories;
import com.ikernell.demo1.entities.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RolRepository extends JpaRepository<Rol,Long>{

    Optional<Rol> findByNombre(String nombre);
}
