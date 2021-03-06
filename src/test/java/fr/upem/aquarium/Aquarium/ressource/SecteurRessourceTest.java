package fr.upem.aquarium.Aquarium.ressource;

import fr.upem.aquarium.Aquarium.model.*;
import fr.upem.aquarium.Aquarium.repository.AnimalRepository;
import fr.upem.aquarium.Aquarium.repository.BassinRepository;
import fr.upem.aquarium.Aquarium.repository.SecteurRepository;
import fr.upem.aquarium.Aquarium.service.AnimalService;
import fr.upem.aquarium.Aquarium.service.BassinService;
import fr.upem.aquarium.Aquarium.service.EspeceService;
import fr.upem.aquarium.Aquarium.service.SecteurService;
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
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class SecteurRessourceTest {
    @LocalServerPort
    private int port;


    @MockBean
    private SecteurService secteurService;
    @MockBean
    private SecteurRepository secteurRepository;

    @MockBean
    private BassinService bassinService;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void getAll() throws Exception {
        List<Secteur> secteurs = this.restTemplate.getForObject("http://localhost:" + port + "/secteur", List.class);

        assertEquals(0, secteurs.size());
    }

    @Test
    public void postSecteur() {
        Secteur secteur = new Secteur("Secteur 7G", "Sud");
        secteur.setId(1L);
        when(secteurService.createSecteur(secteur)).thenReturn(secteur);

        Secteur result = this.restTemplate.postForObject("http://localhost:" + port + "/secteur", secteur, Secteur.class);
        assertEquals(secteur, result);
        HttpEntity<Secteur> request = new HttpEntity<>(secteur);

        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/secteur",
                HttpMethod.POST, request, Secteur.class).getStatusCode(), HttpStatus.CREATED);
    }

    @Test
    public void getOne() {
        Secteur secteur = new Secteur("Secteur 7G", "Sud");
        secteur.setId(1L);
        when(secteurService.getOne(1L)).thenReturn(Optional.of(secteur));
         HttpEntity<Secteur> request = new HttpEntity<>(secteur);
        this.restTemplate.exchange("http://localhost:" + port + "/secteur",
                HttpMethod.POST, request, Secteur.class);

        Secteur resultGet = this.restTemplate.getForObject("http://localhost:" + port + "/secteur/1", Secteur.class);
        assertEquals(secteur, resultGet);
        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/secteur/48",
                HttpMethod.GET, request, Secteur.class).getStatusCode(), HttpStatus.NOT_FOUND);

        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/secteur/1",
                HttpMethod.GET, request, Secteur.class).getStatusCode(), HttpStatus.OK);
    }

    @Test
    public void assignBassinSecteur(){
        Secteur secteur = new Secteur("Secteur 7G", "Sud");
        secteur.setId(1L);
        Bassin bassin = new Bassin("bassin 1", 100, 10, State.sale);
        bassin.setId(2L);
        when(bassinService.getOne(2L)).thenReturn(Optional.of(bassin));
        when(secteurService.getOne(1L)).thenReturn(Optional.of(secteur));
        HttpEntity<Secteur> request = new HttpEntity<>(secteur);
        this.restTemplate.exchange("http://localhost:" + port + "/secteur",
                HttpMethod.POST, request, Secteur.class);
        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/secteurs/1/48",
                HttpMethod.GET, request, Secteur.class).getStatusCode(), HttpStatus.NOT_FOUND);

        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/secteurs/6/2",
                HttpMethod.GET, request, Secteur.class).getStatusCode(), HttpStatus.NOT_FOUND);
        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/secteurs/1/2",
                HttpMethod.GET, request, Secteur.class).getStatusCode(), HttpStatus.OK);
    }

    @Test
    public void removeBassinSecteur(){
        Secteur secteur = new Secteur("Secteur 7G", "Sud");
        secteur.setId(1L);
        Bassin bassin = new Bassin("bassin 1", 100, 10, State.sale);
        bassin.setId(2L);
        when(bassinService.getOne(2L)).thenReturn(Optional.of(bassin));
        when(secteurService.getOne(1L)).thenReturn(Optional.of(secteur));
        HttpEntity<Secteur> request = new HttpEntity<>(secteur);
        this.restTemplate.exchange("http://localhost:" + port + "/secteur",
                HttpMethod.POST, request, Secteur.class);
        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/secteurs/1/48",
                HttpMethod.DELETE, request, Secteur.class).getStatusCode(), HttpStatus.NOT_FOUND);

        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/secteurs/6/2",
                HttpMethod.DELETE, request, Secteur.class).getStatusCode(), HttpStatus.NOT_FOUND);
        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/secteurs/1/2",
                HttpMethod.DELETE, request, Secteur.class).getStatusCode(), HttpStatus.OK);
    }

    @Test
    public void getFromBassin() {
        Secteur secteur = new Secteur("Secteur 7G", "Sud");
        secteur.setId(1L);
        Bassin bassin = new Bassin("bassin 1", 100, 10, State.sale);
        bassin.setId(2L);
        when(bassinService.getOne(2L)).thenReturn(Optional.of(bassin));
        when(secteurService.getOne(1L)).thenReturn(Optional.of(secteur));
        HttpEntity<Secteur> request = new HttpEntity<>(secteur);
        this.restTemplate.exchange("http://localhost:" + port + "/secteur",
                HttpMethod.POST, request, Secteur.class);
        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/secteurFromBassin/48",
                HttpMethod.GET, request, Secteur.class).getStatusCode(), HttpStatus.NOT_FOUND);
        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/secteurFromBassin/2",
                HttpMethod.GET, request, Secteur.class).getStatusCode(), HttpStatus.OK);
    }
    @Test
    public void deleteSecteur() {

        Secteur secteur = new Secteur("Secteur 7G", "Sud");
        secteur.setId(1L);
        when(secteurService.getOne(1L)).thenReturn(Optional.of(secteur));
        HttpEntity<Secteur> request = new HttpEntity<>(secteur);
        this.restTemplate.exchange("http://localhost:" + port + "/secteur",
                HttpMethod.POST, request, Secteur.class);
        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/secteur/48",
                HttpMethod.DELETE, request, Secteur.class).getStatusCode(), HttpStatus.NOT_FOUND);
        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/secteur/1",
                HttpMethod.DELETE, request, Secteur.class).getStatusCode(), HttpStatus.OK);

    }

    @Test
    public void deleteAll(){

        Secteur secteur = new Secteur("Secteur 7G", "Sud");
        secteur.setId(1L);
        when(secteurService.getOne(1L)).thenReturn(Optional.of(secteur));
        HttpEntity<Secteur> request = new HttpEntity<>(secteur);
        this.restTemplate.exchange("http://localhost:" + port + "/secteur",
                HttpMethod.POST, request, Secteur.class);
        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/secteur",
                HttpMethod.DELETE, request, Secteur.class).getStatusCode(), HttpStatus.OK);
    }

    @Test
    public void putSecteur() {
        Secteur secteur = new Secteur("Secteur 7G", "Sud");
        secteur.setId(1L);

        Secteur secteur2 = new Secteur("Secteur 2F", "Nord");
        secteur2.setId(1L);

        when(secteurService.createSecteur(secteur)).thenReturn(secteur);
        when(secteurService.getOne(1L)).thenReturn(Optional.of(secteur));
        when(secteurService.updateSecteur(1L, secteur2)).thenReturn(secteur2);

        this.restTemplate.postForObject("http://localhost:" + port + "/secteur", secteur, Secteur.class);
        HttpEntity<Secteur> request = new HttpEntity<>(secteur2);

        Secteur result = this.restTemplate.exchange("http://localhost:" + port + "/secteur/1",
                HttpMethod.POST, request, Secteur.class).getBody();


        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/secteur/48",
                HttpMethod.POST, request, Secteur.class).getStatusCode(), HttpStatus.NOT_FOUND);

        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/secteur/1",
                HttpMethod.POST, request, Secteur.class).getStatusCode(), HttpStatus.OK);

        assertEquals(result, secteur2);
    }
}