package fr.upem.aquarium.Aquarium.ressource;

import fr.upem.aquarium.Aquarium.model.*;
import fr.upem.aquarium.Aquarium.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
public class ActiviteRessource {
    @Autowired
    private ActiviteService activiteService;

    @Autowired
    private BassinService bassinService;

    @Autowired
    private EmployeService employeService;

    @GetMapping("/activite")
    public Iterable<Activite> getAll() {
        return activiteService.getAll();
    }

    @GetMapping("/activiteOfEmploye/{id}")
    public Iterable<Activite> getActivitesOfEmployes(@PathVariable Long id) {
        if(!employeService.getOne(id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employé avec l'id " + id + " n'existe pas");



        return activiteService.getActivitesOfEmployes(employeService.getOne(id).get());
    }

    @GetMapping("/activiteOfBassin/{id}")
    public Iterable<Activite> getActivitesOfBassin(@PathVariable Long id) {
        if(!bassinService.getOne(id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Bassin avec l'id " + id + " n'existe pas");



        return activiteService.getActivitesOfBassin(bassinService.getOne(id).get());
    }


    @PostMapping("/activite")
    public ResponseEntity<Activite> postActivite(@RequestBody Activite activite) {

        return new ResponseEntity<>(activiteService.createActivite(activite), HttpStatus.CREATED);

    }

    @GetMapping("activite/{id}")
    public Optional<Activite> getOne(@PathVariable Long id) {
        //@PathVariable {id}
        if(!activiteService.getOne(id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Activité avec l'id " + id + " n'existe pas");


        return activiteService.getOne(id);
    }

    @PostMapping("/activite_bassin/{id}")
    public Activite postActiviteWithBassin(@RequestBody Activite activite, @PathVariable Long id) {
        if(!bassinService.getOne(id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Bassin avec l'id " + id + " n'existe pas");

        Optional<Bassin> e = (bassinService.getOne(id));
        return activiteService.createActiviteBassin(activite, e.get());
    }

    @PostMapping("/activite_update_employe/{id}")
    public Activite updateEmploye(@RequestBody List<Long> list, @PathVariable Long id) {
        if(!activiteService.getOne(id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Activité avec l'id " + id + " n'existe pas");

        Activite activite = activiteService.getOne(id).get();
        List<Employe> l_emp = activite.getResponsables();

        for(int i = 0; i < list.size(); i++){
            if(!employeService.getOne(list.get(i)).isPresent())
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employé avec l'id " + list.get(i) + " n'existe pas");

            if(!l_emp.contains(employeService.getOne(list.get(i)).get()))
              l_emp.add(employeService.getOne(list.get(i)).get());
        }
        activite.setResponsables(l_emp);
        return activiteService.createActiviteBassin(activite, activite.getBassin());
    }

    @DeleteMapping("activite/{id}")
    public void deleteActivite(@PathVariable Long id) {
        if(!activiteService.getOne(id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Activité avec l'id " + id + " n'existe pas");

        activiteService.deleteActivite(id);
    }

    @DeleteMapping("activite")
    public void deleteAll(){ activiteService.deleteAll() ;}

    @PostMapping("activite/{id}")
    public Activite putActivite(@PathVariable Long id, @RequestBody Activite activite) {
        if(!activiteService.getOne(id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Activité avec l'id " + id + " n'existe pas");

        return activiteService.updateActivite(id, activite);
    }

    @PostMapping("activite_update/{id}/{id2}")
    public Activite putActivite(@PathVariable Long id, @PathVariable Long id2, @RequestBody Activite activite) {
        if(!bassinService.getOne(id2).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Bassin avec l'id " + id2 + " n'existe pas");

        Optional<Bassin> e = (bassinService.getOne(id2));
        activite.setBassin(e.get());
        if(!activiteService.getOne(id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Activité avec l'id " + id + " n'existe pas");

        return activiteService.updateActivite(id, activite);
    }



    @PostMapping("activite_add_employe/{id}/{idEmploye}")
    public Activite putNewEmploye(@PathVariable Long id, @RequestBody Activite activite, @PathVariable Long idEmploye) {
        if(!employeService.getOne(idEmploye).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employé avec l'id " + idEmploye + " n'existe pas");

        if(!activiteService.getOne(id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Activité avec l'id " + id + " n'existe pas");

        return activiteService.updateActiviteAddEmploye(id, activite, employeService.getOne(idEmploye));
    }
}
