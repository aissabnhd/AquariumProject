package fr.upem.aquarium.Aquarium.repository;

import fr.upem.aquarium.Aquarium.model.CalendrierHebdomadaire;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CalendrierHebdomadaireRepository extends CrudRepository<CalendrierHebdomadaire,Long> {
}
