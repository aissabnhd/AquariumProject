package fr.upem.aquarium.Aquarium.ressource;

import fr.upem.aquarium.Aquarium.model.*;
import fr.upem.aquarium.Aquarium.repository.ActiviteRepository;
import fr.upem.aquarium.Aquarium.repository.AnimalRepository;
import fr.upem.aquarium.Aquarium.repository.EspeceRepository;
import fr.upem.aquarium.Aquarium.service.*;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.crypto.spec.OAEPParameterSpec;
import java.util.ArrayList;
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
    @MockBean
    private EmployeService employeService;


    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void getAll() throws Exception {
        List<Activite> activites = this.restTemplate.getForObject("http://localhost:" + port + "/activite", List.class);

        assertEquals(0, activites.size());
    }

    @Test
    public void getActivitesOfEmployes(){
        Employe employe = new Employe("Benhamida", "Aïssa", "Torcy", null,1L, Role.employe, "login", "password");
        employe.setId(10L);
        Bassin bassin = new Bassin("bassin 1", 100, 10, State.sale);
        bassin.setId(1L);

        Activite activite = new Activite("Repas", null, null, true, null );
        activite.setId(2L);
        Activite activite2 = new Activite("Repas", null, null, true, bassin );
        activite2.setId(2L);

        when(employeService.getOne(10L)).thenReturn(Optional.of(employe));
        when(bassinService.createBassin(bassin, Optional.of(employe))).thenReturn(bassin);
        when(activiteService.createActiviteBassin(activite, bassin)).thenReturn(activite2);
        when(bassinService.getOne(1L)).thenReturn(Optional.of(bassin));

        this.restTemplate.postForObject("http://localhost:" + port + "/bassinCreate/10", bassin, Bassin.class);
        HttpEntity<Activite> request = new HttpEntity<>(activite);



        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/activiteOfEmploye/10",
                HttpMethod.GET, request, List.class).getStatusCode(), HttpStatus.OK);


        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/activiteOfEmploye/61",
                HttpMethod.GET, request, Activite.class).getStatusCode(), HttpStatus.NOT_FOUND);

    }
    @Test
    public void getActivitesOfBassin(){
        Employe employe = new Employe("Benhamida", "Aïssa", "Torcy", null,1L, Role.employe, "login", "password");
        employe.setId(10L);
        Bassin bassin = new Bassin("bassin 1", 100, 10, State.sale);
        bassin.setId(1L);

        Activite activite = new Activite("Repas", null, null, true, null );
        activite.setId(2L);
        Activite activite2 = new Activite("Repas", null, null, true, bassin );
        activite2.setId(2L);

        when(employeService.getOne(10L)).thenReturn(Optional.of(employe));
        when(bassinService.createBassin(bassin, Optional.of(employe))).thenReturn(bassin);
        when(activiteService.createActiviteBassin(activite, bassin)).thenReturn(activite2);
        when(bassinService.getOne(1L)).thenReturn(Optional.of(bassin));

        this.restTemplate.postForObject("http://localhost:" + port + "/bassinCreate/10", bassin, Bassin.class);
        HttpEntity<Activite> request = new HttpEntity<>(activite);



        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/activiteOfBassin/1",
                HttpMethod.GET, request, List.class).getStatusCode(), HttpStatus.OK);


        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/activiteOfBassin/61",
                HttpMethod.GET, request, Activite.class).getStatusCode(), HttpStatus.NOT_FOUND);


    }

    @Test
    public void postActivite() {
        Activite activite = new Activite("Repas", null, null, true, null);
        activite.setId(1L);
        when(activiteService.createActivite(activite)).thenReturn(activite);

        Activite result = this.restTemplate.postForObject("http://localhost:" + port + "/activite", activite, Activite.class);
        assertEquals(activite, result);

        HttpEntity<Activite> request = new HttpEntity<>(activite);

        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/activite",
                HttpMethod.POST, request, Activite.class).getStatusCode(), HttpStatus.CREATED);
    }

    @Test
    public void getOne() {
        Activite activite = new Activite("Repas", null, null, true, null );
        activite.setId(1L);
        when(activiteService.getOne(1L)).thenReturn(Optional.of(activite));
        HttpEntity<Activite> request = new HttpEntity<>(activite);
        this.restTemplate.exchange("http://localhost:" + port + "/activite",
                HttpMethod.POST, request, Activite.class);

        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/activite/1",
                HttpMethod.GET, request, Activite.class).getStatusCode(), HttpStatus.OK);

        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/activite/2",
                HttpMethod.GET, request, Activite.class).getStatusCode(), HttpStatus.NOT_FOUND);

        Activite resultGet = this.restTemplate.getForObject("http://localhost:" + port + "/activite/1", Activite.class);
        assertEquals(activite, resultGet);
    }

    @Test
    public void postActiviteWithBassin(){
        Employe employe = new Employe("Benhamida", "Aïssa", "Torcy", null,1L, Role.employe, "login", "password");
        employe.setId(10L);
        Bassin bassin = new Bassin("bassin 1", 100, 10, State.sale);
        bassin.setId(1L);

        Activite activite = new Activite("Repas", null, null, true, null );
        activite.setId(2L);
        Activite activite2 = new Activite("Repas", null, null, true, bassin );
        activite2.setId(2L);

        when(employeService.getOne(10L)).thenReturn(Optional.of(employe));
        when(bassinService.createBassin(bassin, Optional.of(employe))).thenReturn(bassin);
        when(activiteService.createActiviteBassin(activite, bassin)).thenReturn(activite2);
        when(bassinService.getOne(1L)).thenReturn(Optional.of(bassin));

        this.restTemplate.postForObject("http://localhost:" + port + "/bassinCreate/10", bassin, Bassin.class);
        HttpEntity<Activite> request = new HttpEntity<>(activite);

        Activite result = this.restTemplate.exchange("http://localhost:" + port + "/activite_bassin/1",
                HttpMethod.POST, request, Activite.class).getBody();
        assertEquals(result, activite2);


        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/activite_bassin/1",
                HttpMethod.POST, request, Activite.class).getStatusCode(), HttpStatus.CREATED);


        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/activite_bassin/61",
                HttpMethod.POST, request, Activite.class).getStatusCode(), HttpStatus.NOT_FOUND);

    }

    @Test
    public void updateEmploye(){
        Activite activite = new Activite("Repas", null, null, false, null);
        activite.setId(1L);
        Activite activite2 = new Activite("Jouer", null, null, true, null);
        activite2.setId(1L);
        Bassin b = new Bassin();
        b.setId(10L);
        when(bassinService.getOne(10L)).thenReturn(Optional.of(b));
        when(activiteService.createActivite(activite)).thenReturn(activite);
        when(activiteService.getOne(1L)).thenReturn(Optional.of(activite));
        when(activiteService.updateActivite(1L, activite2)).thenReturn(activite2);

        this.restTemplate.postForObject("http://localhost:" + port + "/activite", activite, Espece.class);
        HttpEntity<List<Employe>> request = new HttpEntity<>(new ArrayList<Employe>());



        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/activite_update_employe/1",
                HttpMethod.POST, request, Activite.class).getStatusCode(), HttpStatus.OK);


        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/activite_update_employe/61",
                HttpMethod.POST, request, Activite.class).getStatusCode(), HttpStatus.NOT_FOUND);



    }

    @Test
    public void deleteActivite() {

        Activite activite = new Activite("Repas", null, null, true, null );
        activite.setId(1L);
        when(activiteService.getOne(1L)).thenReturn(Optional.of(activite));
        HttpEntity<Activite> request = new HttpEntity<>(activite);
        this.restTemplate.exchange("http://localhost:" + port + "/activite",
                HttpMethod.POST, request, Activite.class);
        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/activite/48",
                HttpMethod.DELETE, request, Activite.class).getStatusCode(), HttpStatus.NOT_FOUND);
        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/activite/1",
                HttpMethod.DELETE, request, Activite.class).getStatusCode(), HttpStatus.OK);
    }

    @Test
    public void deleteAll(){
        Activite activite = new Activite("Repas", null, null, true, null );
        activite.setId(1L);
        when(activiteService.getOne(1L)).thenReturn(Optional.of(activite));
        HttpEntity<Activite> request = new HttpEntity<>(activite);
        this.restTemplate.exchange("http://localhost:" + port + "/activite",
                HttpMethod.POST, request, Activite.class);
        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/activite",
                HttpMethod.DELETE, request, Activite.class).getStatusCode(), HttpStatus.OK);
    }

    @Test
    public void putActivite() {
        Activite activite = new Activite("Repas", null, null, false, null);
        activite.setId(1L);
        Activite activite2 = new Activite("Jouer", null, null, true, null);
        activite2.setId(1L);
        when(activiteService.createActivite(activite)).thenReturn(activite);
        when(activiteService.getOne(1L)).thenReturn(Optional.of(activite));
        when(activiteService.updateActivite(1L, activite2)).thenReturn(activite2);

        this.restTemplate.postForObject("http://localhost:" + port + "/activite", activite, Espece.class);
        HttpEntity<Activite> request = new HttpEntity<>(activite2);

        Activite result = this.restTemplate.exchange("http://localhost:" + port + "/activite/1",
                HttpMethod.POST, request, Activite.class).getBody();

        assertEquals(result, activite2);

        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/activite/1",
                HttpMethod.POST, request, Activite.class).getStatusCode(), HttpStatus.OK);


        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/activite/61",
                HttpMethod.POST, request, Activite.class).getStatusCode(), HttpStatus.NOT_FOUND);
    }

    @Test
    public void putActiviteBis(){
        Activite activite = new Activite("Repas", null, null, false, null);
        activite.setId(1L);
        Activite activite2 = new Activite("Jouer", null, null, true, null);
        activite2.setId(1L);
        Bassin b = new Bassin();
        b.setId(10L);
        when(bassinService.getOne(10L)).thenReturn(Optional.of(b));
        when(activiteService.createActivite(activite)).thenReturn(activite);
        when(activiteService.getOne(1L)).thenReturn(Optional.of(activite));
        when(activiteService.updateActivite(1L, activite2)).thenReturn(activite2);

        this.restTemplate.postForObject("http://localhost:" + port + "/activite", activite, Espece.class);
        HttpEntity<Activite> request = new HttpEntity<>(activite2);

        Activite result = this.restTemplate.exchange("http://localhost:" + port + "/activite_update/1/10",
                HttpMethod.POST, request, Activite.class).getBody();

        assertEquals(result, activite2);

        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/activite_update/1/10",
                HttpMethod.POST, request, Activite.class).getStatusCode(), HttpStatus.OK);


        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/activite_update/61/10",
                HttpMethod.POST, request, Activite.class).getStatusCode(), HttpStatus.NOT_FOUND);


        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/activite_update/1/110",
                HttpMethod.POST, request, Activite.class).getStatusCode(), HttpStatus.NOT_FOUND);

    }
}
