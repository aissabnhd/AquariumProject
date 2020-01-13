package fr.upem.aquarium.Aquarium.model;

import fr.upem.aquarium.Aquarium.service.EspeceService;
import org.springframework.web.bind.annotation.ModelAttribute;

import javax.persistence.*;

import java.util.Date;
import java.util.Objects;

import static javax.persistence.GenerationType.AUTO;

@Entity
public class Animal {
    @Id
    @GeneratedValue(strategy = AUTO)
    private Long id;

    private String nom;

    private Sexe sexe;

    @ManyToOne
    private Espece espece;

    private String signe_distinctif;

    private Date date_arrive;

    private Date date_depart;

    public Animal(){
    }

    public Animal(String nom){
        this.nom = nom;
    }
    public Animal(String nom, String signe_distinctif){
        this.nom = nom;
        this.signe_distinctif = "test_espece";
        this.signe_distinctif = "test_espece2";
    }

    public Animal(String nom, Sexe sexe, Espece espece, String signe_distinctif, Date date_arrive){
        this.nom = nom;
        this.sexe = sexe;
        this.espece = espece;
        this.signe_distinctif = signe_distinctif;
        this.date_arrive = date_arrive;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Sexe getSexe() {
        return sexe;
    }

    public void setSexe(Sexe sexe) {
        this.sexe = sexe;
    }

   public Espece getEspece() {
        return espece;
    }

    public void setEspece(Espece espece) {
        this.espece = espece;
    }

    public String getSigne_distinctif() {
        return signe_distinctif;
    }

    public void setSigne_distinctif(String signe_distinctif) {
        this.signe_distinctif = signe_distinctif;
    }

    public Date getDate_arrive() {
        return date_arrive;
    }

    public void setDate_arrive(Date date_arrive) {
        this.date_arrive = date_arrive;
    }

    public Date getDate_depart() {
        return date_depart;
    }

    public void setDate_depart(Date date_depart) {
        this.date_depart = date_depart;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Animal animal = (Animal) o;
        return id.equals(animal.id) &&
                Objects.equals(nom, animal.nom) &&
                Objects.equals(sexe, animal.sexe) &&
                //Objects.equals(espece, animal.espece) &&
                Objects.equals(signe_distinctif, animal.signe_distinctif) &&
                Objects.equals(date_arrive, animal.date_arrive) &&
                Objects.equals(date_depart, animal.date_depart);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nom, sexe, /*espece,*/ signe_distinctif, date_arrive, date_depart);
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return this.id;
    }
}
