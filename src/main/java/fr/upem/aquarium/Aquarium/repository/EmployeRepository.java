package fr.upem.aquarium.Aquarium.repository;

import fr.upem.aquarium.Aquarium.model.Employe;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeRepository   extends CrudRepository<Employe,Long> {
}
