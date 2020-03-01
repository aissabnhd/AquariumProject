package fr.upem.aquarium.Aquarium.ressource;

import fr.upem.aquarium.Aquarium.model.Animal;
import fr.upem.aquarium.Aquarium.model.Espece;
import fr.upem.aquarium.Aquarium.model.Sexe;
import fr.upem.aquarium.Aquarium.repository.AnimalRepository;
import fr.upem.aquarium.Aquarium.repository.EspeceRepository;
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
public class EspeceRessourceTest {
    @LocalServerPort
    private int port;


    @MockBean
    private EspeceService especeService;
    @MockBean
    private EspeceRepository especeRepository;


    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void getAll() throws Exception {
        List<Espece> especes = this.restTemplate.getForObject("http://localhost:" + port + "/espece", List.class);

        assertEquals(0, especes.size());
    }

    @Test
    public void postEspece() {
        Espece espece = new Espece("Poisson", 10, "aucun", 0);
        espece.setId(1L);
        when(especeService.createEspece(espece)).thenReturn(espece);

        Espece result = this.restTemplate.postForObject("http://localhost:" + port + "/espece", espece, Espece.class);
        assertEquals(espece, result);
    }

    @Test
    public void getOne() {
        Espece espece = new Espece("Poisson", 10, "aucun", 0);
        espece.setId(1L);
        when(especeService.getOne(1L)).thenReturn(Optional.of(espece));
        HttpEntity<Espece> request = new HttpEntity<>(espece);
        this.restTemplate.exchange("http://localhost:" + port + "/espece",
                HttpMethod.POST, request, Espece.class);

        Espece resultGet = this.restTemplate.getForObject("http://localhost:" + port + "/espece/1", Espece.class);
        assertEquals(espece, resultGet);
    }

    @Test
    public void deleteEspece() {
        // TODO

    }

    @Test
    public void deleteAll(){
        // TODO
    }

    @Test
    public void putEspece() {
        /*Espece espece = new Espece("Poisson", 10, "aucun", 0);
        espece.setId(1L);

        when(especeService.createEspece(espece)).thenReturn(espece);

        Espece espece2 = new Espece("Poisson-clown", 5, "aucun", 4);
        espece.setId(1L);

        when(especeService.updateEspece(1L, espece2)).thenReturn(espece2);

        this.restTemplate.postForObject("http://localhost:" + port + "/espece", espece, Espece.class);
        HttpEntity<Espece> request = new HttpEntity<>(espece2);

        Espece result = this.restTemplate.exchange("http://localhost:" + port + "/espece/1",
                HttpMethod.POST, request, Espece.class).getBody();

        assertEquals(result, espece2);*/

    }
}