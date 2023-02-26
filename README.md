
<p  align="center">

<a  href="https://weef.com.br/"  target="blank"><img  src="https://weef.com.br/assets/images/logo-header.svg"  width="200"  alt="Nest Logo"  /></a>

</p>

  

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456

[circleci-url]: https://circleci.com/gh/nestjs/nest

  

<p  align="center">Este é um teste realizado para a Weef, tendo como finalidade a avaliação de candidatura para admissão</p>

<p  align="center">

</p>


  

## Descrição

  

Esta api foi constuida com o Framework [Nest](https://github.com/nestjs/nest).

  

## Instalação

  Para fácil inicialização e visualização do teste acoplei os comandos de instalação e inicialização da api em um único comando no arquivo Makefile:

```bash

$ make api_first_init

```

Caso não tenha o comando make habilitado em sua maquina será necessária a execução dos seguintes comandos:

```bash
$ cp .env.example .env

$ yarn install

$ docker compose up -d

$ make api_migrations_run

$ make api_seeder_run
```
  

## Test

  Como garantia foi adicionada a execução automática dos testes como comando de pre-commit, mas caso queiram executar manualmente basta utilizar o seguinte comando:

```bash

# unit tests

$ make api_test

```

- Autor: André Aguayo Alves

- Linkedin - [https://linkedin.com](https://www.linkedin.com/in/andr%C3%A9-aguayo-alves-1682741a0/)

 
