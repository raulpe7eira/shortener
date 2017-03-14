# Shortener (forked from [bemobi/hire.me](https://github.com/bemobi/hire.me))

Um pequeno projeto para testar minhas habilidades.

## Instalções

### Pré-requisitos

Ter instalado localmente (apenas p/ Desenvolvimento e Teste):
- [Node.js](https://nodejs.org/)
- [MongoDB](https://mongodb.com/)

### Instalando dependências

```bash
$ npm install
```

### Configurando os ambientes

A aplicação possui um arquivo de configuração para cada ambiente (Teste, Desenvolvimento e Produção), nele nós temos as seguintes variáveis que podem ser redefinidas. Veja um exemplo padrão:

[// shortener/config/env/dsv.js](../master/config/env/dsv.js)
```javascript
module.exports = {

	env: 'dsv',
	db: 'mongodb://192.168.99.100:32771/shortener-dsv',
	port: 3000,
	debug: true

};
```

Variável | Descrição | Valores
--- | --- | ---
**env** | Define o ambiente | `'dsv'`, `'tst'` , `'prd'`
**db** | URL de conexão com a base de dados | `string`
**port** | Número da porta do servidor | `number`
**debug** | Habilita o modo Debug | `boolean`

Obs.: Vale ressaltar que em ambiente de Produção, muitas das variáveis são configuradas no próprio servidor escolhido e por motivos de segurança, não deve constar tais informações em arquivos públicos.

## Inicialização

### Modo p/ desenvolver

```bash
$ sh scripts/dsv-server.sh
```

### Modo p/ testar

```bash
$ sh scripts/dsv-server.sh
```

### Produção

Basta acessar: *[https://gentle-crag-99464.herokuapp.com/](https://gentle-crag-99464.herokuapp.com/)*

## Algoritmo p/ criação de novo ALIAS automático 

Foi criado um algoritmo de conversão de `base 10` para `base 54`, onde eu sempre espero um `inteiro` e retorno uma `string` convertida, para garantir que o número será sempre único, a base possui uma tabela sequencial que toda vez que há a necessidade de criar um ALIAS não customizado, incrementamos a última sequência e com base nesse número é gerada a `string` que será o novo ALIAS.

## Diagrama de sequência

`_TODO: Falta fazer e anexar a imagem._`

## Razão p/ cada escolha

### Plataforma

**[Node.js](https://nodejs.org/)**: Foi uma escolha pessoal, resolvi encarar o desafio com uma plataforma que não tenho experiência profissional, fora que facilitaria ter tanto no backend quanto no frontend, o uso da mesma única linguagem em todas as camadas da aplicação.

### Web Server

**[Express.js](https://expressjs.com/)**: Foi escolhido pela popularidade e pela vasta gama de material na web, facilitando a meta de cumprir com o prazo de entrega.

### Banco de dados

**[MongoDB](https://mongodb.com/)**: Além de ser um banco de dados não relacional que dará conta do recado caso o volume de consultas seja grande. Este também seria outra camada no desenvolvimento que utilizaria a mesma linguagem para desenvolvimento.

### Ambiente de produção

**[Heroku](https://heroku.com) + [mLab](https://mlab.com)**: Ambos foram escolhidos pela facilidade de uso e seus pacotes gratuitos.
