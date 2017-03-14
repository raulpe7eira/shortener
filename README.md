# Shortener (fork for bemobi/hire.me)

Um pequeno projeto para testar minhas habilidades.

## Pré-requisitos

Ter instalado localmente (apenas p/ Desenvolvimento e Teste):
- NodeJs
- MongoDb

## Instalando dependências

```
$ npm install
```

## Arquivo de configuração

A aplicação possui um arquivo de configuração para cada ambiente (Teste, Desenvolvimento e Produção), nele nós temos as seguintes variáveis que podem ser redefinidas. Veja um exemplo padrão:

```
**[./config/env/*.js]**

env: _'dsv'_,
db: _'mongodb://localhost:2700/shortener-dsv'_,
port: _3000_,
debug: _true_
```

Obs.: Vale ressaltar que em ambiente de Produção, muitas das variáveis são configuradas no próprio servidor escolhido e por motivos de segurança, não deve constar tais informações em arquivos públicos.

## Banco de dados

```
**MongoDb** Foi adotado uma base não relacional pois é esperado um grande volume de leitura.

_Obs:_ As tabelas serão geradas automaticamente pela aplicação.
```

## Modo p/ desenvolver

```
$ sh scripts/dsv-server.sh
```

## Modo p/ testar

```
$ sh scripts/dsv-server.sh
```

## Acessar produção

```
Heroku + Mlab

**[https://gentle-crag-99464.herokuapp.com/](https://gentle-crag-99464.herokuapp.com/)**
```

## Algoritmo p/ criação de novo ALIAS automático 

Foi criado um algoritmo de conversão de base 10 para 54, onde eu sempre espero um inteiro e retorno uma string convertida, para garantir que o número será sempre único, a base possui uma tabela sequencial que toda vez que há a necessidade de criar um novo ALIAS eu pego um incremento da última sequência, com base nesse número é gerada a string que será o novo ALIAS.

## Diagrama de sequência

_TODO: Falta fazer e anexar a imagem._
