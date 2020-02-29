package fr.upem.aquarium.Aquarium.service;

import fr.upem.aquarium.Aquarium.model.Activite;
import fr.upem.aquarium.Aquarium.model.Bassin;
import fr.upem.aquarium.Aquarium.model.Employe;
import fr.upem.aquarium.Aquarium.model.Espece;
import fr.upem.aquarium.Aquarium.repository.ActiviteRepository;
import fr.upem.aquarium.Aquarium.repository.EspeceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Service
public class ActiviteService {


    @Autowired
    private ActiviteRepository activiteRepository;

    public Iterable<Activite>getAll(){
        return activiteRepository.findAll();
    }

    public Activite createActivite(Activite activite){

        return activiteRepository.save(activite);
    }


    public Optional<Activite> getOne(Long id) {

        return activiteRepository.findById(id);
    }

    public void deleteActivite(Long id) {

        activiteRepository.deleteById(id);
    }

    public Activite updateActivite(Long id, Activite activite) {
        activiteRepository.findById(id);
        activite.setId(id);
        return activiteRepository.save(activite);
    }


    public void deleteAll() {
        activiteRepository.deleteAll();
    }

    public Activite createActiviteBassin(Activite activite, Bassin bassin) {
        activite.setBassin(bassin);
        return activiteRepository.save(activite);

    }

    public Activite updateActiviteAddEmploye(Long id, Activite activite, Optional<Employe> one) {
        Bassin b = activiteRepository.findById(id).get().getBassin();
        List<Employe> l = activite.getResponsables();
        l.add(one.get());
        activite.setResponsables(l);
        activite.setId(id);
        activite.setBassin(b);
        return activiteRepository.save(activite);
    }

    public Iterable<Activite> getActivitesOfEmployes(Employe e) {
        Iterable l = activiteRepository.findAll();
        Iterator<Activite> iterator = l.iterator();

        List<Activite> lst = new ArrayList<>();
        while (iterator.hasNext()) {
            lst.add(iterator.next());
        }

        for(int i = 0; i < lst.size();i++){
            if(!lst.get(i).getResponsables().contains(e)){
                lst.remove(i);
            }
        }
        return lst;
    }

    public Iterable<Activite> getActivitesOfBassin(Bassin bassin) {
        Iterable l = activiteRepository.findAll();
        Iterator<Activite> iterator = l.iterator();

        List<Activite> lst = new ArrayList<>();
        while (iterator.hasNext()) {
            lst.add(iterator.next());
        }

        for(int i = 0; i < lst.size();i++){
            if(lst.get(i).getBassin().getId() != bassin.getId()){
                lst.remove(i);
            }
        }
        return lst;
    }
}
