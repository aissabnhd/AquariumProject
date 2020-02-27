package fr.upem.aquarium.Aquarium.ressource;

import fr.upem.aquarium.Aquarium.model.Animal;
import fr.upem.aquarium.Aquarium.model.Espece;
import fr.upem.aquarium.Aquarium.model.Sexe;
import fr.upem.aquarium.Aquarium.repository.AnimalRepository;
import fr.upem.aquarium.Aquarium.service.AnimalService;
import fr.upem.aquarium.Aquarium.service.EspeceService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AnimalRessourceTest {
    @LocalServerPort
    private int port;


    @MockBean
    private AnimalService animalService;
    @MockBean
    private AnimalRepository animalRepository;

    @MockBean
    private EspeceService especeService;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void getAll() throws Exception {
        List<Animal> animaux = this.restTemplate.getForObject("http://localhost:" + port + "/animal", List.class);

        assertEquals(0, animaux.size());
    }

    @Test
    public void postAnimal() {
        Espece espece = new Espece("Poisson", 10, "aucun", 0);
        Animal animal = new Animal("Requin", Sexe.F, espece, null, new Date());
        animal.setId(1L);
        when(animalService.createAnimal(animal)).thenReturn(animal);

        Animal result = this.restTemplate.postForObject("http://localhost:" + port + "/animal", animal, Animal.class);
        assertEquals(animal, result);
    }

    @Test
    public void postAnimalEspece(){

        Espece espece = new Espece("Poisson", 10, "aucun", 0);
        espece.setId(1L);
        when(especeService.createEspece(espece)).thenReturn(espece);
        Animal animal = new Animal("Requin", Sexe.F, null, null, null);
        animal.setId(2L);
        Animal animal2 = new Animal("Requin", Sexe.F, espece, null, null);
        animal2.setId(1L);
        when(animalService.createAnimalEspece(animal, espece)).thenReturn(animal2);
        when(especeService.getOne(1L)).thenReturn(Optional.of(espece));

        this.restTemplate.postForObject("http://localhost:" + port + "/espece", espece, Espece.class);
        HttpEntity<Animal> request = new HttpEntity<>(animal);

        Animal result = this.restTemplate.exchange("http://localhost:" + port + "/animal_espece/1",
                HttpMethod.POST, request, Animal.class).getBody();
        assertEquals(result, animal2);
    }


    @Test
    public void getOne() {
        Espece espece = new Espece("Poisson", 10, "aucun", 0);
        Animal animal = new Animal("Requin", Sexe.F, espece, null, new Date());
        animal.setId(1L);
        when(animalService.getOne(1L)).thenReturn(Optional.of(animal));
        HttpEntity<Animal> request = new HttpEntity<>(animal);
        this.restTemplate.exchange("http://localhost:" + port + "/animal",
                HttpMethod.POST, request, Animal.class);

        Animal resultGet = this.restTemplate.getForObject("http://localhost:" + port + "/animal/1", Animal.class);
        assertEquals(animal, resultGet);
    }

    @Test
    public void deleteAnimal() {
       // TODO

    }

    @Test
    public void deleteAll(){
        // TODO
    }

    @Test
    public void putAnimal() {
        Espece espece = new Espece("Poisson", 10, "aucun", 0);
        Animal animal = new Animal("Requin", Sexe.F, espece, null, new Date());
        animal.setId(1L);
        when(animalService.createAnimal(animal)).thenReturn(animal);
        Animal animal2 = new Animal("Requin Blanc", Sexe.M, espece, null, new Date());
        animal2.setId(2L);
        when(animalService.updateAnimal(1L, animal2)).thenReturn(animal2);

        this.restTemplate.postForObject("http://localhost:" + port + "/animal", animal, Animal.class);
        HttpEntity<Animal> request = new HttpEntity<>(animal2);

        Animal result = this.restTemplate.exchange("http://localhost:" + port + "/animal/1",
                HttpMethod.POST, request, Animal.class).getBody();

        assertEquals(result, animal2);

    }
}