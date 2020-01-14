package fr.upem.aquarium.Aquarium.ressource;

import fr.upem.aquarium.Aquarium.model.Animal;
import fr.upem.aquarium.Aquarium.model.Bassin;
import fr.upem.aquarium.Aquarium.model.Espece;
import fr.upem.aquarium.Aquarium.service.AnimalService;
import fr.upem.aquarium.Aquarium.service.BassinService;
import fr.upem.aquarium.Aquarium.service.EspeceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class BassinRessource {
    @Autowired
    private BassinService bassinService;
    @Autowired
    private EspeceService especeService;

    @GetMapping("/bassin")
    public Iterable<Bassin> getAll() {
        return bassinService.getAll();
    }

    @PostMapping("/bassin")
    public Bassin postBassin(@RequestBody Bassin bassin) {
        return bassinService.createBassin(bassin);
    }

    @GetMapping("bassin/{id}")
    public Optional<Bassin> getOne(@PathVariable Long id) {
        //@PathVariable {id}
        return bassinService.getOne(id);
    }

    @GetMapping("bassins/{id}/{id2}")
    public void assignEspeceBassin(@PathVariable Long id, @PathVariable Long id2) {

        bassinService.addEsepece(bassinService.getOne(id), especeService.getOne(id2));

    }


    @DeleteMapping("bassins/{id}/{id2}")
    public void removeEspeceBassin(@PathVariable Long id, @PathVariable Long id2){
        bassinService.removeEspece(bassinService.getOne(id), especeService.getOne(id2));
    }

    @DeleteMapping("bassin/{id}")
    public void deleteBassin(@PathVariable Long id) {
        bassinService.deleteBassin(id);
    }

    @DeleteMapping("bassin")
    public void deleteAll(){ bassinService.deleteAll() ;}

    @PostMapping("bassin/{id}")
    public Bassin putBassin(@PathVariable Long id, @RequestBody Bassin bassin) {
        return bassinService.updateBassin(id, bassin);
    }
}
