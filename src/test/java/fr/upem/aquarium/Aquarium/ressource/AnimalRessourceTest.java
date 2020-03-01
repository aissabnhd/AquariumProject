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
import org.springframework.http.HttpStatus;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

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
        HttpEntity<Animal> request = new HttpEntity<>(animal);

        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/animal",
                HttpMethod.POST, request, Animal.class).getStatusCode(), HttpStatus.CREATED);
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


        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/animal_espece/41",
                HttpMethod.POST, request, Animal.class).getStatusCode(), HttpStatus.NOT_FOUND);

        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/animal_espece/1",
                HttpMethod.POST, request, Animal.class).getStatusCode(), HttpStatus.CREATED);

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

        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/animal/1",
                HttpMethod.DELETE, request, Animal.class).getStatusCode(), HttpStatus.OK);
        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/animal/499",
                HttpMethod.DELETE, request, Animal.class).getStatusCode(), HttpStatus.NOT_FOUND);

    }

    @Test
    public void deleteAnimal() {
        Espece espece = new Espece("Poisson", 10, "aucun", 0);
        Animal animal = new Animal("Requin", Sexe.F, espece, null, new Date());
        animal.setId(1L);
        when(animalService.getOne(1L)).thenReturn(Optional.of(animal));
        HttpEntity<Animal> request = new HttpEntity<>(animal);
        this.restTemplate.exchange("http://localhost:" + port + "/animal",
                HttpMethod.POST, request, Animal.class);
        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/animal/48",
                HttpMethod.DELETE, request, Animal.class).getStatusCode(), HttpStatus.NOT_FOUND);
        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/animal/1",
                HttpMethod.DELETE, request, Animal.class).getStatusCode(), HttpStatus.OK);


    }

    @Test
    public void deleteAll(){
        Espece espece = new Espece("Poisson", 10, "aucun", 0);
        Animal animal = new Animal("Requin", Sexe.F, espece, null, new Date());
        animal.setId(1L);
        when(animalService.getOne(1L)).thenReturn(Optional.of(animal));
        HttpEntity<Animal> request = new HttpEntity<>(animal);
        this.restTemplate.exchange("http://localhost:" + port + "/animal",
                HttpMethod.POST, request, Animal.class);
        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/animal",
                HttpMethod.DELETE, request, Animal.class).getStatusCode(), HttpStatus.OK);
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
        when(animalService.getOne(1L)).thenReturn(Optional.of(animal));

        this.restTemplate.postForObject("http://localhost:" + port + "/animal", animal, Animal.class);
        HttpEntity<Animal> request = new HttpEntity<>(animal2);

        Animal result = this.restTemplate.exchange("http://localhost:" + port + "/animal/1",
                HttpMethod.POST, request, Animal.class).getBody();

        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/animal/48",
                HttpMethod.POST, request, Animal.class).getStatusCode(), HttpStatus.NOT_FOUND);
        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/animal/1",
                HttpMethod.POST, request, Animal.class).getStatusCode(), HttpStatus.OK);



        assertEquals(result, animal2);

    }

    @Test
    public void getAnimauxOfEspece() {
        Espece espece = new Espece("Poisson", 10, "aucun", 0);
        espece.setId(2L);
        Animal animal = new Animal("Requin", Sexe.F, espece, null, new Date());
        animal.setId(1L);
        animal.setEspece(espece);
        when(animalService.createAnimal(animal)).thenReturn(animal);

        when(especeService.getOne(2L)).thenReturn(Optional.of(espece));
        when(animalService.getOne(1L)).thenReturn(Optional.of(animal));

        this.restTemplate.postForObject("http://localhost:" + port + "/animal", animal, Animal.class);
        HttpEntity<Animal> request = new HttpEntity<>(animal);

        this.restTemplate.exchange("http://localhost:" + port + "/animal/1",
                HttpMethod.POST, request, Animal.class).getBody();

        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/animauxOfEspece/48",
                HttpMethod.GET, request, Animal.class).getStatusCode(), HttpStatus.NOT_FOUND);

        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/animauxOfEspece/2",
                HttpMethod.GET, request, List.class).getStatusCode(), HttpStatus.OK);



    }


}