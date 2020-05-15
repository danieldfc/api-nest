# API-NEST

## Pré-requisitos

- [ ] Autenticação: somente usuários cadastrados podem acessar as rotas do API.

- [ ] O sistema vai ter os seguintes modelos:
  - [ ] User (o usuário do sistema)
  - [ ] Role (um usuário pode ter 1 ou mais roles)
  - [ ] Permission (um role pode ter 1 ou mais permissões)

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