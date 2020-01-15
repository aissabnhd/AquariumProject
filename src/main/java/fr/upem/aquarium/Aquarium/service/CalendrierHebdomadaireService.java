package fr.upem.aquarium.Aquarium.service;

import fr.upem.aquarium.Aquarium.model.*;
import fr.upem.aquarium.Aquarium.repository.AnimalRepository;
import fr.upem.aquarium.Aquarium.repository.BassinRepository;
import fr.upem.aquarium.Aquarium.repository.CalendrierHebdomadaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CalendrierHebdomadaireService {


    @Autowired
    private CalendrierHebdomadaireRepository calendrierHebdomadaireRepository;

    public Iterable<CalendrierHebdomadaire>getAll(){
        return calendrierHebdomadaireRepository.findAll();
    }

    public CalendrierHebdomadaire createCalendrierHebdomadaire(CalendrierHebdomadaire calendrierHebdomadaire){

        return calendrierHebdomadaireRepository.save(calendrierHebdomadaire);
    }


    public Optional<CalendrierHebdomadaire> getOne(Long id) {

        return calendrierHebdomadaireRepository.findById(id);
    }

    public void deleteCalendrierHebdomadaire(Long id) {

        calendrierHebdomadaireRepository.deleteById(id);
    }

    public CalendrierHebdomadaire updateCalendrierHebdomadaire(Long id, CalendrierHebdomadaire calendrierHebdomadaire) {
        calendrierHebdomadaireRepository.findById(id);
        calendrierHebdomadaire.setId(id);
        return calendrierHebdomadaireRepository.save(calendrierHebdomadaire);
    }


    public void deleteAll() {
        calendrierHebdomadaireRepository.deleteAll();
    }

    public CalendrierHebdomadaire addActivite(Optional<CalendrierHebdomadaire> c, Optional<Activite> activite) {
        CalendrierHebdomadaire calendrierHebdomadaire = c.get();
        calendrierHebdomadaire.getList_activite().add(activite.get());
        return calendrierHebdomadaireRepository.save(calendrierHebdomadaire);
    }

    public CalendrierHebdomadaire removeActivite(Optional<CalendrierHebdomadaire> c, Optional<Activite> activite) {
        CalendrierHebdomadaire calendrierHebdomadaire = c.get();
        calendrierHebdomadaire.getList_activite().remove(activite.get());

        return calendrierHebdomadaireRepository.save(calendrierHebdomadaire);
    }
}
