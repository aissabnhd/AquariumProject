package fr.upem.aquarium.Aquarium.ressource;

import fr.upem.aquarium.Aquarium.model.Animal;
import fr.upem.aquarium.Aquarium.model.CalendrierAnnuel;
import fr.upem.aquarium.Aquarium.model.CalendrierHebdomadaire;
import fr.upem.aquarium.Aquarium.model.Espece;
import fr.upem.aquarium.Aquarium.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class CalendrierAnnuelRessource {
    @Autowired
    private CalendrierAnnuelService calendrierAnnuelService;

    @Autowired
    private CalendrierHebdomadaireService calendrierHebdomadaireService;

    @GetMapping("/calendrier_annuel")
    public Iterable<CalendrierAnnuel> getAll() {
        return calendrierAnnuelService.getAll();
    }

    @PostMapping("/calendrier_annuel")
    public CalendrierAnnuel postCCalendrierAnnuel(@RequestBody CalendrierAnnuel calendrierAnnuel) {
        return calendrierAnnuelService.createCalendrierAnnuel(calendrierAnnuel);
    }

    @GetMapping("calendrier_annuel/{id}")
    public Optional<CalendrierAnnuel> getOne(@PathVariable Long id) {
        //@PathVariable {id}
        return calendrierAnnuelService.getOne(id);
    }

    @GetMapping("calendrier_annuel/{id}/{id2}")
    public void addCalendrierSemaine(@PathVariable Long id, @PathVariable Long id2) {
        calendrierAnnuelService.addSemaine(calendrierAnnuelService.getOne(id), calendrierHebdomadaireService.getOne(id2));
    }

    @DeleteMapping("calendrier_annuel/{id}/{id2}")
    public void removeCalendrierSemaine(@PathVariable Long id, @PathVariable Long id2){
        calendrierAnnuelService.removeSemaine(calendrierAnnuelService.getOne(id), calendrierHebdomadaireService.getOne(id2));
    }

    @DeleteMapping("calendrier_annuel/{id}")
    public void deleteCalendrierAnnuel(@PathVariable Long id) {
        calendrierAnnuelService.deleteCalendrierAnnuel(id);
    }

    @DeleteMapping("calendrier_annuel")
    public void deleteAll(){ calendrierAnnuelService.deleteAll(); }

    @PostMapping("calendrier_annuel/{id}")
    public CalendrierAnnuel putCalendrierAnnuel(@PathVariable Long id, @RequestBody CalendrierAnnuel calendrierAnnuel) {
        return calendrierAnnuelService.updateCalendrierAnnuel(id, calendrierAnnuel);
    }
}
