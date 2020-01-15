package fr.upem.aquarium.Aquarium.ressource;

import fr.upem.aquarium.Aquarium.model.Activite;
import fr.upem.aquarium.Aquarium.model.Animal;
import fr.upem.aquarium.Aquarium.model.Bassin;
import fr.upem.aquarium.Aquarium.model.Espece;
import fr.upem.aquarium.Aquarium.service.ActiviteService;
import fr.upem.aquarium.Aquarium.service.AnimalService;
import fr.upem.aquarium.Aquarium.service.BassinService;
import fr.upem.aquarium.Aquarium.service.EspeceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class ActiviteRessource {
    @Autowired
    private ActiviteService activiteService;

    @Autowired
    private BassinService bassinService;

    @GetMapping("/activite")
    public Iterable<Activite> getAll() {
        return activiteService.getAll();
    }

    @PostMapping("/activite")
    public Activite postActivite(@RequestBody Activite activite) {
        return activiteService.createActivite(activite);
    }

    @GetMapping("activite/{id}")
    public Optional<Activite> getOne(@PathVariable Long id) {
        //@PathVariable {id}
        return activiteService.getOne(id);
    }

    @PostMapping("/activite_bassin/{id}")
    public Activite postActiviteWithBassin(@RequestBody Activite activite, @PathVariable Long id) {
        Optional<Bassin> e = (bassinService.getOne(id));
        return activiteService.createActiviteBassin(activite, e.get());
    }

    @DeleteMapping("activite/{id}")
    public void deleteActivite(@PathVariable Long id) {
        activiteService.deleteActivite(id);
    }

    @DeleteMapping("activite")
    public void deleteAll(){ activiteService.deleteAll() ;}

    @PostMapping("activite/{id}")
    public Activite putActivite(@PathVariable Long id, @RequestBody Activite activite) {
        return activiteService.updateActivite(id, activite);
    }
}
