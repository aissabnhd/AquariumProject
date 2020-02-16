package fr.upem.aquarium.Aquarium.service;

import fr.upem.aquarium.Aquarium.model.Activite;
import fr.upem.aquarium.Aquarium.model.Bassin;
import fr.upem.aquarium.Aquarium.model.Employe;
import fr.upem.aquarium.Aquarium.model.Espece;
import fr.upem.aquarium.Aquarium.repository.ActiviteRepository;
import fr.upem.aquarium.Aquarium.repository.EmployeRepository;
import fr.upem.aquarium.Aquarium.repository.EspeceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeService {


    @Autowired
    private EmployeRepository employeRepository;

    public Iterable<Employe>getAll(){
        return employeRepository.findAll();
    }

    public Employe createEmploye(Employe employe){

        return employeRepository.save(employe);
    }


    public Optional<Employe> getOne(Long id) {

        return employeRepository.findById(id);
    }

    public void deleteEmploye(Long id) {

        employeRepository.deleteById(id);
    }

    public Employe updateEmploye(Long id, Employe employe) {
        employeRepository.findById(id);
        employe.setId(id);
        return employeRepository.save(employe);
    }


    public void deleteAll() {
        employeRepository.deleteAll();
    }


    public Optional<Employe> connect(String login, String password) {
        Iterable<Employe> it = employeRepository.findAll();
        List<Employe> result = new ArrayList<Employe>();
        it.forEach(result::add);
        for(int i = 0; i < result.size(); i++){
            if(result.get(i).getLogin().equals(login) && result.get(i).getPassword().equals(password))
                return Optional.of(result.get(i));

        }

        return Optional.empty();
    }
}
