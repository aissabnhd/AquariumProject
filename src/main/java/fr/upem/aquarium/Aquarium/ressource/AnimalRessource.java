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
public class AnimalRessource {
    @Autowired
    private AnimalService animalService;
    @Autowired
    private EspeceService especeService;

    @GetMapping("/animal")
    public Iterable<Animal> getAll() {
        return animalService.getAll();
    }

    @PostMapping("/animal")
    public ResponseEntity<Animal> postAnimal(@RequestBody Animal animal) {

        return new ResponseEntity<>(animalService.createAnimal(animal), HttpStatus.CREATED);

    }

    @GetMapping("animal/{id}")
    public Optional<Animal> getOne(@PathVariable Long id) {
        //@PathVariable {id}
        if(!animalService.getOne(id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Animal avec l'id " + id + " n'existe pas");



        return animalService.getOne(id);
    }

    @GetMapping("/animauxOfEspece/{idEspece}")
    public Iterable<Animal> getAnimauxOfEspece(@PathVariable Long idEspece) {

        if(!especeService.getOne(idEspece).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Espèce avec l'id " + idEspece + " n'existe pas");



        return animalService.getAnimauxOfEspece(idEspece);
    }


    @PostMapping("/animal_espece/{id}")
    public ResponseEntity<Animal> postAnimalWithEspece(@RequestBody Animal animal, @PathVariable Long id) {
        if(!especeService.getOne(id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Espèce avec l'id " + id + " n'existe pas");



        Optional<Espece> e = (especeService.getOne(id));
        return new ResponseEntity<>(animalService.createAnimalEspece(animal, e.get()), HttpStatus.CREATED);

    }


    @DeleteMapping("animal/{id}")
    public void deleteAnimal(@PathVariable Long id) {

        if(!animalService.getOne(id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Animal avec l'id " + id + " n'existe pas");


        animalService.deleteAnimal(id);
    }

    @DeleteMapping("animal")
    public void deleteAll(){ animalService.deleteAll() ;}

    @PostMapping("animal/{id}")
    public Animal putAnimal(@PathVariable Long id, @RequestBody Animal animal) {
        if(!animalService.getOne(id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Animal avec l'id " + id + " n'existe pas");



        return animalService.updateAnimal(id, animal);
    }
}
