package fr.upem.aquarium.Aquarium.ressource;

import fr.upem.aquarium.Aquarium.model.Animal;
import fr.upem.aquarium.Aquarium.model.Employe;
import fr.upem.aquarium.Aquarium.model.Espece;
import fr.upem.aquarium.Aquarium.service.AnimalService;
import fr.upem.aquarium.Aquarium.service.EmployeService;
import fr.upem.aquarium.Aquarium.service.EspeceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class EmployeRessource {
    @Autowired
    private EmployeService employeService;

    @GetMapping("/employe")
    public Iterable<Employe> getAll() {
        return employeService.getAll();
    }

    @PostMapping("/employe")
    public Employe postEmploye(@RequestBody Employe employe) {
        return employeService.createEmploye(employe);
    }

    @GetMapping("employe/{id}")
    public Optional<Employe> getOne(@PathVariable Long id) {
        //@PathVariable {id}
        return employeService.getOne(id);
    }

    @DeleteMapping("employe/{id}")
    public void deleteEmploye(@PathVariable Long id) {
        employeService.deleteEmploye(id);
    }

    @DeleteMapping("employe")
    public void deleteAll(){ employeService.deleteAll(); }

    @PostMapping("employe/{id}")
    public Employe putEmploye(@PathVariable Long id, @RequestBody Employe employe) {
        return employeService.updateEmploye(id, employe);
    }
}
