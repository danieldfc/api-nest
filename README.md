<p align="center">
<a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
<p>

# API-NEST

## Pré-requisitos

- [x] Testar localmente criação de usuários
- [x] Integrar com o TypeOrm:

  - [x] Usar postgres
  - [x] Criar Migrations
  - [x] Criar Entidades/Relacionamentos

- [x] Autenticação: somente usuários cadastrados podem acessar as rotas do API.

- [x] O sistema vai ter os seguintes modelos:

  - [x] User (o usuário do sistema)
  - [x] Role (uma ou mais usuários pode ter 1 ou mais roles)
  - [x] Permission (uma ou mais roles pode ter 1 ou mais permissões)

- [x] O sistema deveria ter os seguintes roles:

  - [x] Administrator
  - [x] User

- [x] O sistema deveria ter os seguintes permissions:

  - [x] Read User (ambos os roles)
  - [x] Create User (somente Administrator)
  - [x] Update User (ambos os roles)
  - [x] Delete User (somente Administrator)

- [x] O API deve ter todas as rotas para manter usuários:

  - [x] Create a new user (somente quem tem o permission Create User)
  - [x] Show an existing user (somente quem tem o permission Read User)
  - [x] Edit an existing user (somente quem tem o permission Update User)
  - [x] Delete an existing user (somente quem tem o permission Delete User)

- [x] Adicionais para manter roles e permissões (somente Administrator):

  - [x] Create a new role and permissions
  - [x] Edit an existing role and permissions
  - [x] Show an existing role and permissions
  - [x] Delete an existing role and permissions

## :zap: Starting

- Importe o arquivo `api/insomnia.json` no [Insomnia](https://insomnia.rest/).
- Verifique o arquivo `api/ormconfig.json`, que é a configuração do banco de dados.
- Após criar o banco de dados `nest-api`, utilizando o `postgres`.
- Instale as dependências do projeto na pasta `api`, executando `yarn` no seu terminal.
- Crie um arquivo `api/.env`, copie do `api/.env.example` o seu conteúdo para o arquivo criado.
- Crie um [hash](http://www.md5.cz/) para a secretKey da aplicação e altere a chave `APP_SECRET=`, para `APP_SECRET='hashCriado'`

### :crossed_flags: Scripts

**Entre na pasta `api`, para poder executar estes comandos.**

Comece a aplicação uma única vez.

```sh
$ nest start
```

Comece a aplicação, que irá estar assistindo a todas as alterações.

```sh
$ nest start:dev
```

Debugue a aplicação.

```sh
$ nest start:debug
```

Crie uma versão em produção.

```sh
$ nest start:prod
```

Production by [Daniel Felizardo](https://github.com/danieldfc) 🚀
