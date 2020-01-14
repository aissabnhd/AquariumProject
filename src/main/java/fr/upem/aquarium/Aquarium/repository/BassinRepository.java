package fr.upem.aquarium.Aquarium.repository;

import fr.upem.aquarium.Aquarium.model.Bassin;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BassinRepository extends CrudRepository<Bassin,Long> {
}
