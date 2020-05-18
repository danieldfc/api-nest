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
  - [x] Role (um usuário pode ter 1 ou mais roles)
  - [x] Permission (um role pode ter 1 ou mais permissões)

- [ ] O sistema deveria ter os seguintes roles:

  - [ ] Administrator
  - [ ] User

- [ ] O sistema deveria ter os seguintes permissions:

  - [ ] Read User (ambos os roles)
  - [ ] Create User (somente Administrator)
  - [ ] Update User (ambos os roles)
  - [ ] Delete User (somente Administrator)

- [ ] O API deve ter todas as rotas para manter usuários:
  - [ ] Create a new user (somente quem tem o permission Create User)
  - [ ] Show an existing user (somente quem tem o permission Read User)
  - [ ] Edit an existing user (somente quem tem o permission Update User)
  - [ ] Delete an existing user (somente quem tem o permission Delete User)

## Starting

- Importe o arquivo `api/insomnia.json` no [Insomnia](https://insomnia.rest/)

### Scripts

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
