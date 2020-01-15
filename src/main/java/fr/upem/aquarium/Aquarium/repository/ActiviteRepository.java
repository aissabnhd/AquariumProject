package fr.upem.aquarium.Aquarium.repository;

import fr.upem.aquarium.Aquarium.model.Activite;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActiviteRepository  extends CrudRepository<Activite,Long> {
}
