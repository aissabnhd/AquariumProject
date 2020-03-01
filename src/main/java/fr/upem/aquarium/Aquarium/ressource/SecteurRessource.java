package fr.upem.aquarium.Aquarium.ressource;

import fr.upem.aquarium.Aquarium.model.Animal;
import fr.upem.aquarium.Aquarium.model.Bassin;
import fr.upem.aquarium.Aquarium.model.Espece;
import fr.upem.aquarium.Aquarium.model.Secteur;
import fr.upem.aquarium.Aquarium.service.AnimalService;
import fr.upem.aquarium.Aquarium.service.BassinService;
import fr.upem.aquarium.Aquarium.service.EspeceService;
import fr.upem.aquarium.Aquarium.service.SecteurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class SecteurRessource {
    @Autowired
    private SecteurService secteurService;
    @Autowired
    private BassinService bassinService;

    @GetMapping("/secteur")
    public Iterable<Secteur> getAll() {
        return secteurService.getAll();
    }

    @PostMapping("/secteur")
    public Secteur postSecteur(@RequestBody Secteur secteur) {
        return secteurService.createSecteur(secteur);
    }

    @GetMapping("secteur/{id}")
    public Optional<Secteur> getOne(@PathVariable Long id) {
        //@PathVariable {id}
        return secteurService.getOne(id);
    }

    @GetMapping("secteurs/{id}/{id2}")
    public void assignBassinSecteur(@PathVariable Long id, @PathVariable Long id2) {

        secteurService.addBassin(secteurService.getOne(id), bassinService.getOne(id2));

    }


    @DeleteMapping("secteurs/{id}/{id2}")
    public void removeBassinSecteur(@PathVariable Long id, @PathVariable Long id2){
        secteurService.removeBassin(secteurService.getOne(id), bassinService.getOne(id2));
    }

    @DeleteMapping("secteur/{id}")
    public void deleteSecteur(@PathVariable Long id) {
        secteurService.deleteSecteur(id);
    }

    @DeleteMapping("secteur")
    public void deleteAll(){ secteurService.deleteAll() ;}

    @PostMapping("secteur/{id}")
    public Secteur putSecteur(@PathVariable Long id, @RequestBody Secteur secteur) {
        return secteurService.updateSecteur(id, secteur);
    }

    @GetMapping("secteurFromBassin/{idBassin}")
    public Optional<Secteur> getFromBassin(@PathVariable Long idBassin) {
        //@PathVariable {id}
        return secteurService.getFromBassin(idBassin);
    }
}
