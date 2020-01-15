package fr.upem.aquarium.Aquarium.ressource;

import fr.upem.aquarium.Aquarium.model.Animal;
import fr.upem.aquarium.Aquarium.model.CalendrierHebdomadaire;
import fr.upem.aquarium.Aquarium.model.Espece;
import fr.upem.aquarium.Aquarium.service.ActiviteService;
import fr.upem.aquarium.Aquarium.service.AnimalService;
import fr.upem.aquarium.Aquarium.service.CalendrierHebdomadaireService;
import fr.upem.aquarium.Aquarium.service.EspeceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class CalendrierHebdomadaireRessource {
    @Autowired
    private CalendrierHebdomadaireService calendrierHebdomadaireService;

    @Autowired
    private ActiviteService activiteService;

    @GetMapping("/calendrier_hebdomadaire")
    public Iterable<CalendrierHebdomadaire> getAll() {
        return calendrierHebdomadaireService.getAll();
    }

    @PostMapping("/calendrier_hebdomadaire")
    public CalendrierHebdomadaire postCalendrierHebdomadaire(@RequestBody CalendrierHebdomadaire calendrierHebdomadaire) {
        return calendrierHebdomadaireService.createCalendrierHebdomadaire(calendrierHebdomadaire);
    }

    @GetMapping("calendrier_hebdomadaire/{id}")
    public Optional<CalendrierHebdomadaire> getOne(@PathVariable Long id) {
        //@PathVariable {id}
        return calendrierHebdomadaireService.getOne(id);
    }

    @GetMapping("calendrier_hebdomadaire/{id}/{id2}")
    public void addActiviteCalendrierHebdo(@PathVariable Long id, @PathVariable Long id2) {

        calendrierHebdomadaireService.addActivite(calendrierHebdomadaireService.getOne(id), activiteService.getOne(id2));

    }


    @DeleteMapping("calendrier_hebdomadaire/{id}/{id2}")
    public void removeActiviteCalendrierHebdo(@PathVariable Long id, @PathVariable Long id2){
        calendrierHebdomadaireService.removeActivite(calendrierHebdomadaireService.getOne(id), activiteService.getOne(id2));
    }

    @DeleteMapping("calendrier_hebdomadaire/{id}")
    public void deleteCalendrierHebdomadaire(@PathVariable Long id) {
        calendrierHebdomadaireService.deleteCalendrierHebdomadaire(id);
    }

    @DeleteMapping("calendrier_hebdomadaire")
    public void deleteAll(){ calendrierHebdomadaireService.deleteAll(); }

    @PostMapping("calendrier_hebdomadaire/{id}")
    public CalendrierHebdomadaire putCalendrier(@PathVariable Long id, @RequestBody CalendrierHebdomadaire calendrierHebdomadaire) {
        return calendrierHebdomadaireService.updateCalendrierHebdomadaire(id, calendrierHebdomadaire);
    }
}
