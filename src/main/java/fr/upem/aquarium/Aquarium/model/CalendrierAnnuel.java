package fr.upem.aquarium.Aquarium.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static javax.persistence.GenerationType.AUTO;

@Entity
public class CalendrierAnnuel {
    @Id
    @GeneratedValue(strategy = AUTO)
    private Long id;

    private int annee;

    @OneToMany
    private List<CalendrierHebdomadaire> list_semaine = new ArrayList<>();

    public CalendrierAnnuel(){

    }

    public CalendrierAnnuel(int annee){
        this.annee = annee;
    }

    public List<CalendrierHebdomadaire> getList_semaine(){
        return list_semaine;
    }

    public void setList_semaine(List<CalendrierHebdomadaire> lst){
        this.list_semaine = lst;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getAnnee() {
        return annee;
    }

    public void setAnnee(int annee) {
        this.annee = annee;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CalendrierAnnuel that = (CalendrierAnnuel) o;
        return annee == that.annee &&
                Objects.equals(id, that.id) &&
                Objects.equals(list_semaine, that.list_semaine);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, annee, list_semaine);
    }
}
