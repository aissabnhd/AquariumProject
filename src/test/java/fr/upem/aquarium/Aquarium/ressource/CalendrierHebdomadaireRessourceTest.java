package fr.upem.aquarium.Aquarium.ressource;

import fr.upem.aquarium.Aquarium.model.*;
import fr.upem.aquarium.Aquarium.repository.AnimalRepository;
import fr.upem.aquarium.Aquarium.repository.BassinRepository;
import fr.upem.aquarium.Aquarium.repository.CalendrierHebdomadaireRepository;
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
public class CalendrierHebdomadaireRessourceTest {
    @LocalServerPort
    private int port;


    @MockBean
    private CalendrierHebdomadaireService calendrierHebdomadaireService;
    @MockBean
    private CalendrierHebdomadaireRepository calendrierHebdomadaireRepository;

    @MockBean
    private ActiviteService activiteService;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void getAll() throws Exception {
        List<CalendrierHebdomadaire> calendrierHebdomadaires = this.restTemplate.getForObject("http://localhost:" + port + "/calendrier_hebdomadaire", List.class);

        assertEquals(0, calendrierHebdomadaires.size());
    }

    @Test
    public void postCalendrierHebdomadaire() {
        CalendrierHebdomadaire calendrierHebdomadaire = new CalendrierHebdomadaire();
        calendrierHebdomadaire.setId(1L);
        when(calendrierHebdomadaireService.createCalendrierHebdomadaire(calendrierHebdomadaire)).thenReturn(calendrierHebdomadaire);

        CalendrierHebdomadaire result = this.restTemplate.postForObject("http://localhost:" + port + "/calendrier_hebdomadaire", calendrierHebdomadaire, CalendrierHebdomadaire.class);
        assertEquals(calendrierHebdomadaire, result);
    }

    @Test
    public void addActiviteCalendrierHebdo(){
        // TODO
    }

    @Test
    public void removeActiviteCalendrierHebdo(){
        // TODO
    }

    @Test
    public void getOne() {
        CalendrierHebdomadaire calendrierHebdomadaire = new CalendrierHebdomadaire();
        calendrierHebdomadaire.setId(1L);
        when(calendrierHebdomadaireService.getOne(1L)).thenReturn(Optional.of(calendrierHebdomadaire));

        HttpEntity<CalendrierHebdomadaire> request = new HttpEntity<>(calendrierHebdomadaire);
        this.restTemplate.exchange("http://localhost:" + port + "/calendrier_hebdomadaire",
                HttpMethod.POST, request, CalendrierHebdomadaire.class);

        CalendrierHebdomadaire resultGet = this.restTemplate.getForObject("http://localhost:" + port + "/calendrier_hebdomadaire/1", CalendrierHebdomadaire.class);
        assertEquals(calendrierHebdomadaire, resultGet);
    }

    @Test
    public void deleteCalendrierHebdomadaire() {
        // TODO

    }

    @Test
    public void deleteAll(){
        // TODO
    }

    @Test
    public void putCalendrierHebdomadaire() {
        CalendrierHebdomadaire calendrierHebdomadaire = new CalendrierHebdomadaire();
        calendrierHebdomadaire.setId(1L);

        CalendrierHebdomadaire calendrierHebdomadaire2 = new CalendrierHebdomadaire();
        calendrierHebdomadaire2.setId(2L);

        when(calendrierHebdomadaireService.createCalendrierHebdomadaire(calendrierHebdomadaire)).thenReturn(calendrierHebdomadaire);
        when(calendrierHebdomadaireService.updateCalendrierHebdomadaire(1L, calendrierHebdomadaire2)).thenReturn(calendrierHebdomadaire2);

        this.restTemplate.postForObject("http://localhost:" + port + "/calendrier_hebdomadaire", calendrierHebdomadaire, CalendrierHebdomadaire.class);
        HttpEntity<CalendrierHebdomadaire> request = new HttpEntity<>(calendrierHebdomadaire2);

        CalendrierHebdomadaire result = this.restTemplate.exchange("http://localhost:" + port + "/calendrier_hebdomadaire/1",
                HttpMethod.POST, request, CalendrierHebdomadaire.class).getBody();

        assertEquals(result, calendrierHebdomadaire2);
    }
}