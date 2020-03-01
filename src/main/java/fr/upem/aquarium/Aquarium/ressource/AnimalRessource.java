package fr.upem.aquarium.Aquarium.ressource;

import fr.upem.aquarium.Aquarium.model.Animal;
import fr.upem.aquarium.Aquarium.model.Espece;
import fr.upem.aquarium.Aquarium.service.AnimalService;
import fr.upem.aquarium.Aquarium.service.EspeceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public Animal postAnimal(@RequestBody Animal animal) {
        return animalService.createAnimal(animal);
    }

    @GetMapping("animal/{id}")
    public Optional<Animal> getOne(@PathVariable Long id) {
        //@PathVariable {id}
        return animalService.getOne(id);
    }

    @GetMapping("/animauxOfEspece/{idEspece}")
    public Iterable<Animal> getAnimauxOfEspece(@PathVariable Long idEspece) {


        return animalService.getAnimauxOfEspece(idEspece);
    }


    @PostMapping("/animal_espece/{id}")
    public Animal postAnimalWithEspece(@RequestBody Animal animal, @PathVariable Long id) {
        Optional<Espece> e = (especeService.getOne(id));
        return animalService.createAnimalEspece(animal, e.get());
    }


    @DeleteMapping("animal/{id}")
    public void deleteAnimal(@PathVariable Long id) {
        animalService.deleteAnimal(id);
    }

    @DeleteMapping("animal")
    public void deleteAll(){ animalService.deleteAll() ;}

    @PostMapping("animal/{id}")
    public Animal putAnimal(@PathVariable Long id, @RequestBody Animal animal) {
        return animalService.updateAnimal(id, animal);
    }
}
