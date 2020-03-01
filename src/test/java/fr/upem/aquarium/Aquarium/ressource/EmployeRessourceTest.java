package fr.upem.aquarium.Aquarium.ressource;

import fr.upem.aquarium.Aquarium.model.*;
import fr.upem.aquarium.Aquarium.repository.AnimalRepository;
import fr.upem.aquarium.Aquarium.repository.EmployeRepository;
import fr.upem.aquarium.Aquarium.repository.EspeceRepository;
import fr.upem.aquarium.Aquarium.service.AnimalService;
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
public class EmployeRessourceTest {
    @LocalServerPort
    private int port;


    @MockBean
    private EmployeService employeService;
    @MockBean
    private EmployeRepository employeRepository;


    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void getAll() throws Exception {
        List<Employe> employes = this.restTemplate.getForObject("http://localhost:" + port + "/employe", List.class);

        assertEquals(0, employes.size());
    }

    @Test
    public void postEmploye() {
        Employe employe = new Employe("Benhamida", "Aïssa", "Torcy", null,1L, Role.employe, "login", "password");
        employe.setId(1L);
        when(employeService.createEmploye(employe)).thenReturn(employe);

        Employe result = this.restTemplate.postForObject("http://localhost:" + port + "/employe", employe, Employe.class);
        assertEquals(employe, result);

        HttpEntity<Employe> request = new HttpEntity<>(employe);

        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/employe",
                HttpMethod.POST, request, Employe.class).getStatusCode(), HttpStatus.CREATED);
    }

    @Test
    public void getOne() {
        Employe employe = new Employe("Benhamida", "Aïssa", "Torcy", null,1L, Role.employe, "login", "password");
        employe.setId(1L);
        when(employeService.getOne(1L)).thenReturn(Optional.of(employe));
        HttpEntity<Employe> request = new HttpEntity<>(employe);
        this.restTemplate.exchange("http://localhost:" + port + "/employe",
                HttpMethod.POST, request, Employe.class);

        Employe resultGet = this.restTemplate.getForObject("http://localhost:" + port + "/employe/1", Employe.class);
        assertEquals(employe, resultGet);
        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/employe/48",
                HttpMethod.GET, request, Employe.class).getStatusCode(), HttpStatus.NOT_FOUND);

        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/employe/1",
                HttpMethod.GET, request, Employe.class).getStatusCode(), HttpStatus.OK);
    }

    @Test
    public void deleteEmploye() {
        Employe employe = new Employe("Benhamida", "Aïssa", "Torcy", null,1L, Role.employe, "login", "password");
        employe.setId(1L);
        when(employeService.getOne(1L)).thenReturn(Optional.of(employe));
        HttpEntity<Employe> request = new HttpEntity<>(employe);
        this.restTemplate.exchange("http://localhost:" + port + "/employe",
                HttpMethod.POST, request, Employe.class);
        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/employe/48",
                HttpMethod.DELETE, request, Employe.class).getStatusCode(), HttpStatus.NOT_FOUND);
        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/employe/1",
                HttpMethod.DELETE, request, Employe.class).getStatusCode(), HttpStatus.OK);

    }

    @Test
    public void deleteAll(){
        Employe employe = new Employe("Benhamida", "Aïssa", "Torcy", null,1L, Role.employe, "login", "password");
        employe.setId(1L);
        when(employeService.getOne(1L)).thenReturn(Optional.of(employe));
        HttpEntity<Employe> request = new HttpEntity<>(employe);
        this.restTemplate.exchange("http://localhost:" + port + "/employe",
                HttpMethod.POST, request, Employe.class);
        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/employe",
                HttpMethod.DELETE, request, Employe.class).getStatusCode(), HttpStatus.OK);
    }

    @Test
    public void putEmploye() {
        Employe employe = new Employe("Benhamida", "Aïssa", "Torcy", null,1L, Role.employe, "login", "password");
        employe.setId(1L);

        Employe employe2 = new Employe("Benhameeeeeeida", "Aïseeeesa", "Torcy", null,1L, Role.employe, "login", "password");
        employe.setId(2L);

        when(employeService.createEmploye(employe)).thenReturn(employe);
        when(employeService.getOne(1L)).thenReturn(Optional.of(employe));
        when(employeService.updateEmploye(1L, employe2)).thenReturn(employe2);

        this.restTemplate.postForObject("http://localhost:" + port + "/employe", employe, Employe.class);
        HttpEntity<Employe> request = new HttpEntity<>(employe2);

        Employe result = this.restTemplate.exchange("http://localhost:" + port + "/employe/1",
                HttpMethod.POST, request, Employe.class).getBody();


        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/employe/48",
                HttpMethod.POST, request, Employe.class).getStatusCode(), HttpStatus.NOT_FOUND);

        assertEquals(this.restTemplate.exchange("http://localhost:" + port + "/employe/1",
                HttpMethod.POST, request, Employe.class).getStatusCode(), HttpStatus.OK);

        assertEquals(result, employe2);


    }
}