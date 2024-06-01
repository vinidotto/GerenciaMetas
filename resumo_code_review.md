## Requisitos:

- [x] Crie um projeto do zero em Next com TypeScript;
- [x] Crie um projeto no Firebase;
- [x] Crie uma autenticação no projeto;
- [x] Crie uma tabela no Firebase para que os usuários possam definir e acompanhar suas metas pessoais ou profissionais;
- [x] Metas Pessoais ou Profissionais contém: título da meta, descrição, data de início, data de conclusão e status, assim como inserir o id do usuário que está autenticado no sistema;
   - Faltou o titulo.
- [x] Listagem de metas;
- [ ] Listagem de metas apenas para usuários autorizados;
- [x] Deletar meta;
- [x] Criar meta;
- [x] Não poder criar uma meta anterior ao dia atual;
- [x] Não ter data de conclusão anterior à data de inicio;
- [x] Validações de tamanho de texto no título e descrição;
- [x] Um usuário somente poderá ver suas metas, ou seja, não poderá ver as metas dos demais usuários;
- [x] Faça o deploy da aplicação e adicione o link dela no Readme do projeto;
  - Está no "sobre" do projeto.

## Pontos importantes:

- [x] .env presente no .gitignore;
- [ ] Divisão do desenvolvimento em commits;
- [x] Projeto Frontend na raiz do repositório;
- [x] Tratamento de erros.

## Pontos A Melhorar

Caso o usuário não esteja logado, não poderá acessar a listagem de metas e cadastro de meta, consegui acessar os dois, porém há uma trava para usuário não autorizado ao criar meta.
(Implementar um redirecionamento de rota caso usuário nãop autenticado.)

Ao criar uma meta, o sistema poderia redirecionar o usuário para a listagem.

Não há tratamento para senha inválida.

Há uma diferença na autenticação do teu projeto comparada com a autenticação dos outros, acredito que a localização de services/firebase seja dentro de src/

Ótimo design do front!