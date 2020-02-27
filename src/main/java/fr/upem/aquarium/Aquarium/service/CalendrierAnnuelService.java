package fr.upem.aquarium.Aquarium.service;

import fr.upem.aquarium.Aquarium.model.*;
import fr.upem.aquarium.Aquarium.repository.AnimalRepository;
import fr.upem.aquarium.Aquarium.repository.BassinRepository;
import fr.upem.aquarium.Aquarium.repository.CalendrierAnnuelRepository;
import fr.upem.aquarium.Aquarium.repository.CalendrierHebdomadaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CalendrierAnnuelService {


    @Autowired
    private CalendrierAnnuelRepository calendrierAnnuelRepository;

    public Iterable<CalendrierAnnuel>getAll(){
        return calendrierAnnuelRepository.findAll();
    }

    public CalendrierAnnuel createCalendrierAnnuel(CalendrierAnnuel calendrierAnnuel){

        return calendrierAnnuelRepository.save(calendrierAnnuel);
    }


    public Optional<CalendrierAnnuel> getOne(Long id) {

        return calendrierAnnuelRepository.findById(id);
    }

    public void deleteCalendrierAnnuel(Long id) {

        calendrierAnnuelRepository.deleteById(id);
    }

    public CalendrierAnnuel updateCalendrierAnnuel(Long id, CalendrierAnnuel calendrierAnnuel) {
        calendrierAnnuelRepository.findById(id);
        calendrierAnnuel.setId(id);
        return calendrierAnnuelRepository.save(calendrierAnnuel);
    }


    public void deleteAll() {
        calendrierAnnuelRepository.deleteAll();
    }

    public CalendrierAnnuel addSemaine(Optional<CalendrierAnnuel> c, Optional<CalendrierHebdomadaire> calendrierHebdomadaire) {
        CalendrierAnnuel calendrierAnnuel = c.get();
        calendrierAnnuel.getList_semaine().add(calendrierHebdomadaire.get());
        return calendrierAnnuelRepository.save(calendrierAnnuel);
    }

    public CalendrierAnnuel removeSemaine(Optional<CalendrierAnnuel> c, Optional<CalendrierHebdomadaire> calendrierHebdomadaire) {
        CalendrierAnnuel calendrierAnnuel = c.get();
        calendrierAnnuel.getList_semaine().remove(calendrierHebdomadaire.get());

        return calendrierAnnuelRepository.save(calendrierAnnuel);
    }
}
