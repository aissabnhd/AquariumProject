package fr.upem.aquarium.Aquarium.service;

import fr.upem.aquarium.Aquarium.model.Activite;
import fr.upem.aquarium.Aquarium.model.Bassin;
import fr.upem.aquarium.Aquarium.model.Espece;
import fr.upem.aquarium.Aquarium.repository.ActiviteRepository;
import fr.upem.aquarium.Aquarium.repository.EspeceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ActiviteService {


    @Autowired
    private ActiviteRepository activiteRepository;

    public Iterable<Activite>getAll(){
        return activiteRepository.findAll();
    }

    public Activite createActivite(Activite activite){

        return activiteRepository.save(activite);
    }


    public Optional<Activite> getOne(Long id) {

        return activiteRepository.findById(id);
    }

    public void deleteActivite(Long id) {

        activiteRepository.deleteById(id);
    }

    public Activite updateActivite(Long id, Activite activite) {
        activiteRepository.findById(id);
        activite.setId(id);
        return activiteRepository.save(activite);
    }


    public void deleteAll() {
        activiteRepository.deleteAll();
    }

    public Activite createActiviteBassin(Activite activite, Bassin bassin) {
        activite.setBassin(bassin);
        return activiteRepository.save(activite);

    }
}
