
# DOCUMENTAÇÃO NÃO TÉCNICA

o sistema que desenvolvI é uma ferramenta de controle financeiro para comerciantes. Ele permite que o usuário registre os lançamentos financeiros (como débitos e créditos) do seu caixa diário, gerando um relatório consolidado que mostra o saldo disponível.

Ao utilizar o sistema, o usuário ganha maior agilidade e praticidade no controle das suas finanças, podendo visualizar todas as informações em um único lugar e de forma organizada. O sistema é desenvolvido em Node.js, uma tecnologia muito utilizada no mercado, o que garante maior confiabilidade e qualidade.

O projeto foi estruturado de forma a atender tanto às necessidades de negócio quanto às técnicas, seguindo uma arquitetura moderna e organizada para garantir a eficiência e previsibilidade dos recursos financeiros de qualquer comércio.

Em termos de uso, a aplicação é bastante intuitiva e fácil de usar, com uma interface do usuário clara e amigável. Além disso, foram realizados testes unitários em todas as funcionalidades do sistema, garantindo sua qualidade e robustez.

Para subir a aplicação localmente, basta seguir algumas etapas simples de instalação e executá-la no seu computador. Além disso, a aplicação também pode ser executada em containers Docker, o que permite uma instalação ainda mais simples e ágil para o usuário.

No geral, o sistema é uma ferramenta fundamental para qualquer comerciante que busca uma melhor organização financeira e um controle mais eficiente do seu caixa diário. Com ele, é possível ter uma visão mais clara e detalhada dos seus gastos e receitas, e tomar decisões mais informadas e assertivas.

Para registrar os lançamentos financeiros no sistema, o comerciante deverá acessar as rotas POSTS específicas de débito ou crédito, que estão disponíveis nos endereços "release/debit" e "release/credit", respectivamente.

Apesar de serem rotas diferentes, essas duas opções compartilham os mesmos campos de entrada no body da requisição: "referenceName", que é um nome descritivo para o lançamento; e "amount", que é o valor do lançamento financeiro.

Dessa forma, o comerciante poderá registrar todos os lançamentos de crédito e débito em tempo real, mantendo um controle financeiro muito mais organizado e eficiente. E como todas essas informações ficam disponíveis em um único lugar, o usuário ganha mais praticidade e agilidade na gestão do seu negócio.

Para acessar o saldo consolidado do dia e a lista de lançamentos financeiros, o comerciante terá que fazer uma requisição GET para a rota "release/consolidate", passando como parâmetro de query o dia desejado no formato "yyyy-mm-dd".

Ao fazer essa solicitação, o sistema retornará ao usuário o saldo consolidado do dia, juntamente com a lista de lançamentos financeiros registrados. É importante notar que, diferentemente das rotas de lançamento de débito e crédito, a requisição para consulta do saldo consolidado é do tipo GET.

Com essa funcionalidade, o comerciante poderá ter uma visão geral do seu fluxo de caixa, acompanhando os lançamentos financeiros em tempo real e tendo um controle muito mais preciso de sua situação financeira. E, mais uma vez, o sistema oferece praticidade e agilidade na gestão das finanças empresariais.

# DOCUMENTAÇÃO TÉCNICA

## INTRODUÇÃO

A solução desenvolvida tem como objetivo permitir o controle do fluxo de caixa diário de um comerciante, por meio do registro de lançamentos (débitos e créditos), bem como a geração de relatórios consolidados diários com o saldo disponível. O projeto foi desenvolvido utilizando o Framework NodeJS, seguindo os princípios de SOLID, Design Patterns, Padrões de Arquitetura e Clean Code.

## ARQUITETURA

A arquitetura da solução é baseada em Clean Architecture, que permite separar as responsabilidades e camadas da aplicação, garantindo a manutenibilidade e a facilidade de teste. A solução possui as seguintes camadas:

### Camada de Infraestrutura

Responsável pela comunicação com o banco de dados e outros serviços externos.

### Repositórios

A camada de Infraestrutura possui repositórios que se comunicam com o banco de dados para realizar as operações de CRUD nas entidades.

