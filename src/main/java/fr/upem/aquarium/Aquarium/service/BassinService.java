package fr.upem.aquarium.Aquarium.service;

import fr.upem.aquarium.Aquarium.model.*;
import fr.upem.aquarium.Aquarium.repository.AnimalRepository;
import fr.upem.aquarium.Aquarium.repository.BassinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Service
public class BassinService {


    @Autowired
    private BassinRepository bassinRepository;

    public Iterable<Bassin>getAll(){
        return bassinRepository.findAll();
    }

    public Bassin createBassin(Bassin bassin, Optional<Employe> emp){
        bassin.setResponsable(emp.get());

        return bassinRepository.save(bassin);
    }


    public Optional<Bassin> getOne(Long id) {

        return bassinRepository.findById(id);
    }

    public void deleteBassin(Long id) {

        bassinRepository.deleteById(id);
    }

    public Bassin updateBassin(Long id, Bassin bassin, Optional<Employe> emp) {
        bassinRepository.findById(id);
        bassin.setResponsable(emp.get());
        bassin.setId(id);
        return bassinRepository.save(bassin);
    }


    public void deleteAll() {
        bassinRepository.deleteAll();
    }

    public Bassin addEsepece(Optional<Bassin> bassinServiceOne, Optional<Espece> one) {
        Bassin b = bassinServiceOne.get();
        if(b.getCapacite_max() > b.getLst().size())
            b.getLst().add(one.get());
        return bassinRepository.save(b);
    }

    public Bassin removeEspece(Optional<Bassin> one, Optional<Espece> one1) {
        Bassin b = one.get();
        b.getLst().remove(one1.get());

        return bassinRepository.save(b);
    }

    public Optional<Bassin> getFromEspece(Long idEspece) {
        Iterable l = bassinRepository.findAll();
        Iterator<Bassin> iterator = l.iterator();

        List<Bassin> lst = new ArrayList<>();
        while (iterator.hasNext()) {
            lst.add(iterator.next());
        }

        for(int i = 0; i < lst.size();i++){
            for(int j = 0; j < lst.get(i).getLst().size(); j++){
                if(lst.get(i).getLst().get(j).getId() == idEspece)
                    return Optional.of(lst.get(i));
            }
        }
        return Optional.empty();
    }

}
