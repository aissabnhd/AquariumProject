package fr.upem.aquarium.Aquarium.ressource;

import fr.upem.aquarium.Aquarium.model.Animal;
import fr.upem.aquarium.Aquarium.model.Espece;
import fr.upem.aquarium.Aquarium.service.AnimalService;
import fr.upem.aquarium.Aquarium.service.EspeceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
public class EspeceRessource {
    @Autowired
    private EspeceService especeService;

    @GetMapping("/espece")
    public Iterable<Espece> getAll() {
        return especeService.getAll();
    }

    @PostMapping("/espece")
    public ResponseEntity<Espece> postEspece(@RequestBody Espece espece) {

        return new ResponseEntity<>(especeService.createEspece(espece), HttpStatus.CREATED);

    }

    @GetMapping("espece/{id}")
    public Optional<Espece> getOne(@PathVariable Long id) {
        //@PathVariable {id}
        if(!especeService.getOne(id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Espèce avec l'id " + id + " n'existe pas");

        return especeService.getOne(id);
    }

    @DeleteMapping("espece/{id}")
    public void deleteEspece(@PathVariable Long id) {

        if(!especeService.getOne(id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Espèce avec l'id " + id + " n'existe pas");

        especeService.deleteEspece(id);
    }

    @DeleteMapping("espece")
    public void deleteAll(){ especeService.deleteAll(); }

    @PostMapping("espece/{id}")
    public Espece putEspece(@PathVariable Long id, @RequestBody Espece espece) {
        if(!especeService.getOne(id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Espèce avec l'id " + id + " n'existe pas");

        return especeService.updateEspece(id, espece);
    }
}
