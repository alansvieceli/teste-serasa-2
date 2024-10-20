# Descrição do Projeto

Este projeto foi desenvolvido como parte de um teste para a vaga de desenvolvedor back-end. Embora o foco fosse o desenvolvimento do back-end, implementei também um front-end para facilitar a visualização dos gráficos gerados pela aplicação.

### Tecnologias Utilizadas

- Back-end: NestJS
- Front-end: React
- Banco de Dados: PostgreSQL
- Containerização: Docker e Docker Compose

### Como Executar a Aplicação

Para executar a aplicação, siga os passos abaixo:

1. Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.
2. No diretório raiz do projeto, execute o seguinte comando:

```bash
  docker-compose up --build
```

Esse comando irá construir e iniciar os seguintes serviços:

1. PostgreSQL: Banco de dados relacional
2. Back-end: API REST desenvolvida com NestJS
3. Front-end: Aplicação React para visualização dos dados

### Acessando a Aplicação

#### Swagger (Documentação da API)

A documentação da API pode ser acessada via Swagger na URL abaixo:

```http
http://localhost:3002/swagger
```

#### Front-end

A aplicação front-end pode ser acessada no navegador através do seguinte endereço:

```http
http://localhost:3000
```

#### Endpoints do backend

Autenticação (Obter Token)

```bash
curl --location 'http://localhost:3002/api/v1/auth/login' \
--header 'Content-Type: application/json' \
--data '{
    "apiKey": "nWLrhNbNlUrpC7UZy5H5atSq"
}'
```

Para inserir um novo registro, utilize o endpoint abaixo. Certifique-se de substituir o valor de Authorization pelo seu token:

```bash
curl --location  --request POST 'localhost:3002/api/v1/farmer' \
--header 'Content-Type: application/json' \
--header 'Authorization: ••••••' \
--data '{
    "documentType": "CPF",
    "document": "04254363060",
    "farmerName": "ALAN SILVA VIECELI",
    "farmName": "ALAN SILVA VIECELI",
    "city": "Porto Alegre",
    "stateCode": "RS",
    "totalArea": 34,
    "arableArea": 12,
    "vegetationArea": 2,
    "cropsPlanted": [

            "MILHO",
            "CANA_ACUCAR"

        ]
}'
```

Para buscar todos os registros. Certifique-se de substituir o valor de Authorization pelo seu token:

```bash
curl --location --request GET 'http://curl --location 'http://localhost:3002/api/v1/farmer' \
--header 'Authorization: ••••••'
```

Para buscar um registro especifico. Certifique-se de substituir o valor de Authorization pelo seu token:

```bash
curl --location --request GET 'http://localhost:3002/api/v1/farmer/6acce615-8a5d-4f66-87c2-ef5353884c32' \
--header 'Authorization: ••••••'

```

Para excluir um registro especifico. Certifique-se de substituir o valor de Authorization pelo seu token:

```bash
curl --location --request DELETE 'http://localhost:3002/api/v1/farmer/6acce615-8a5d-4f66-87c2-ef5353884c32' \
--header 'Authorization: ••••••'
```

Para editar um registro especifico. Certifique-se de substituir o valor de Authorization pelo seu token:

```bash
curl --location --request PUT 'http://localhost:3002/api/v1/farmer/66226226-b69f-4e6b-b012-8ade2e48298a' \
--header 'Content-Type: application/json' \
--header 'Authorization: ••••••' \
--data '{
    "documentType": "CPF",
    "document": "98930710034",
    "farmerName": "ALAN SILVA VIECELI XXX",
    "farmName": "ALAN SILVA VIECELI",
    "city": "Porto Alegre",
    "stateCode": "RS",
    "totalArea": 34,
    "arableArea": 12,
    "vegetationArea": 2.3,
    "cropsPlanted": [
        "SOJA",
        "ALGODAO"


    ]
}'
```

---

# Teste - Brain Agriculture

O teste tem como objetivo acurar as habilidades do candidato em resolver alguns problemas relacionados à lógica de programação, regra de negócio e orientação à objetos.

O mesmo consiste em um cadastro de produtor rural com os seguintes dados:

1.  CPF ou CNPJ
2.  Nome do produtor
3.  Nome da Fazenda
4.  Cidade
5.  Estado
6.  Área total em hectares da fazenda
7.  Área agricultável em hectares
8.  Área de vegetação em hectares
9.  Culturas plantadas (Soja, Milho, Algodão, Café, Cana de Açucar)

# Requisitos de negócio

- O usuário deverá ter a possibilidade de cadastrar, editar, e excluir produtores rurais.
- O sistema deverá validar CPF e CNPJ digitados incorretamente.
- A soma de área agrícultável e vegetação, não deverá ser maior que a área total da fazenda
- Cada produtor pode plantar mais de uma cultura em sua Fazenda.
- A plataforma deverá ter um Dashboard que exiba:
  - Total de fazendas em quantidade
  - Total de fazendas em hectares (área total)
  - Gráfico de pizza por estado.
  - Gráfico de pizza por cultura.
  - Gráfico de pizza por uso de solo (Área agricultável e vegetação)

# Requisitos técnicos

- O desenvolvedor front-end deverá utilizar:

  - [ReactJS](http://reactjs.org);
  - [Redux](https://redux.js.org/) para controlar o estado da aplicação.
    - Caso entenda que faça sentido, utilize [Context API](https://reactjs.org/docs/context.html) como recurso adicional ou substituto ao Redux (Opcional)
  - Crie pelo menos um teste unitário por componente (Opcional)
  - A criação das estruturas de dados "mockados" faz parte da avaliação.

- O desenvolvedor back-end deve:

  - Salvar os dados em um banco de dados Postgres usando o NodeJS como layer de Backend, e entregar os endpoints para cadastrar, editar, e excluir produtores rurais, além do endpoint que retorne os totais para o dashboard.
  - A criação das estruturas de dados "mockados" faz parte da avaliação.

  Desejável:

  - TypeScript
  - Conceitos como SOLID, KISS, Clean Code, API Contracts, Tests, Layered Architecture

  Bonus:

  - Aplicação disponibilizada em algum cloud provider de sua preferência

- O desenvolvedor full-stack deve realizar ambos, e concluir a integração.
  > Não envie a solução como anexo, suba os fontes para seu Github (ou outro repositório) e envie o link para o avaliador.
