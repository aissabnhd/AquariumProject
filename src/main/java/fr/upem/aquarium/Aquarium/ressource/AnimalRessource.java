package fr.upem.aquarium.Aquarium.ressource;

import fr.upem.aquarium.Aquarium.model.Animal;
import fr.upem.aquarium.Aquarium.service.AnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class AnimalRessource {
    @Autowired
    private AnimalService animalService;

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

    @DeleteMapping("animal/{id}")
    public void deleteAnimal(@PathVariable Long id) {
        animalService.deleteAnimal(id);
    }

    @PostMapping("animal/{id}")
    public Animal putAnimal(@PathVariable Long id, @RequestBody Animal animal) {
        return animalService.updateAnimal(id, animal);
    }
}
