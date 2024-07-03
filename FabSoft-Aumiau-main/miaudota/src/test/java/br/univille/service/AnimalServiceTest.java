package br.univille.service;

import br.univille.model.Animal;
import br.univille.repository.AnimalRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.any;

@SpringBootTest
public class AnimalServiceTest {

    @Autowired
    private AnimalService animalService;

    @MockBean
    private AnimalRepository animalRepository;

    @Test
    public void testSalvarAnimal() {
        Animal animal = new Animal();
        animal.setNome("Rex");
        when(animalRepository.save(any(Animal.class))).thenReturn(animal);

        Animal savedAnimal = animalService.salvarAnimal(animal);
        assertEquals("Rex", savedAnimal.getNome());
    }

    @Test
    public void testBuscarPorId() {
        Animal animal = new Animal();
        animal.setId(1L);
        when(animalRepository.findById(1L)).thenReturn(Optional.of(animal));

        Optional<Animal> foundAnimal = animalService.buscarPorId(1L);
        assertEquals(true, foundAnimal.isPresent());
        assertEquals(1L, foundAnimal.get().getId());
    }
}

