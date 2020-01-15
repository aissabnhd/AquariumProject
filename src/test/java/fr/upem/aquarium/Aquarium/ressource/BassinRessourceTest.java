package fr.upem.aquarium.Aquarium.ressource;

import fr.upem.aquarium.Aquarium.model.*;
import fr.upem.aquarium.Aquarium.repository.AnimalRepository;
import fr.upem.aquarium.Aquarium.repository.BassinRepository;
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
public class BassinRessourceTest {
    @LocalServerPort
    private int port;


    @MockBean
    private BassinService bassinService;
    @MockBean
    private BassinRepository bassinRepository;

    @MockBean
    private EspeceService especeService;

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
        when(bassinService.createBassin(bassin)).thenReturn(bassin);

        Bassin result = this.restTemplate.postForObject("http://localhost:" + port + "/bassin", bassin, Bassin.class);
        assertEquals(bassin, result);
    }

    @Test
    public void assignEspeceBassin(){
       // TODO
    }

    @Test
    public void removeEspeceBassin(){
        // TODO
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
    }

    @Test
    public void deleteBassin() {
        // TODO

    }

    @Test
    public void deleteAll(){
        // TODO
    }

    @Test
    public void putBassin() {
        Bassin bassin = new Bassin("bassin 1", 100, 10, State.propre);
        bassin.setId(1L);

        Bassin bassin2 = new Bassin("bassin 2", 500, 50, State.sale);
        bassin2.setId(1L);

        when(bassinService.createBassin(bassin)).thenReturn(bassin);
        when(bassinService.updateBassin(1L, bassin2)).thenReturn(bassin2);

        this.restTemplate.postForObject("http://localhost:" + port + "/bassin", bassin, Bassin.class);
        HttpEntity<Bassin> request = new HttpEntity<>(bassin2);

        Bassin result = this.restTemplate.exchange("http://localhost:" + port + "/bassin/1",
                HttpMethod.POST, request, Bassin.class).getBody();

        assertEquals(result, bassin2);
    }
}