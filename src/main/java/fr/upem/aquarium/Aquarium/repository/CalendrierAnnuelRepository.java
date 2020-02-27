package fr.upem.aquarium.Aquarium.repository;

import fr.upem.aquarium.Aquarium.model.CalendrierAnnuel;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CalendrierAnnuelRepository extends CrudRepository<CalendrierAnnuel,Long> {
}
