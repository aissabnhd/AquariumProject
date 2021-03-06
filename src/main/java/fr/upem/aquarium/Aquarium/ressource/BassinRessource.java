package fr.upem.aquarium.Aquarium.ressource;

import fr.upem.aquarium.Aquarium.model.Animal;
import fr.upem.aquarium.Aquarium.model.Bassin;
import fr.upem.aquarium.Aquarium.model.Employe;
import fr.upem.aquarium.Aquarium.model.Espece;
import fr.upem.aquarium.Aquarium.service.AnimalService;
import fr.upem.aquarium.Aquarium.service.BassinService;
import fr.upem.aquarium.Aquarium.service.EmployeService;
import fr.upem.aquarium.Aquarium.service.EspeceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
public class BassinRessource {
    @Autowired
    private BassinService bassinService;
    @Autowired
    private EspeceService especeService;
    @Autowired
    private EmployeService employeService;

    @GetMapping("/bassin")
    public Iterable<Bassin> getAll() {
        return bassinService.getAll();
    }

    @PostMapping("/bassinCreate/{idEmploye}")
    public ResponseEntity<Bassin> postBassin(@RequestBody Bassin bassin, @PathVariable Long idEmploye) {
        if(!employeService.getOne(idEmploye).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employé avec l'id " + idEmploye + " n'existe pas");



        Optional<Employe> emp = employeService.getOne(idEmploye);
        return new ResponseEntity<>(bassinService.createBassin(bassin, emp), HttpStatus.CREATED);

    }

    @GetMapping("bassin/{id}")
    public Optional<Bassin> getOne(@PathVariable Long id) {
        //@PathVariable {id}
        if(!bassinService.getOne(id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Bassin avec l'id " + id + " n'existe pas");



        return bassinService.getOne(id);
    }

    @GetMapping("bassins/{id}/{id2}")
    public void assignEspeceBassin(@PathVariable Long id, @PathVariable Long id2) {
        if(!bassinService.getOne(id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Bassin avec l'id " + id + " n'existe pas");

        if(!especeService.getOne(id2).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Espèce avec l'id " + id2 + " n'existe pas");




        bassinService.addEsepece(bassinService.getOne(id), especeService.getOne(id2));

    }


    @DeleteMapping("bassins/{id}/{id2}")
    public void removeEspeceBassin(@PathVariable Long id, @PathVariable Long id2){
        if(!bassinService.getOne(id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Bassin avec l'id " + id + " n'existe pas");

        if(!especeService.getOne(id2).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Espèce avec l'id " + id2 + " n'existe pas");

        bassinService.removeEspece(bassinService.getOne(id), especeService.getOne(id2));
    }

    @DeleteMapping("bassin/{id}")
    public void deleteBassin(@PathVariable Long id) {

        if(!bassinService.getOne(id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Bassin avec l'id " + id + " n'existe pas");

        bassinService.deleteBassin(id);
    }

    @DeleteMapping("bassin")
    public void deleteAll(){ bassinService.deleteAll() ;}

    @PostMapping("bassin/{id}/{idEmploye}")
    public Bassin putBassin(@PathVariable Long id, @RequestBody Bassin bassin, @PathVariable Long idEmploye) {
        if(!bassinService.getOne(id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Bassin avec l'id " + id + " n'existe pas");
        if(!employeService.getOne(idEmploye).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employé avec l'id " + idEmploye + " n'existe pas");

        Optional<Employe> emp = employeService.getOne(idEmploye);
        return bassinService.updateBassin(id, bassin, emp);
    }

    @GetMapping("bassinFromEspece/{idEspece}")
    public Optional<Bassin> getFromEspece(@PathVariable Long idEspece) {
        //@PathVariable {id}
        if(!especeService.getOne(idEspece).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Espèce avec l'id " + idEspece + " n'existe pas");

        return bassinService.getFromEspece(idEspece);
    }
}
