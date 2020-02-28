package fr.upem.aquarium.Aquarium.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import static javax.persistence.GenerationType.AUTO;

@Entity
public class Employe {

    @Id
    @GeneratedValue(strategy = AUTO)
    private Long id;

    private String nom;

    private String prenom;

    private String adresse;

    private Date date_naissance;

    private Long num_secu_sociale;

    private Role role;


    @Column(unique = true)
    private String login;

    private String password;

    public Employe() {
    }

    public Employe(String nom, String prenom, String adresse, Date date_naissance, Long num_secu_sociale, Role role, String login, String password) {
        this.nom = nom;
        this.prenom = prenom;
        this.adresse = adresse;
        this.date_naissance = date_naissance;
        this.num_secu_sociale = num_secu_sociale;
        this.role = role;
        this.login = login;
        this.password = password;
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

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public Date getDate_naissance() {
        return date_naissance;
    }

    public void setDate_naissance(Date date_naissance) {
        this.date_naissance = date_naissance;
    }

    public Long getNum_secu_sociale() {
        return num_secu_sociale;
    }

    public void setNum_secu_sociale(Long num_secu_sociale) {
        this.num_secu_sociale = num_secu_sociale;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Employe employe = (Employe) o;
        return Objects.equals(id, employe.id) &&
                Objects.equals(nom, employe.nom) &&
                Objects.equals(prenom, employe.prenom) &&
                Objects.equals(adresse, employe.adresse) &&
                Objects.equals(date_naissance, employe.date_naissance) &&
                Objects.equals(num_secu_sociale, employe.num_secu_sociale) &&
                role == employe.role &&
                Objects.equals(login, employe.login) &&
                Objects.equals(password, employe.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nom, prenom, adresse, date_naissance, num_secu_sociale, role, login, password);
    }
}
