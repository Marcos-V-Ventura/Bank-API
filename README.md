# 🏦 Cubos Bank API

Cubos Bank - é uma API REST de sistema bancário.
Ela fornece uma solução para a gestão de contas bancárias e transações financeiras. Permitindo que os usuários realizem várias operações bancárias, como criar contas, consultar saldos, fazer depósitos, sacar dinheiro, transferências e visualizar extratos.

Projeto desenvolvido como desafio de código no módulo 2 da **[Turma 07]** de [ [Desenvolvimento de Software](https://cubos.academy/cursos/desenvolvimento-de-software-v2) | [On Demand](https://cubos.academy/cubosondemand) ] oferecida pela [Cubos Academy](https://cubos.academy/).

---

## ⚙️ Como executar o projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

#### 🎲 Rodando o Backend

```bash
# Clone este repositório
$ git clone git@github.com:Marcos-V-Ventura/Cubos-Bank-API.git

# Acesse a pasta do projeto no terminal/cmd
$ cd Cubos-Bank-Api

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:3000 - acesse http://localhost:3000 
```

## 🛣️ Endpoints

### Listar contas bancárias

#### `GET` `/contas?senha_banco=Cubos123Bank`

Esse endpoint deverá listar todas as contas bancárias existentes.

-   **Requisição** - query params (respeitando este nome)

    -   senha_banco


### Criar conta bancária

#### `POST` `/contas`

Esse endpoint deverá criar uma conta bancária, onde será gerado um número único para identificação da conta (número da conta).

-   **Requisição** - O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   nome
    -   cpf
    -   data_nascimento
    -   telefone
    -   email
    -   senha

#### Exemplo de Requisição

```javascript
// POST /contas
{
    "nome": "Marcos Vinicius 1",
    "cpf": "00011111234",
    "data_nascimento": "2003-11-03",
    "telefone": "71999998888",
    "email": "marcos1@gmail.com",
    "senha": "1234"
}
```


### Atualizar usuário da conta bancária

#### `PUT` `/contas/:numeroConta/usuario`

Esse endpoint deverá atualizar apenas os dados do usuário de uma conta bancária.

-   **Requisição** - O corpo (body) deverá possuir um objeto com todas as seguintes propriedades (respeitando estes nomes):

    -   nome
    -   cpf
    -   data_nascimento
    -   telefone
    -   email
    -   senha

#### Exemplo de Requisição
```javascript
// PUT /contas/:numeroConta/usuario
{
    "nome": "Marcos Vinicius 3",
    "cpf": "99911122234",
    "data_nascimento": "2000-11-03",
    "telefone": "71999998888",
    "email": "marcos3@gmail.com",
    "senha": "1234"
{
```


### Excluir Conta

#### `DELETE` `/contas/:numeroConta`

Esse endpoint deve excluir uma conta bancária existente.

-   **Requisição**

    -   Numero da conta bancária (passado como parâmetro na rota)


 ### Depositar

#### `POST` `/transacoes/depositar`

Esse endpoint deverá somar o valor do depósito ao saldo de uma conta válida e registrar essa transação.

-   **Requisição** - O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   numero_conta
    -   valor

#### Exemplo de Requisição
```javascript
// POST /transacoes/depositar
{
	"numero_conta": "1",
	"valor": 1900
}
```


### Sacar

#### `POST` `/transacoes/sacar`

Esse endpoint deverá realizar o saque de um valor em uma determinada conta bancária e registrar essa transação.

-   **Requisição** - O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   numero_conta
    -   valor
    -   senha

#### Exemplo de Requisição
```javascript
// POST /transacoes/sacar
{
  "numero_conta": "1",
  "valor": 1900,
  "senha": "1234"
}
```


### Tranferir

#### `POST` `/transacoes/transferir`

Esse endpoint deverá permitir a transferência de recursos (dinheiro) de uma conta bancária para outra e registrar essa transação.

-   **Requisição** - O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   numero_conta_origem
    -   numero_conta_destino
    -   valor
    -   senha

#### Exemplo de Requisição
```javascript
// POST /transacoes/transferir
{
	"numero_conta_origem": "1",
	"numero_conta_destino": "2",
	"valor": 200,
	"senha": "1234"
}
```


### Saldo

#### `GET` `/contas/saldo?numero_conta=123&senha=123`

Esse endpoint deverá retornar o saldo de uma conta bancária.

-   **Requisição** - query params

    -   numero_conta
    -   senha


### Extrato

#### `GET` `/contas/extrato?numero_conta=123&senha=123`

Esse endpoint deverá listar as transações realizadas de uma conta específica.

-   **Requisição** - query params

    -   numero_conta
    -   senha


---

## 💪 Como contribuir para o projeto
1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`
4. Envie as suas alterações: `git push origin my-feature`

📱 [Entre em contato!](https://www.linkedin.com/in/marcos-v-ventura/)

###### tags: `back-end` `nodeJS` `API REST` `desafio`
