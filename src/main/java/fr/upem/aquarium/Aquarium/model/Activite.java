package fr.upem.aquarium.Aquarium.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import java.util.Date;
import java.util.Objects;

import static javax.persistence.GenerationType.AUTO;

@Entity
public class Activite {

    @Id
    @GeneratedValue(strategy = AUTO)
    private Long id;

    private String nom;

    private Date date_debut;

    private Date date_fin;

    private boolean public_act;

    @OneToOne
    private Bassin bassin;

    public Activite(){

    }

    public Activite(String nom, Date date_debut, Date date_fin, boolean public_act, Bassin b){
        this.nom = nom;
        this.date_debut = date_debut;
        this.date_fin = date_fin;
        this.public_act = public_act;
        this.bassin = b;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Date getDate_debut() {
        return date_debut;
    }

    public void setDate_debut(Date date_debut) {
        this.date_debut = date_debut;
    }

    public Date getDate_fin() {
        return date_fin;
    }

    public void setDate_fin(Date date_fin) {
        this.date_fin = date_fin;
    }

    public boolean isPublic_act() {
        return public_act;
    }

    public void setPublic_act(boolean public_act) {
        this.public_act = public_act;
    }

    public void setBassin(Bassin bassin){
        this.bassin = bassin;
    }

    public Bassin getBassin(){
        return this.bassin;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Activite activite = (Activite) o;
        return public_act == activite.public_act &&
                id.equals(activite.id) &&
                Objects.equals(nom, activite.nom) &&
                Objects.equals(date_debut, activite.date_debut) &&
                Objects.equals(date_fin, activite.date_fin);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nom, date_debut, date_fin, public_act);
    }
}
