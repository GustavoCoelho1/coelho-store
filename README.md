<a name="readme-top"></a>

![License](https://img.shields.io/badge/License-MIT-green)&nbsp;
<a href="https://www.linkedin.com/in/gustavo-coelho1/">![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)</a>&nbsp;




<br />
<div align="center">
  
<!--<img src="" alt="Logo" width="100" height="100">-->
  

<h3 align="center">Coelho Store</h3>

  <p align="center">
    E-commerce completo com gerenciamento de produtos e clientes integrado.
    <br />
    <a href="" target="_blank">🌐 Ir para site do projeto</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Sumário da documentação</summary>
  <ol>
    <li>
      <a href="#sobre-o-projeto">Sobre o projeto</a>
      <ul>
        <li><a href="#tecnologias-utilizadas">Tecnologias utilizadas</a></li>
      </ul>
    </li>
    <li>
      <a href="#para-começar">Para começar</a>
      <ul>
        <li><a href="#pre-requisitos">Pré-requisitos</a></li>
        <li><a href="#instalacao">Instalação</a></li>
      </ul>
    </li>
    <li><a href="#entendendo-a-estrutura">Entendendo a estrutura</a></li>
    <li><a href="#como-utilizar">Como utilizar?</a></li>
    <li><a href="#licença-mit">Licença MIT</a></li>
    <li><a href="#contato">Contato</a></li>
  </ol>
</details>

<br />

## Sobre o projeto
Minha ideia inicial com o projeto era estudar as linguagens que eu tinha recentemente conhecido, e com base nisso criar um e-commerce com muitas funcionalidades, de um jeito que ficasse muito próximo de um projeto real.
Porém, como as tecnologias eram muito novas para mim, o nível de complexidade do projeto tomou um rumo gigante, e por uma longa data eu acabei deixando o site de lado.

Embora isso, para os fins de aprendizado que era ideia principal, foi ótimo. Esse foi um dos meus projetos mais ambiciosos, e para enfrentar tantas dificuldades no projeto teve sim momentos de desanimo, porém depois de um determinado tempo consegui chegar em um resultado que me agradou, e todo esse processo de criação me ensinou muitas coisas.

![coelho-store-fotos](https://github.com/GustavoCoelho1/coelho-store/assets/92497249/4e4902a0-552a-43cb-b3a6-3c60d0ff542c)


<!--Here's a blank template to get started: To avoid retyping too much info. Do a search and replace with your text editor for the following: `github_username`, `repo_name`, `twitter_handle`, `linkedin_username`, `email_client`, `email`, `project_title`, `project_description`-->

<p align="right">(<a href="#readme-top">Voltar ao topo</a>)</p>




### Tecnologias utilizadas
Como a ideia do projeto era ter muitas funcionalidades, para fins de estudo, acabou que utilizei múltiplas tecnologias que ajudaram a facilitar o processo das muitas funcionalidades. 

#### Front-end
O projeto tem como base o framework Next.js com Typescript, e para estilização utiliza Tailwind CSS e Framer Motion para animações mais complexas.
* ![Next.js](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
* ![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
* ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
* ![Framer Motion](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue)

#### Back-end
Na parte do back-end o projeto é desenvolvido em GraphQL com Apollo Server, para gestão da API. Utiliza também Prisma ORM para o mapeamento do banco de dados Postgres.
* ![GraphQL Modules](https://img.shields.io/badge/GraphQl-E10098?style=for-the-badge&logo=graphql&logoColor=white)
* ![Apollo Server](https://img.shields.io/badge/Apollo%20GraphQL-311C87?&style=for-the-badge&logo=Apollo%20GraphQL&logoColor=white)
* ![Prisma ORM](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
* ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

#### Outras funcionalidades
Para o checkout dos produtos é utilizado a API de checkout do Stripe e para o armazenamento de imagens dos produtos é utilizado o Firebase Storage.
* ![Stripe Checkout](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)
* ![Firebase Storage](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)


<p align="right">(<a href="#readme-top">Voltar ao topo</a>)</p>

## Para começar

Para configurar e rodar o projeto localmente vamos precisar seguir alguns passos.

### Pré-requisitos
* Node.js  
O angular é construído usando o Node.js e npm (Node Package Manager). Certifique-se de ter o Node.js instalado, pois o npm é incluído com ele. Clique <a href="https://nodejs.org/en">aqui</a> para instalar.

* npm  
Após instalado o node, abra o terminal do seu computador e rode o seguinte comando para instalar a última versão do npm
  ```sh
  npm install npm@latest -g
  ```

* PostgreSQL  
O banco de dados do aplicativo é o Postgres. Certifique-se de ter uma instância do banco de dados rodando antes da instalação do projeto. Clique <a href="https://nodejs.org/en">aqui</a> instalar o PostgreSQL.

* Projeto Stripe  
Para fazer o Checkout dos produtos é necessário ter um projeto criado no Stripe. Clique <a href="https://nodejs.org/en">aqui</a> para criar uma conta e criar um projeto.

* Projeto Firebase  
Para o armazenamento de imagem dos produtos é necessário ter um projeto criado no Firebase. Clique <a href="https://stripe.com/br">aqui</a> para criar uma conta e criar um projeto.

### Instalação

1. Clone o repositório
   ```sh
   git clone https://github.com/GustavoCoelho1/coelho-store/
   ```
   
2. Instale os pacotes npm
   ```sh
   npm install
   ```
   
3. Gere um arquivo `.env` e defina-o conforme as instruções do arquivo `.env.example`

4. Inicialize o Prisma Client, para que possamos configurar o banco de dados
   ```sh
   npx prisma generate
   ```
   
5. Após se certificar que há uma instância do banco de dados rodando, abra o terminal do projeto e execute o comando do Prisma para gerar o banco de dados automaticamente
   ```sh
   npx prisma db push
   ```

Após seguir esses passos você já está pronto para executar o projeto localmente 😉.

<p align="right">(<a href="#readme-top">Voltar ao topo</a>)</p>



## Entendendo a estrutura

Atualmente o projeto conta com 4 entidades, onde 3 delas herdam chave estrangeira do Cliente, pois é ele que cria cada uma delas.
#### Usuário  
Armazena informações que ficam mais expostas menos sensíveis de um cliente, e com isso serve para interagir com outras entidades dentro de projeto de maneira mais segura.
* ID (user_cod)
* Nome (user_nome)
* Email (user_email)
* Senha (user_senha)

Exemplo de um dado de usuário:
```json
  {
    "user_nome": "Gustavo",
    "user_email": "gustavo@exemplo",
    "user_senha": "exemplo123"
  }
```

#### Cliente  
Armazena informações pessoais privadas de um cliente. Possui os campos de:
* ID (cli_cod)
* Nome (cli_nome)
* Idade (cli_idade)
* Celular (cli_celular)
* Código de usuário (user_cod_fk) (Chave estrangeira)

Exemplo de um dado de cliente:
```json
  {
    "cli_nome": "Gustavo",
    "cli_idade": 19,
    "cli_celular": "(11)90000-0000",
    "user_cod_fk": "000-000-000-000"
  }
```

#### Endereço  
Armazena informações de endereço de um cliente. Possui os campos
* ID (end_cod)
* CEP (end_cep)
* Bairro (end_bairro)
* Rua (end_rua)
* Número da casa (end_ruanum)
* Cidade (end_cidade)
* Estado (end_estado)

Exemplo de um dado de endereço:
```json
  {
    "end_cep": "07010-000",
    "end_bairro": "Bairro dos exemplos",
    "end_rua": "Rua dos exemplos",
    "end_ruanum": 1,
    "end_cidade": "Guarulhos",
    "end_estado": "SP",
  }
```

#### Cliente/Endereço (Tabela relacional)
Relaciona um código de endereço com um código de cliente (Relação muitos para muitos). Possui os campos de:
* ID (cliend_cod)
* Código do endereço (end_cod_fk) (Chave estrangeira)
* Código do cliente (cli_cod_fk) (Chave estrangeira)

Exemplo de um dado dessa tabela:
```json
  {
    "cli_cod_fk": "000-000-000-000",
    "end_cod_fk": "000-000-000-000"
  }
```

#### Categoria
Armazena informações de categoria de um Produto. Possui os campos de:
* ID (cat_cod)
* Nome (cat_nome)

Exemplo de um dado de uma categoria:
```json
  {
    "cat_nome": "Bolsas e mochilas"
  }
```

#### Marca
Armazena informações da Marca de uma Produto. Possui os campos de:
* ID (marca_cod)
* Nome (marca_nome)

Exemplo de um dado de uma categoria:
```json
  {
    "marca_nome": "Gucci"
  }
```

#### Produto
Armazena informações de um Produto do site. Possui os campos de:
* ID (prod_cod)
* Nome (prod_nome)
* Descrição (prod_descricao)
* Código de barras (prod_codbarra)
* Preço (prod_preco)
* Quantidade em estoque (prod_estoque)
* Data de criação (prod_dtcriacao)
* Código de categoria (cat_cod_fk) (Chave estrangeira)
* Código de marca (marca_cod_fk) (Chave estrangeira)

Exemplo de um dado de um produto:
```json
  {
    "prod_nome": "Camisa Gucci Listrada Verde",
    "prod_descricao": "Muito conforto e elegância",
    "prod_codbarra": 898088908,
    "prod_preco": 199,
    "prod_estoque": 10,
    "prod_dtcriacao": "1707446945326", //Gerado automaticamente
    "cat_cod_fk": "000-000-000-000",
    "marca_cod_fk": "000-000-000-000",
  }
```

#### Avaliação do produto
Armazena informações de feedback sobre um Produto do site. Possui os campos de:
* ID (avaliacao_cod)
* Quantidade de estrelas (avaliacao_estrelas)
* Comentário (avaliacao_comentario)
* Data de publicação (avaliacao_data)
* Código de usuário (user_cod_fk) (Chave estrangeira)
* Código de produto (prod_cod_fk) (Chave estrangeira)

Exemplo de um dado de uma avaliação:
```json
  {
    "avaliacao_estrelas": 5,
    "avaliacao_comentario": "Comprei para o minha filha e ela amou!",
    "avaliacao_data": "1707446945326", //Gerado automaticamente
    "user_cod_fk": "000-000-000-000",
    "prod_cod_fk": "000-000-000-000"
  }
```

#### Produtos favoritados
Armazena informações dos produtos que foram marcados como "favorito" por um usuário. Possui os campos de:
* ID (fav_cod)
* Ativo (fav_active)
* Código de usuário (user_cod_fk) (Chave estrangeira)
* Código de produto (prod_cod_fk) (Chave estrangeira)

Exemplo de um dado dessa entidade:
```json
  {
    "fav_active": true,
    "user_cod_fk": "000-000-000-000",
    "prod_cod_fk": "000-000-000-000"
  }
```

#### Imagens do produto
Armazena informações de todas as fotos que um Produto pode possuir. Possui os campos de:
* ID (img_cod)
* Link da imagem (img_link)
* Ordem que a imagem deve assumir (Primeira, segunda, terceira, ...) (img_ordem)
* Posicionamento em que imagem deve ser exibida (Meio, esquerda, direita) (img_position)
* Código de produto (prod_cod_fk) (Chave estrangeira) 

Exemplo de um dado dessa entidade:
```json
  {
    "img_link": "https://linkdaimagem.com/img",
    "img_ordem": 1,
    "img_position": "center",
    "prod_cod_fk": "000-000-000-000"
  }
```

#### Pedido
Armazena informações de Pedido de um Cliente. Possui os campos de:
* ID (ped_cod)
* Status (Em aberto, concluído ou erro) (ped_status)
* Data (ped_data)
* Valor total (ped_valortotal)
* Código de cliente (cli_cod_fk) (Chave estrangeira) 

Exemplo de um dado dessa entidade:
```json
  {
    "ped_status": "OK",
    "ped_data": "1707446945326", //Gerado automaticamente
    "ped_valortotal": 700,
    "cli_cod_fk": "000-000-000-000"
  }
```

#### Item do pedido
Armazena informações de um item/linha contido em um Pedido. Possui os campos de:
* ID (item_cod)
* Quantidade deste item (item_quantidade)
* Descrição (item_descricao)
* Valor unitário (item_vlrunitario)
* Valor total (item_vlrtotal)
* Código de produto (prod_cod_fk) (Chave estrangeira) 
* Código do Pedido (ped_cod_fk) (Chave estrangeira) 

Exemplo de um dado dessa entidade:
```json
  {
    "item_quantidade": 2,
    "item_descricao": "Camisa Gucci Listrada Verde",
    "item_vlrunitario": 199,
    "item_vlrtotal": 398,
    "prod_cod_fk": "000-000-000-000",
    "ped_cod_fk": "000-000-000-000"
  }
```

<p align="right">(<a href="#readme-top">Voltar ao topo</a>)</p>

<!--
## Como utilizar?
<a name="como-utilizar"></a>
1. Fazer o cadastro  
Basta clicar em "Ir para dashboard" na página inicial e depois clicar em "Cadastre-se" na página de login, ou acessar a rota `/signup`
<img src="https://github.com/GustavoCoelho1/ibm-wallet/assets/92497249/e1e51563-28a8-45f9-a9d7-f088f364993b" alt="Logo" width="400">

3. Fazer o login  
Basta clicar em "Ir para dashboard" na página inicial, ou acessar a rota `/login` (O acesso durará 1 hora, após isso será solicitado um novo login)
<img src="https://github.com/GustavoCoelho1/ibm-wallet/assets/92497249/9f5eaa3e-e30d-43cb-8349-daff17254c0f" alt="Logo" width="400">

4. Criando novo produto  
Após fazer login, você será redirecinado para a rota `/dashboard`, que é a página padrão para a entidade de Transação. Nela clicando no botão "+ Nova transação", você pode inserir um novo registro.
<img src="https://github.com/GustavoCoelho1/ibm-wallet/assets/92497249/fb068e51-b72b-47e8-b33f-d2d3ddd59eaf" alt="Logo" width="500">

Exemplo:
```txt
2022-02-01,-18.00,Alimentação,iFood;
2022-02-02,-18.00,Alimentação,iFood;
2022-02-01,-18.00,Alimentação,iFood;
2022-02-02,-18.00,Transporte,Uber;
```
<img src="https://github.com/GustavoCoelho1/ibm-wallet/assets/92497249/b3b164fd-63fd-4653-a9ab-a09cb150f924" alt="Logo" width="500">

<p align="right">(<a href="#readme-top">Voltar ao topo</a>)</p>
-->

## Licença MIT
A permissão é concedida, gratuitamente, a qualquer pessoa que obtenha uma cópia deste arquivo, sem restrição nos direitos de usar, copiar, modificar e mesclar.
Distribuído sob a lincença MIT. Veja `LICENSE.txt` para mais informações.

<p align="right">(<a href="#readme-top">Voltar ao topo</a>)</p>



## Contato

Gustavo Coelho
* Linkedin: <a href="https://www.linkedin.com/in/gustavo-coelho1/">linkedin.com/in/gustavo-coelho1/</a>
* E-mail: <a href="mailto:gustavocoelho1412@gmail.com">gustavocoelho1412@gmail.com</a>
* Repositório: <a href="https://gustavo-coelho-portfolio.vercel.app/">Gustavo Coelho - Repositório</a>

🔗 Link do projeto: [github.com/GustavoCoelho1/ibm-wallet](https://github.com/GustavoCoelho1/ibm-wallet)

<p align="right">(<a href="#readme-top">Voltar ao topo</a>)</p>
