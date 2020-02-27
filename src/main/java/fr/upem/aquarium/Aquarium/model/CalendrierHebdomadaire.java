package fr.upem.aquarium.Aquarium.model;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static javax.persistence.GenerationType.AUTO;

@Entity
public class CalendrierHebdomadaire {
    @Id
    @GeneratedValue(strategy = AUTO)
    private Long id;

    private Long numero_semaine;

    @OneToMany
    private List<Activite> list_activite = new ArrayList<>();

    public CalendrierHebdomadaire(){

    }

    public CalendrierHebdomadaire(Long numero_semaine){
        this.numero_semaine = numero_semaine;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getNumero_semaine() {
        return numero_semaine;
    }

    public void setNumero_semaine(Long numero_semaine) {
        this.numero_semaine = numero_semaine;
    }

    public List<Activite> getList_activite() {
        return list_activite;
    }

    public void setList_activite(List<Activite> list_activite) {
        this.list_activite = list_activite;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CalendrierHebdomadaire that = (CalendrierHebdomadaire) o;
        return id.equals(that.id) &&
                Objects.equals(numero_semaine, that.numero_semaine) &&
                Objects.equals(list_activite, that.list_activite);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, numero_semaine, list_activite);
    }
}
