package fr.upem.aquarium.Aquarium.repository;

import fr.upem.aquarium.Aquarium.model.Espece;
import fr.upem.aquarium.Aquarium.model.Secteur;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SecteurRepository extends CrudRepository<Secteur,Long> {
}
