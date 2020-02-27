package fr.upem.aquarium.Aquarium.service;

import fr.upem.aquarium.Aquarium.model.Espece;
import fr.upem.aquarium.Aquarium.repository.EspeceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EspeceService {


    @Autowired
    private EspeceRepository especeRepository;

    public Iterable<Espece>getAll(){
        return especeRepository.findAll();
    }

    public Espece createEspece(Espece espece){

        return especeRepository.save(espece);
    }


    public Optional<Espece> getOne(Long id) {

        return especeRepository.findById(id);
    }

    public void deleteEspece(Long id) {

        especeRepository.deleteById(id);
    }

    public Espece updateEspece(Long id, Espece espece) {
        especeRepository.findById(id);
        espece.setId(id);
        return especeRepository.save(espece);
    }


    public void deleteAll() {
        especeRepository.deleteAll();
    }
}
