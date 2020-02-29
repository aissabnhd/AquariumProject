package fr.upem.aquarium.Aquarium.ressource;

import fr.upem.aquarium.Aquarium.model.*;
import fr.upem.aquarium.Aquarium.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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


        return activiteService.getActivitesOfEmployes(employeService.getOne(id).get());
    }


    @PostMapping("/activite")
    public Activite postActivite(@RequestBody Activite activite) {
        return activiteService.createActivite(activite);
    }

    @GetMapping("activite/{id}")
    public Optional<Activite> getOne(@PathVariable Long id) {
        //@PathVariable {id}
        return activiteService.getOne(id);
    }

    @PostMapping("/activite_bassin/{id}")
    public Activite postActiviteWithBassin(@RequestBody Activite activite, @PathVariable Long id) {
        Optional<Bassin> e = (bassinService.getOne(id));
        return activiteService.createActiviteBassin(activite, e.get());
    }

    @PostMapping("/activite_update_employe/{id}")
    public Activite updateEmploye(@RequestBody List<Long> list, @PathVariable Long id) {
        System.out.println("here");
        Activite activite = activiteService.getOne(id).get();
        List<Employe> l_emp = activite.getResponsables();

        for(int i = 0; i < list.size(); i++){
            if(!l_emp.contains(employeService.getOne(list.get(i)).get()))
              l_emp.add(employeService.getOne(list.get(i)).get());
        }
        activite.setResponsables(l_emp);
        return activiteService.createActiviteBassin(activite, activite.getBassin());
    }

    @DeleteMapping("activite/{id}")
    public void deleteActivite(@PathVariable Long id) {
        activiteService.deleteActivite(id);
    }

    @DeleteMapping("activite")
    public void deleteAll(){ activiteService.deleteAll() ;}

    @PostMapping("activite/{id}")
    public Activite putActivite(@PathVariable Long id, @RequestBody Activite activite) {
        return activiteService.updateActivite(id, activite);
    }

    @PostMapping("activite_update/{id}/{id2}")
    public Activite putActivite(@PathVariable Long id, @PathVariable Long id2, @RequestBody Activite activite) {
        Optional<Bassin> e = (bassinService.getOne(id2));
        activite.setBassin(e.get());
        return activiteService.updateActivite(id, activite);
    }



    @PostMapping("activite_add_employe/{id}/{idEmploye}")
    public Activite putNewEmploye(@PathVariable Long id, @RequestBody Activite activite, @PathVariable Long idEmploye) {

        return activiteService.updateActiviteAddEmploye(id, activite, employeService.getOne(idEmploye));
    }
}
