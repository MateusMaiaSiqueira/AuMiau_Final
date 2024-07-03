package br.univille.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Animal {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nome;
    private int idade;
    private boolean castrado;
    private String humor;
    private boolean vacinado;
    private String foto;
    private String descricao;
    private String tipo;
    public String getTipo() {
        return tipo;
    }
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public int getIdade() {
        return idade;
    }
    public void setIdade(int idade) {
        this.idade = idade;
    }
    public boolean isCastrado() {
        return castrado;
    }
    public void setCastrado(boolean castrado) {
        this.castrado = castrado;
    }
    public String getHumor() {
        return humor;
    }
    public void setHumor(String humor) {
        this.humor = humor;
    }
    public boolean isVacinado() {
        return vacinado;
    }
    public void setVacinado(boolean vacinado) {
        this.vacinado = vacinado;
    }
    public String getFoto() {
        return foto;
    }
    public void setFoto(String foto) {
        this.foto = foto;
    }
    public String getDescricao() {
        return descricao;
    }
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
    
}