# React-Firebase
O aplicativo é composto por uma integração com o Firebase e possui poucas telas.

Na primeira tela, chamada "Login", é utilizada a integração com o Firebase Authentication, permitindo o login com o email do Google e senha. Além disso, é possível recuperar a senha através do envio de um email para o usuário com as instruções de alteração.

Na segunda tela, chamada "Menu", são exibidos os seguintes itens:

-Firebase:

Adicionar dado: Permite adicionar um dado inserido no banco de dados do Firebase, podendo ser qualquer valor, inclusive símbolos. O valor será armazenado na forma de string.

Procurar dados no Firebase: Consiste em uma busca no banco de dados, onde os valores estão sendo adicionados. O retorno dos valores é exibido em uma tabela, mostrando os valores dos campos "ID" e "Value". Os valores repetidos são exibidos apenas uma vez, com o destaque no campo "ID".

-Adicionar novo login: 

Permite cadastrar um email para que possa ser utilizado na tela "Login", permitindo a criação de novos usuários.

-Desafio: 

Recebe como entrada um número inteiro e retorna uma string de acordo com o número digitado.

## Pré-requisito

[Node.js v16.14.2](https://nodejs.org/en/blog/release/v16.16.0)

[Firebase firebase@9.21.0](https://firebase.google.com/docs/cli)

[React v18.2.0](https://react.dev/learn/start-a-new-react-project)

## Após clonar o projeto :

    git clone https://github.com/jacsonpbvip/my-app.git

-Na pasta do my-App Core aberta no terminal powershell digite o comando para instalar:

    npm install firebase@9.21.0
    npm install react@16.14.2

## Start
-Na pasta do diretorio aberta pelo terminal digite:

    npm start

Acesse a aplicação em:

[http://localhost:3000/](http://localhost:3000/).