package com.ikernell.demo1.config;

import com.ikernell.demo1.entities.Etapa;
import com.ikernell.demo1.entities.Rol;
import com.ikernell.demo1.repositories.EtapaRepository;
import com.ikernell.demo1.repositories.RolRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initRoles(RolRepository rolRepository) {
        return args -> {

            List<Rol> rolesIniciales = List.of(
                    new Rol("Coordinador de proyectos"),
                    new Rol("Lider de proyectos"),
                    new Rol("Desarrollador")
            );

            for (Rol rolData : rolesIniciales) {
                rolRepository.findByNombre(rolData.getNombre())
                        .orElseGet(() -> rolRepository.save(rolData));
            }

            System.out.println("Roles iniciales cargados.");
        };
    }

    @Bean
    CommandLineRunner initEtapas(EtapaRepository etapaRepository) {
        return args -> {

            List<Etapa> etapasIniciales = List.of(
                    new Etapa(null, "Inicio", "Definir ideas y objetivos"),
                    new Etapa(null, "Planificación", "Creación del plan detallado"),
                    new Etapa(null, "Ejecución", "Desarrollo del proyecto"),
                    new Etapa(null, "Seguimiento", "Monitoreo del proyecto"),
                    new Etapa(null, "Cierre", "Finalización del proyecto")
            );

            for (Etapa etapaData : etapasIniciales) {
                etapaRepository.findByNombre(etapaData.getNombre())
                        .orElseGet(() -> etapaRepository.save(etapaData));
            }

            System.out.println("Etapas iniciales cargadas con descripción.");
        };
    }
}
