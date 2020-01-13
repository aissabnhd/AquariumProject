package fr.upem.aquarium.Aquarium.repository;

import fr.upem.aquarium.Aquarium.model.Animal;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import java.util.Objects;

import static javax.persistence.GenerationType.AUTO;

@Repository
public interface AnimalRepository extends CrudRepository<Animal,Long> {
}
