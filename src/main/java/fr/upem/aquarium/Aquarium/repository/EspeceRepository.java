package fr.upem.aquarium.Aquarium.repository;

import fr.upem.aquarium.Aquarium.model.Espece;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EspeceRepository  extends CrudRepository<Espece,Long> {
}
