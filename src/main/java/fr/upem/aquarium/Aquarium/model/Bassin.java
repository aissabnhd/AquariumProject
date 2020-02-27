package fr.upem.aquarium.Aquarium.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static javax.persistence.GenerationType.AUTO;

@Entity
public class Bassin {

    @Id
    @GeneratedValue(strategy = AUTO)
    private Long id;

    private String nom;

    private int capacite_max;

    private int volume;

    private State etat;

    @ManyToOne
    private Employe responsable;

    public Employe getResponsable() {
        return responsable;
    }

    public void setResponsable(Employe responsable) {
        this.responsable = responsable;
    }

    @OneToMany
    private List<Espece> lst = new ArrayList<>();

    public Bassin(String nom, int capacite_max, int volume, State etat){
        this.nom = nom;
        this.capacite_max = capacite_max;
        this.volume = volume;
        this.etat = etat;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Bassin bassin = (Bassin) o;
        return capacite_max == bassin.capacite_max &&
                volume == bassin.volume &&
                id.equals(bassin.id) &&
                etat.equals(bassin.etat) &&
                Objects.equals(lst, bassin.lst);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, capacite_max, volume, etat, lst);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getCapacite_max() {
        return capacite_max;
    }

    public void setCapacite_max(int capacite_max) {
        this.capacite_max = capacite_max;
    }

    public int getVolume() {
        return volume;
    }

    public void setVolume(int volume) {
        this.volume = volume;
    }

    public State getEtat() {
        return etat;
    }

    public void setEtat(State etat) {
        this.etat = etat;
    }

    public List<Espece> getLst() {
        return lst;
    }

    public void setLst(List<Espece> lst) {
        this.lst = lst;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getNom(){
        return nom;
    }

    public Bassin(){

    }

}
