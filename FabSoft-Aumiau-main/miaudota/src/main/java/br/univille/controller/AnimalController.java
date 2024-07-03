package br.univille.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.univille.model.Animal;
import br.univille.repository.AnimalRepository;

@RestController
@CrossOrigin (origins = "http://localhost:5173")
@RequestMapping("/animais")
public class AnimalController {

    @Autowired
    private AnimalRepository animalRepository;

    //Listar todos os animais
    @GetMapping
    public List<Animal> listarTodos() {
        return animalRepository.findAll();
    }

    //Buscar um animal pelo ID
    @GetMapping("/{id}")
    public Animal buscarPorId(@PathVariable Long id) {
        Optional<Animal> animal = animalRepository.findById(id);
        return animal.orElse(null);
    }

    //Criar um novo animal
    @PostMapping
    public Animal criarAnimal(@RequestBody Animal animal) {
        return animalRepository.save(animal);
    }

    //Atualizar um animal existente
    @PutMapping("/{id}")
    public Animal atualizarAnimal(@PathVariable Long id, @RequestBody Animal animalAtualizado) {
        return animalRepository.findById(id)
            .map(animal -> {
                animal.setNome(animalAtualizado.getNome());
                animal.setIdade(animalAtualizado.getIdade());
                animal.setCastrado(animalAtualizado.isCastrado());
                animal.setHumor(animalAtualizado.getHumor());
                animal.setVacinado(animalAtualizado.isVacinado());
                animal.setDescricao(animalAtualizado.getDescricao());
                animal.setTipo(animalAtualizado.getTipo());
                return animalRepository.save(animal);
            })
            .orElseGet(() -> {
                animalAtualizado.setId(id);
                return animalRepository.save(animalAtualizado);
            });
    }

    //DELETE: Deletar um animal
    @DeleteMapping("/{id}")
    public void deletarAnimal(@PathVariable Long id) {
        animalRepository.deleteById(id);
    }
}