### Banco de Dados

O banco de dados é responsável por armazenar as informações dos lançamentos de crédito e débito.

### Camada de Domínio

Responsável pelo controle dos negócios, aplicando as regras de negócio e validações.

### Entidades

A camada de Domínio possui duas entidades principais: CreditRelease e DebitRelease, que contêm as informações necessárias para um lançamento de crédito ou débito, respectivamente. Apesar de ambas as entidades compartilharem a mesma tabela no banco de dados, foram separadas para manter a estrutura da solução robusta.

### Casos de Uso

Os casos de uso definem os fluxos de negócio da aplicação, utilizando as entidades e repositórios definidos na camada de Domínio.

### Camada de Aplicação

Responsável por fornecer as interfaces para acesso aos serviços da aplicação.

### Controladores

Os controladores são responsáveis por receber as requisições HTTP do Express, chamar a camada de Aplicação e retornar a resposta HTTP adequada.

### Interactor

Os interactor são responsáveis por definir as interfaces de entrada e saída que são utilizadas pelos casos de uso.

### Schemas

Os Schemas são responsáveis por definir as estruturas dos dados que são enviados e recebidos pelos controladores.

### Camada de Interface do Usuário

Responsável por apresentar os dados ao usuário.

### Rotas

As rotas são definidas utilizando o Framework NodeJS Express e permitem a comunicação entre as requisições HTTP do cliente e a aplicação.

## TESTES

Foram realizados testes unitários para todas as funcionalidades do sistema, abrangendo os cenários possíveis e impossíveis, garantindo a robustez e qualidade da solução.

## INSTALAÇÃO E EXECUÇÃO

Para executar a aplicação, siga os seguintes passos:

- Faça o clone do repositório em sua máquina local;
    
    ```jsx
    git clone 
    ```
    
- Navegue até a pasta da aplicação por meio do terminal e execute o comando abaixo para instalar as dependências necessárias;
    
    ```jsx
    npm i
    ```
    
- Para subir as migrações do banco de dados em ambiente de desenvolvimento, utilizando o Knex com o banco de dados SQLite3, execute o seguinte comando na pasta raiz do projeto:
    
    ```
    npm run knex -- migrate:latest
    
    ```
    
- Execute o comando abaixo para subir a aplicação localmente.
    
    ```jsx
    npm run dev
    ```
    

# Build

- Faça o clone do repositório em sua máquina local;
- Navegue até a pasta da aplicação por meio do terminal e execute o comando abaixo para instalar as dependências necessárias;
    
    ```
    npm i
    
    ```
    
- Para subir as migrações do banco de dados em ambiente de desenvolvimento, utilizando o Knex com o banco de dados SQLite3, execute o seguinte comando na pasta raiz do projeto:
    
    ```
    npm run knex -- migrate:latest
    
    ```
    
- Execute o comando abaixo para TRADUZIR o código para  JAVASCRIPT produção:
    
    ```
    npm run build
    
    ```
    
- Execute o comando abaixo para iniciar a aplicação em ambiente de produção:
    
    ```
    npm run start
    
    ```
    

## CONCLUSÃO

A solução desenvolvida atende aos requisitos de negócio e técnicos exigidos, entregando um sistema de alta qualidade, fácil manutenção e escalabilidade. Com a utilização de conceitos como Clean Architecture, SOLID, Design Patterns e Padrões de Arquitetura, foi criada uma arquitetura de software completa e robusta. Com isso, é possível garantir a eficiência e a previsibilidade dos recursos financeiros de qualquer negócio.

## INSTRUÇÕES DE USO DE DOCKER

Para executar a aplicação via Docker, siga os seguintes passos:

1. Faça o clone do repositório em sua máquina local;
2. Navegue até a pasta raiz do projeto por meio do terminal;
3. Execute os comando "docker-compose build" e "docker-compose up" para construir as imagens dos serviços e subir os containers.
4. Acesse a aplicação em [http://localhost:3000](http://localhost:3000/)

## REFERÊNCIAS

- SOLID
- Design Patterns
- Clean Code
- Node.js
- Express
- Docker