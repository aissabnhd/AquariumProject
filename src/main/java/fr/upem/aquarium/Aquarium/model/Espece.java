package fr.upem.aquarium.Aquarium.model;

import java.util.Objects;

public class Espece {

    private String nom;

    private int esperance;

    private String regime;

    //  0 (préoccupation mineure) à 10 (espèce éteinte au niveau
    //  sauvage, survivant uniquement en captivité).
    private int menace;

    public Espece(){

    }

    public Espece(String nom, int esperance, String regime, int menace){
        this.nom = nom;
        this.esperance = esperance;
        this.regime = regime;
        this.menace = menace;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public int getEsperance() {
        return esperance;
    }

    public void setEsperance(int esperance) {
        this.esperance = esperance;
    }

    public String getRegime() {
        return regime;
    }

    public void setRegime(String regime) {
        this.regime = regime;
    }

    public int getMenace() {
        return menace;
    }

    public void setMenace(int menace) {
        this.menace = menace;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Espece espece = (Espece) o;
        return esperance == espece.esperance &&
                menace == espece.menace &&
                Objects.equals(nom, espece.nom) &&
                Objects.equals(regime, espece.regime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(nom, esperance, regime, menace);
    }
}
