package fr.upem.aquarium.Aquarium.service;

import fr.upem.aquarium.Aquarium.model.Animal;
import fr.upem.aquarium.Aquarium.model.Bassin;
import fr.upem.aquarium.Aquarium.model.Espece;
import fr.upem.aquarium.Aquarium.repository.AnimalRepository;
import fr.upem.aquarium.Aquarium.repository.BassinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BassinService {


    @Autowired
    private BassinRepository bassinRepository;

    public Iterable<Bassin>getAll(){
        return bassinRepository.findAll();
    }

    public Bassin createBassin(Bassin bassin){

        return bassinRepository.save(bassin);
    }


    public Optional<Bassin> getOne(Long id) {

        return bassinRepository.findById(id);
    }

    public void deleteBassin(Long id) {

        bassinRepository.deleteById(id);
    }

    public Bassin updateBassin(Long id, Bassin bassin) {
        bassinRepository.findById(id);
        bassin.setId(id);
        return bassinRepository.save(bassin);
    }


    public void deleteAll() {
        bassinRepository.deleteAll();
    }

    public Bassin addEsepece(Optional<Bassin> bassinServiceOne, Optional<Espece> one) {
        Bassin b = bassinServiceOne.get();
        b.addLst(one.get());
        return bassinRepository.save(b);
    }

    public Bassin removeEspece(Optional<Bassin> one, Optional<Espece> one1) {
        Bassin b = one.get();
        b.removeLst(one1.get());
        return bassinRepository.save(b);
    }
}
