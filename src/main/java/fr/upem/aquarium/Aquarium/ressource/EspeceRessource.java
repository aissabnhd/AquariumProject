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
public class EspeceRessource {
    @Autowired
    private EspeceService especeService;

    @Autowired
    private BassinService bassinService;

    @GetMapping("/espece")
    public Iterable<Espece> getAll() {
        return especeService.getAll();
    }

    @PostMapping("/especeBassin/{idBassin}")
    public Espece postEspece(@RequestBody Espece espece, @PathVariable Long idBassin) {
        Optional<Bassin> b = (bassinService.getOne(idBassin));
        return especeService.createEspece(espece, b);
    }

    @GetMapping("espece/{id}")
    public Optional<Espece> getOne(@PathVariable Long id) {
        //@PathVariable {id}
        return especeService.getOne(id);
    }

    @DeleteMapping("espece/{id}")
    public void deleteEspece(@PathVariable Long id) {
        especeService.deleteEspece(id);
    }

    @DeleteMapping("espece")
    public void deleteAll(){ especeService.deleteAll(); }

    @PostMapping("especeUpdate/{id}/{idBassin}")
    public Espece putEspece(@PathVariable Long id, @RequestBody Espece espece, @PathVariable Long idBassin) {
        Optional<Bassin> b = bassinService.getOne(idBassin);
        return especeService.updateEspece(id, espece, b);
    }
}
