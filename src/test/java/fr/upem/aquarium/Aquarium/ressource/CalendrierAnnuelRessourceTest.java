package fr.upem.aquarium.Aquarium.ressource;

import fr.upem.aquarium.Aquarium.model.*;
import fr.upem.aquarium.Aquarium.repository.CalendrierAnnuelRepository;
import fr.upem.aquarium.Aquarium.repository.CalendrierHebdomadaireRepository;
import fr.upem.aquarium.Aquarium.service.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class CalendrierAnnuelRessourceTest {
    @LocalServerPort
    private int port;


    @MockBean
    private CalendrierAnnuelService calendrierAnnuelService;
    @MockBean
    private CalendrierAnnuelRepository calendrierAnnuelRepository;

    @MockBean
    private CalendrierHebdomadaire calendrierHebdomadaire;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void getAll() throws Exception {
        List<CalendrierAnnuel> calendrierAnnuels = this.restTemplate.getForObject("http://localhost:" + port + "/calendrier_annuel", List.class);

        assertEquals(0, calendrierAnnuels.size());
    }

    @Test
    public void postCalendrierAnnuel() {
        CalendrierAnnuel calendrierAnnuel = new CalendrierAnnuel(2019);
        calendrierAnnuel.setId(1L);
        when(calendrierAnnuelService.createCalendrierAnnuel(calendrierAnnuel)).thenReturn(calendrierAnnuel);

        CalendrierAnnuel result = this.restTemplate.postForObject("http://localhost:" + port + "/calendrier_annuel", calendrierAnnuel, CalendrierAnnuel.class);
        assertEquals(calendrierAnnuel, result);
    }

    @Test
    public void addSemaine(){
        // TODO
    }

    @Test
    public void removeSemaine(){
        // TODO
    }

    @Test
    public void getOne() {
        CalendrierAnnuel calendrierAnnuel = new CalendrierAnnuel(2019);
        calendrierAnnuel.setId(1L);
        when(calendrierAnnuelService.getOne(1L)).thenReturn(Optional.of(calendrierAnnuel));

        HttpEntity<CalendrierAnnuel> request = new HttpEntity<>(calendrierAnnuel);
        this.restTemplate.exchange("http://localhost:" + port + "/calendrier_annuel",
                HttpMethod.POST, request, CalendrierHebdomadaire.class);

        CalendrierAnnuel resultGet = this.restTemplate.getForObject("http://localhost:" + port + "/calendrier_annuel/1", CalendrierAnnuel.class);
        assertEquals(calendrierAnnuel, resultGet);
    }

    @Test
    public void deleteCalendrierAnnuel() {
        // TODO

    }

    @Test
    public void deleteAll(){
        // TODO
    }

    @Test
    public void putCalendrierAnnuel() {
        CalendrierAnnuel calendrierAnnuel = new CalendrierAnnuel(2019);
        calendrierAnnuel.setId(1L);

        CalendrierAnnuel calendrierAnnuel1 = new CalendrierAnnuel(2020);
        calendrierAnnuel1.setId(2L);

        when(calendrierAnnuelService.createCalendrierAnnuel(calendrierAnnuel)).thenReturn(calendrierAnnuel);
        when(calendrierAnnuelService.updateCalendrierAnnuel(1L, calendrierAnnuel1)).thenReturn(calendrierAnnuel1);

        this.restTemplate.postForObject("http://localhost:" + port + "/calendrier_annuel", calendrierAnnuel, CalendrierAnnuel.class);
        HttpEntity<CalendrierAnnuel> request = new HttpEntity<>(calendrierAnnuel1);

        CalendrierAnnuel result = this.restTemplate.exchange("http://localhost:" + port + "/calendrier_annuel/1",
                HttpMethod.POST, request, CalendrierAnnuel.class).getBody();

        assertEquals(result, calendrierAnnuel1);
    }
}