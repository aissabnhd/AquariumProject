package fr.upem.aquarium.Aquarium.ressource;

import fr.upem.aquarium.Aquarium.model.*;
import fr.upem.aquarium.Aquarium.repository.ActiviteRepository;
import fr.upem.aquarium.Aquarium.repository.AnimalRepository;
import fr.upem.aquarium.Aquarium.repository.EspeceRepository;
import fr.upem.aquarium.Aquarium.service.ActiviteService;
import fr.upem.aquarium.Aquarium.service.AnimalService;
import fr.upem.aquarium.Aquarium.service.BassinService;
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
public class ActiviteRessourceTest {
    @LocalServerPort
    private int port;


    @MockBean
    private ActiviteService activiteService;
    @MockBean
    private ActiviteRepository activiteRepository;
    @MockBean
    private BassinService bassinService;


    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void getAll() throws Exception {
        List<Activite> activites = this.restTemplate.getForObject("http://localhost:" + port + "/activite", List.class);

        assertEquals(0, activites.size());
    }

    @Test
    public void postActivite() {
        Activite activite = new Activite("Repas", null, null, true, null);
        activite.setId(1L);
        when(activiteService.createActivite(activite)).thenReturn(activite);

        Activite result = this.restTemplate.postForObject("http://localhost:" + port + "/activite", activite, Activite.class);
        assertEquals(activite, result);
    }

    @Test
    public void getOne() {
        Activite activite = new Activite("Repas", null, null, true, null );
        activite.setId(1L);
        when(activiteService.getOne(1L)).thenReturn(Optional.of(activite));
        HttpEntity<Activite> request = new HttpEntity<>(activite);
        this.restTemplate.exchange("http://localhost:" + port + "/activite",
                HttpMethod.POST, request, Activite.class);

        Activite resultGet = this.restTemplate.getForObject("http://localhost:" + port + "/activite/1", Activite.class);
        assertEquals(activite, resultGet);
    }

    @Test
    public void postActiviteWithBassin(){
        Bassin bassin = new Bassin("bassin 1", 100, 10, State.sale);
        bassin.setId(1L);

        Activite activite = new Activite("Repas", null, null, true, null );
        activite.setId(2L);
        Activite activite2 = new Activite("Repas", null, null, true, bassin );
        activite2.setId(2L);

        when(bassinService.createBassin(bassin)).thenReturn(bassin);
        when(activiteService.createActiviteBassin(activite, bassin)).thenReturn(activite2);
        when(bassinService.getOne(1L)).thenReturn(Optional.of(bassin));

        this.restTemplate.postForObject("http://localhost:" + port + "/bassin", bassin, Bassin.class);
        HttpEntity<Activite> request = new HttpEntity<>(activite);

        Activite result = this.restTemplate.exchange("http://localhost:" + port + "/activite_bassin/1",
                HttpMethod.POST, request, Activite.class).getBody();
        assertEquals(result, activite2);
    }

    @Test
    public void deleteActivite() {
        // TODO

    }

    @Test
    public void deleteAll(){
        // TODO
    }

    @Test
    public void putActivite() {
        Activite activite = new Activite("Repas", null, null, false, null);
        activite.setId(1L);
        Activite activite2 = new Activite("Jouer", null, null, true, null);
        activite2.setId(1L);
        when(activiteService.createActivite(activite)).thenReturn(activite);
        when(activiteService.updateActivite(1L, activite2)).thenReturn(activite2);

        this.restTemplate.postForObject("http://localhost:" + port + "/activite", activite, Espece.class);
        HttpEntity<Activite> request = new HttpEntity<>(activite2);

        Activite result = this.restTemplate.exchange("http://localhost:" + port + "/activite/1",
                HttpMethod.POST, request, Activite.class).getBody();

        assertEquals(result, activite2);
    }
}