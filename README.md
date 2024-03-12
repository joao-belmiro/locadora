# Locadora

### Tecnologias do projeto 
para este projeto usamos as tecnologias abaixo, com foco de usar o que tem de mais atual no ecossistema do Vue.js:

##### Dependências
| Pacote      | Versão  |
|-------------|---------|
| axios       | 1.6.7  |
| vue         | 3.4.19 |
| vue-router  | 4.3.0  |
| tailwindcss             | 3.4.1 |
| typescript              | 5.2.2 |
| @vue/test-utils         | 2.4.4 |
| @vitejs/plugin-vue      | 5.0.4 |
| vite                    | 5.1.4 |
| vitest                  | 1.3.1 |

Este é um crud de 3 entidades com foco em simular uma locadora, desde o login no sitema e a locação de filmes e séries ,os dados são salvos em uma local storage para manter os dados persistidos

##### Mais informações sobre testes e código

veja esse projeto onde tenho outras funcionalidades e testes que julgo serem importantes [products-selling](https://github.com/joao-belmiro/products-selling)

## Disclaimer 
* Não há validações complexas nos formulários nem formatação rigorosa dos dados
* as variaveis de ambiente estão mocadas para facilitar o avaliador

## Instalação das dependências

Primeiro precisamos instalar um versão do nodeJs compatível, para este projeto temos a versão abaixo, que foi usada para 

[Nodejs 18.14.0](https://nodejs.org/en/blog/release/v18.14.0)


Para realizar a configuração local do projeto siga os passos **1** e **2** e o projeto aparecerá disponivel na url [localhost:8080]( http://localhost:8080/) caso esta porta esteja disponível
### 1- Instalação das dependências
```
npm install
```

### 2- Compilar e subir o servidor local
```
npm run dev
```

### Build da aplicação
Ao realizar o build da aplicação podemos fazer o deploy em alguma plataforma apenas copiando a pasta /dist, ou crie um fork do projeto e faça as alterações desejadas 
```
npm run build
```

### Executar testes unitários
Foram feitos testes unitários apenas para atestar conhecimento, e não máxima cobertura do código, para mais exemplos vide o projeto supracitado 

```
npm run test
```

### Executar a aplicação usando docker

Com o docker devidamente instaado na sua máquina, crie a imagem com o comando abaixo 
```
docker build -t locadora .
```
em seguida inicie um container a partir da imagem criada na porta 8080 utilizando o comando
```
docker run -p 8080:8080 locadora
```
Feito isso a sua aplicação estará executando em um container docker