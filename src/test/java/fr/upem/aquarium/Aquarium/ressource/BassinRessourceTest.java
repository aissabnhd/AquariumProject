package fr.upem.aquarium.Aquarium.ressource;

import fr.upem.aquarium.Aquarium.model.*;
import fr.upem.aquarium.Aquarium.repository.AnimalRepository;
import fr.upem.aquarium.Aquarium.repository.BassinRepository;
import fr.upem.aquarium.Aquarium.service.AnimalService;
import fr.upem.aquarium.Aquarium.service.BassinService;
import fr.upem.aquarium.Aquarium.service.EmployeService;
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
public class BassinRessourceTest {
    @LocalServerPort
    private int port;


    @MockBean
    private BassinService bassinService;
    @MockBean
    private BassinRepository bassinRepository;

    @MockBean
    private EspeceService especeService;

    @MockBean
    private EmployeService employeService;

    @Autowired
    private TestRestTemplate restTemplate;



    @Test
    public void getAll() throws Exception {
        List<Bassin> bassin = this.restTemplate.getForObject("http://localhost:" + port + "/bassin", List.class);

        assertEquals(0, bassin.size());
    }

    @Test
    public void postBassin() {
        Bassin bassin = new Bassin("bassin 1", 100, 10, State.sale);
        bassin.setId(1L);
        Employe employe2 = new Employe("Nom", "Prénom", "Paris", null,2L, Role.gestionnaire, "log2", "pwd");
        employe2.setId(2L);
        when(bassinService.createBassin(bassin, Optional.of(employe2))).thenReturn(bassin);
        when(employeService.getOne(2L)).thenReturn(Optional.of(employe2));
        Bassin result = this.restTemplate.postForObject("http://localhost:" + port + "/bassinCreate/2", bassin, Bassin.class);
        assertEquals(bassin, result);

        this.restTemplate.postForObject("http://localhost:" + port + "/employe", employe2, Employe.class);

        HttpEntity<Bassin> request = new HttpEntity<>(bassin);

        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/bassinCreate/2",
                HttpMethod.POST, request, Bassin.class).getStatusCode(), HttpStatus.CREATED);

        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/bassinCreate/23",
                HttpMethod.POST, request, Bassin.class).getStatusCode(), HttpStatus.NOT_FOUND);
    }

    @Test
    public void getOne() {
        Bassin bassin = new Bassin("bassin 1", 100, 10, State.propre);
        bassin.setId(1L);
        when(bassinService.getOne(1L)).thenReturn(Optional.of(bassin));

        HttpEntity<Bassin> request = new HttpEntity<>(bassin);
        this.restTemplate.exchange("http://localhost:" + port + "/bassin",
                HttpMethod.POST, request, Bassin.class);

        Bassin resultGet = this.restTemplate.getForObject("http://localhost:" + port + "/bassin/1", Bassin.class);
        assertEquals(bassin, resultGet);
        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/bassin/1",
                HttpMethod.GET, request, Activite.class).getStatusCode(), HttpStatus.OK);

        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/bassin/2",
                HttpMethod.GET, request, Activite.class).getStatusCode(), HttpStatus.NOT_FOUND);

    }

    @Test
    public void assignEspeceBassin(){
        Bassin bassin = new Bassin("bassin 1", 100, 10, State.sale);
        bassin.setId(1L);
        Espece e = new Espece();
        e.setId(2L);
        when(bassinService.getOne(1L)).thenReturn(Optional.of(bassin));
        when(especeService.getOne(2L)).thenReturn(Optional.of(e));
        HttpEntity<Bassin> request = new HttpEntity<>(bassin);
        this.restTemplate.exchange("http://localhost:" + port + "/bassin",
                HttpMethod.POST, request, Bassin.class);
        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/bassins/1/48",
                HttpMethod.GET, request, Bassin.class).getStatusCode(), HttpStatus.NOT_FOUND);

        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/bassins/6/2",
                HttpMethod.GET, request, Bassin.class).getStatusCode(), HttpStatus.NOT_FOUND);
        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/bassins/1/2",
                HttpMethod.GET, request, Bassin.class).getStatusCode(), HttpStatus.OK);

    }

    @Test
    public void removeEspeceBassin(){
        Bassin bassin = new Bassin("bassin 1", 100, 10, State.sale);
        bassin.setId(1L);
        Espece e = new Espece();
        e.setId(2L);
        when(bassinService.getOne(1L)).thenReturn(Optional.of(bassin));
        when(especeService.getOne(2L)).thenReturn(Optional.of(e));
        HttpEntity<Bassin> request = new HttpEntity<>(bassin);
        this.restTemplate.exchange("http://localhost:" + port + "/bassin",
                HttpMethod.POST, request, Bassin.class);
        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/bassins/1/48",
                HttpMethod.DELETE, request, Bassin.class).getStatusCode(), HttpStatus.NOT_FOUND);

        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/bassins/6/2",
                HttpMethod.DELETE, request, Bassin.class).getStatusCode(), HttpStatus.NOT_FOUND);
        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/bassins/1/2",
                HttpMethod.DELETE, request, Bassin.class).getStatusCode(), HttpStatus.OK);

    }

    @Test
    public void deleteBassin() {

        Bassin bassin = new Bassin("bassin 1", 100, 10, State.propre);
        bassin.setId(1L);
        when(bassinService.getOne(1L)).thenReturn(Optional.of(bassin));
        HttpEntity<Bassin> request = new HttpEntity<>(bassin);
        this.restTemplate.exchange("http://localhost:" + port + "/bassin",
                HttpMethod.POST, request, Bassin.class);
        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/bassin/48",
                HttpMethod.DELETE, request, Bassin.class).getStatusCode(), HttpStatus.NOT_FOUND);
        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/bassin/1",
                HttpMethod.DELETE, request, Bassin.class).getStatusCode(), HttpStatus.OK);

    }

    @Test
    public void deleteAll(){

        Bassin bassin = new Bassin("bassin 1", 100, 10, State.propre);
        bassin.setId(1L);
        when(bassinService.getOne(1L)).thenReturn(Optional.of(bassin));
        HttpEntity<Bassin> request = new HttpEntity<>(bassin);
        this.restTemplate.exchange("http://localhost:" + port + "/bassin",
                HttpMethod.POST, request, Bassin.class);
        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/bassin",
                HttpMethod.DELETE, request, Bassin.class).getStatusCode(), HttpStatus.OK);
    }

    @Test
    public void putBassin() {
        Employe employe = new Employe("Benhamida", "Aïssa", "Torcy", null,1L, Role.employe, "login", "password");
        employe.setId(10L);
        Bassin bassin = new Bassin("bassin 1", 100, 10, State.propre);
        bassin.setId(1L);

        Bassin bassin2 = new Bassin("bassin 2", 500, 50, State.sale);
        bassin2.setId(1L);
        bassin2.setResponsable(employe);

        when(bassinService.createBassin(bassin, Optional.of(employe))).thenReturn(bassin);
        when(bassinService.getOne(1L)).thenReturn(Optional.of(bassin));
        when(employeService.getOne(10L)).thenReturn(Optional.of(employe));
        when(bassinService.updateBassin(1L, bassin2, Optional.of(employe))).thenReturn(bassin2);

        this.restTemplate.postForObject("http://localhost:" + port + "/bassin", bassin, Espece.class);
        HttpEntity<Bassin> request = new HttpEntity<>(bassin2);

        Bassin result = this.restTemplate.exchange("http://localhost:" + port + "/bassin/1/10",
                HttpMethod.POST, request, Bassin.class).getBody();

        assertEquals(result, bassin2);

        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/bassin/1/10",
                HttpMethod.POST, request, Bassin.class).getStatusCode(), HttpStatus.OK);


        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/bassin/1/61",
                HttpMethod.POST, request, Bassin.class).getStatusCode(), HttpStatus.NOT_FOUND);

    }

    @Test
    public void getFromEspece(){
        Bassin bassin = new Bassin("bassin 1", 100, 10, State.sale);
        bassin.setId(1L);
        Espece e = new Espece();
        e.setId(2L);
        when(bassinService.getOne(1L)).thenReturn(Optional.of(bassin));
        when(especeService.getOne(2L)).thenReturn(Optional.of(e));
        HttpEntity<Bassin> request = new HttpEntity<>(bassin);
        this.restTemplate.exchange("http://localhost:" + port + "/bassin",
                HttpMethod.POST, request, Bassin.class);
        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/bassinFromEspece/48",
                HttpMethod.GET, request, Bassin.class).getStatusCode(), HttpStatus.NOT_FOUND);

        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/bassinFromEspece/2",
                HttpMethod.GET, request, Bassin.class).getStatusCode(), HttpStatus.OK);

    }
}
