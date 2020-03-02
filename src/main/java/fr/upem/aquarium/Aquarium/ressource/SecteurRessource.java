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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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
    public ResponseEntity<Secteur> postSecteur(@RequestBody Secteur secteur) {

        return new ResponseEntity<>(secteurService.createSecteur(secteur), HttpStatus.CREATED);

    }

    @GetMapping("secteur/{id}")
    public Optional<Secteur> getOne(@PathVariable Long id) {
        //@PathVariable {id}
        if(!secteurService.getOne(id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Secteur avec l'id " + id + " n'existe pas");

        return secteurService.getOne(id);
    }

    @GetMapping("secteurs/{id}/{id2}")
    public void assignBassinSecteur(@PathVariable Long id, @PathVariable Long id2) {
        if(!bassinService.getOne(id2).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Bassin avec l'id " + id2 + " n'existe pas");
        if(!secteurService.getOne(id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Secteur avec l'id " + id + " n'existe pas");

        secteurService.addBassin(secteurService.getOne(id), bassinService.getOne(id2));

    }


    @DeleteMapping("secteurs/{id}/{id2}")
    public void removeBassinSecteur(@PathVariable Long id, @PathVariable Long id2){
        if(!bassinService.getOne(id2).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Bassin avec l'id " + id2 + " n'existe pas");
        if(!secteurService.getOne(id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Secteur avec l'id " + id + " n'existe pas");

        secteurService.removeBassin(secteurService.getOne(id), bassinService.getOne(id2));
    }

    @DeleteMapping("secteur/{id}")
    public void deleteSecteur(@PathVariable Long id) {

        if(!secteurService.getOne(id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Secteur avec l'id " + id + " n'existe pas");

        if(secteurService.getOne(id).get().getLstBassin().size()>0)
            throw new ResponseStatusException(HttpStatus.LOCKED, "Le secteur contient des bassins -> suppression impossible");

        secteurService.deleteSecteur(id);
    }

    @DeleteMapping("secteur")
    public void deleteAll(){ secteurService.deleteAll() ;}

    @PostMapping("secteur/{id}")
    public Secteur putSecteur(@PathVariable Long id, @RequestBody Secteur secteur) {
        if(!secteurService.getOne(id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Secteur avec l'id " + id + " n'existe pas");

        return secteurService.updateSecteur(id, secteur);
    }

    @GetMapping("secteurFromBassin/{idBassin}")
    public Optional<Secteur> getFromBassin(@PathVariable Long idBassin) {
        //@PathVariable {id}
        if(!bassinService.getOne(idBassin).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Bassin avec l'id " + idBassin + " n'existe pas");

        return secteurService.getFromBassin(idBassin);
    }
}
