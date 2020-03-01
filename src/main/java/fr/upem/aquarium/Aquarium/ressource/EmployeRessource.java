package fr.upem.aquarium.Aquarium.ressource;

import fr.upem.aquarium.Aquarium.model.Animal;
import fr.upem.aquarium.Aquarium.model.Employe;
import fr.upem.aquarium.Aquarium.model.Espece;
import fr.upem.aquarium.Aquarium.service.AnimalService;
import fr.upem.aquarium.Aquarium.service.EmployeService;
import fr.upem.aquarium.Aquarium.service.EspeceService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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
    public ResponseEntity<Employe> postEmploye(@RequestBody Employe employe) {
        return new ResponseEntity<>(employeService.createEmploye(employe), HttpStatus.CREATED);

    }

    @GetMapping("employe/{id}")
    public Optional<Employe> getOne(@PathVariable Long id) {
        //@PathVariable {id}
        if(!employeService.getOne(id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employé avec l'id " + id + " n'existe pas");

        return employeService.getOne(id);



    }

    @DeleteMapping("employe/{id}")
    public void deleteEmploye(@PathVariable Long id) {
        if(!employeService.getOne(id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employé avec l'id " + id + " n'existe pas");


        employeService.deleteEmploye(id);
    }

    @DeleteMapping("employe")
    public void deleteAll(){ employeService.deleteAll(); }

    @PostMapping("employe/{id}")
    public Employe putEmploye(@PathVariable Long id, @RequestBody Employe employe) {
        if(!employeService.getOne(id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employé avec l'id " + id + " n'existe pas");

        return employeService.updateEmploye(id, employe);
    }

    @GetMapping("employe/{login}/{password}")
    public Optional<Employe> getOne(@PathVariable String login, @PathVariable String password) {
        if(!employeService.connect(login, password).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Erreur de login/mot de passe");

        return employeService.connect(login, password);

    }
}
