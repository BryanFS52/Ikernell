package com.ikernell.demo1.dto;

public class ReporteDesempenoDTO {

    private String persona;
    private Long totalActividades;
    private Long actividadesFinalizadas;
    private Long totalInterrupciones;
    private Long totalMinutosInterrupcion;

    public ReporteDesempenoDTO(String persona,
                               Long totalActividades,
                               Long actividadesFinalizadas,
                               Long totalInterrupciones,
                               Long totalMinutosInterrupcion) {

        this.persona = persona;
        this.totalActividades = totalActividades;
        this.actividadesFinalizadas = actividadesFinalizadas;
        this.totalInterrupciones = totalInterrupciones;
        this.totalMinutosInterrupcion = totalMinutosInterrupcion;
    }

    public String getPersona() { return persona;}
    public Long getTotalActividades() { return totalActividades; }
    public Long getActividadesFinalizadas() { return actividadesFinalizadas; }
    public Long getTotalInterrupciones() { return totalInterrupciones; }
    public Long getTotalMinutosInterrupcion() { return totalMinutosInterrupcion;}
}
