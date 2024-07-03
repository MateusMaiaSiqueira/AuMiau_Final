package br.univille.service;

import br.univille.model.Animal;
import br.univille.repository.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@Service
@CrossOrigin (origins = "http://localhost:5173")
public class AnimalService {

    @Autowired
    private AnimalRepository animalRepository;

    public List<Animal> listarTodos() {
        return animalRepository.findAll();
    }

    public Optional<Animal> buscarPorId(Long id) {
        return animalRepository.findById(id);
    }

    public Animal salvarAnimal(Animal animal) {
        return animalRepository.save(animal);
    }

    public void deletarAnimal(Long id) {
        animalRepository.deleteById(id);
    }

    public Animal atualizarAnimal(Long id, Animal animalAtualizado) {
        return animalRepository.findById(id).map(animal -> {
            animal.setNome(animalAtualizado.getNome());
            animal.setIdade(animalAtualizado.getIdade());
            animal.setCastrado(animalAtualizado.isCastrado());
            animal.setHumor(animalAtualizado.getHumor());
            animal.setVacinado(animalAtualizado.isVacinado());
            animal.setDescricao(animalAtualizado.getDescricao());
            animal.setTipo(animalAtualizado.getTipo());
            return animalRepository.save(animal);
        }).orElseGet(() -> {
            animalAtualizado.setId(id);
            return animalRepository.save(animalAtualizado);
        });
    }
}
