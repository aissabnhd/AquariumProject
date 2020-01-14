package fr.upem.aquarium.Aquarium.model;

import fr.upem.aquarium.Aquarium.service.EspeceService;
import org.springframework.web.bind.annotation.ModelAttribute;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import static javax.persistence.GenerationType.AUTO;

@Entity
public class Secteur {
    @Id
    @GeneratedValue(strategy = AUTO)
    private Long id;

    private String nom;

    private String localisation;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Secteur secteur = (Secteur) o;
        return id.equals(secteur.id) &&
                Objects.equals(nom, secteur.nom) &&
                Objects.equals(localisation, secteur.localisation) &&
                Objects.equals(lstBassin, secteur.lstBassin);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nom, localisation, lstBassin);
    }

    @OneToMany
    private List<Bassin> lstBassin = new ArrayList<>();

    public Secteur(){

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

    public String getLocalisation() {
        return localisation;
    }

    public void setLocalisation(String localisation) {
        this.localisation = localisation;
    }

    public List<Bassin> getLstBassin() {
        return lstBassin;
    }

    public void setLstBassin(List<Bassin> lstBassin) {
        this.lstBassin = lstBassin;
    }

    public Secteur(String nom, String localisation){
        this.nom = nom;
        this.localisation = localisation;
    }
}
