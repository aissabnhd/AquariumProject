package fr.upem.aquarium.Aquarium.service;

import fr.upem.aquarium.Aquarium.model.Animal;
import fr.upem.aquarium.Aquarium.model.Bassin;
import fr.upem.aquarium.Aquarium.model.Espece;
import fr.upem.aquarium.Aquarium.repository.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Service
public class AnimalService {


        @Autowired
        private AnimalRepository animalRepository;

        public Iterable<Animal>getAll(){
            return animalRepository.findAll();
        }

        public Animal createAnimal(Animal animal){

            return animalRepository.save(animal);
        }


        public Optional<Animal> getOne(Long id) {

            return animalRepository.findById(id);
        }

        public void deleteAnimal(Long id) {

            animalRepository.deleteById(id);
        }

        public Animal updateAnimal(Long id, Animal animal) {
            animalRepository.findById(id);
            animal.setId(id);
            return animalRepository.save(animal);
        }


    public void deleteAll() {
            animalRepository.deleteAll();
    }

    public Animal createAnimalEspece(Animal animal, Espece espece) {
            animal.setEspece(espece);
            return animalRepository.save(animal);
    }

    public Iterable<Animal> getAnimauxOfEspece(Long idEspece) {
        Iterable l = animalRepository.findAll();
        Iterator<Animal> iterator = l.iterator();

        List<Animal> lst = new ArrayList<>();
        while (iterator.hasNext()) {
            lst.add(iterator.next());
        }

        for(int i = 0; i < lst.size();i++){

                if(lst.get(i).getEspece().getId() != idEspece)
                    lst.remove(i);
            }

        return lst;

    }
}
