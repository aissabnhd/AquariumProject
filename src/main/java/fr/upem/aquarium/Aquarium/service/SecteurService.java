package fr.upem.aquarium.Aquarium.service;

import fr.upem.aquarium.Aquarium.model.Animal;
import fr.upem.aquarium.Aquarium.model.Bassin;
import fr.upem.aquarium.Aquarium.model.Espece;
import fr.upem.aquarium.Aquarium.model.Secteur;
import fr.upem.aquarium.Aquarium.repository.AnimalRepository;
import fr.upem.aquarium.Aquarium.repository.BassinRepository;
import fr.upem.aquarium.Aquarium.repository.SecteurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Service
public class SecteurService {


    @Autowired
    private SecteurRepository secteurRepository;

    public Iterable<Secteur>getAll(){
        return secteurRepository.findAll();
    }

    public Secteur createSecteur(Secteur secteur){

        return secteurRepository.save(secteur);
    }


    public Optional<Secteur> getOne(Long id) {

        return secteurRepository.findById(id);
    }

    public void deleteSecteur(Long id) {

        secteurRepository.deleteById(id);
    }

    public Secteur updateSecteur(Long id, Secteur secteur) {
        secteurRepository.findById(id);
        secteur.setId(id);
        secteur.setLstBassin( secteurRepository.findById(id).get().getLstBassin());
        return secteurRepository.save(secteur);
    }


    public void deleteAll() {
        secteurRepository.deleteAll();
    }

    public Secteur addBassin(Optional<Secteur> secteurServiceOne, Optional<Bassin> one) {
        Secteur s = secteurServiceOne.get();

        s.getLstBassin().add(one.get());
        return secteurRepository.save(s);
    }

    public Secteur removeBassin(Optional<Secteur> one, Optional<Bassin> one1) {
        Secteur s = one.get();
        s.getLstBassin().remove(one1.get());

        return secteurRepository.save(s);
    }

    public Optional<Secteur> getFromBassin(Long idBassin) {
        Iterable l = secteurRepository.findAll();
        Iterator<Secteur> iterator = l.iterator();

        List<Secteur> lst = new ArrayList<>();
        while (iterator.hasNext()) {
            lst.add(iterator.next());
        }

        for(int i = 0; i < lst.size();i++){
            for(int j = 0; j < lst.get(i).getLstBassin().size(); j++){
                if(lst.get(i).getLstBassin().get(j).getId() == idBassin)
                    return Optional.of(lst.get(i));
            }
        }
        return Optional.empty();
    }
}
