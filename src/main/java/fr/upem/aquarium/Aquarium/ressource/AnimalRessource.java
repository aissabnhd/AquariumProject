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

    @PostMapping("/animal_espece")
    public Animal postAnimalWithEspece(@RequestBody Animal animal) {
        Optional<Espece> e = (especeService.getOne(animal.getEspece().getId()));
        animal.setEspece(e.get());
        return animalService.createAnimal(animal);
    }


    @DeleteMapping("animal/{id}")
    public void deleteAnimal(@PathVariable Long id) {
        animalService.deleteAnimal(id);
    }

    @PostMapping("animal/{id}")
    public Animal putAnimal(@PathVariable Long id, @RequestBody Animal animal) {
        return animalService.updateAnimal(id, animal);
    }
}
