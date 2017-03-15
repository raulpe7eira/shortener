# Shortener (forked from [bemobi/hire.me](https://github.com/bemobi/hire.me))

Um pequeno projeto para testar minhas habilidades.

## Instalação

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

## Subir & Rodar

### Ambiente de desenvolvemento

```bash
$ sh scripts/dsv-server.sh
```

### Ambiente de teste

```bash
$ sh scripts/tst-server.sh
```

### Ambiente de produção

Basta acessar: *[https://gentle-crag-99464.herokuapp.com/](https://gentle-crag-99464.herokuapp.com/)*

## Fluxos

### Criação de Alias

Foi criado um algoritmo de conversão de `base 10` para `base 54`, onde eu sempre espero um `inteiro` e retorno uma `string` convertida, para garantir que o `número` será sempre único, a base possui uma tabela sequencial que toda vez que há a necessidade de criar um `Alias` não customizado, incrementamos a última sequência e com base nesse `número` é gerada a `string` que será o novo `Alias`.

### Diagrama de sequência

`_TODO: Falta fazer e anexar a imagem._`

## Considerações

### Plataforma

**[Node.js](https://nodejs.org/)**: Foi uma escolha pessoal, resolvi encarar o desafio com uma plataforma que não tenho experiência profissional, fora que facilitaria ter tanto no backend quanto no frontend, o uso da mesma linguagem em todas as camadas da aplicação.

### Backend

#### Web Server

**[Express.js](https://expressjs.com/)**: Foi escolhido pela popularidade e pela vasta gama de material na web, facilitando a meta de cumprir com o prazo de entrega.

#### Banco de dados

**[MongoDB](https://mongodb.com/)**: Além de ser um banco de dados não relacional que dará conta do recado caso o volume de consultas seja grande, este também seria outra camada no desenvolvimento que utilizaria a mesma linguagem para desenvolvimento.

### Frontend

**[HTML](https://w3.org/html/)** + **[CSS](https://w3.org/Style/CSS/)** + **[Bootstrap](http://getbootstrap.com/)** + **[JS](?)** + **[jQuery](https://jquery.com/)**: Não utilizei nenhum framework para implementar essa camada da solução pois o foco era maior na parte do backend, o deseja era apenas apresentar uma interface simples que consegui-se executar todos os endpoints.

### Testes

**[Mocha](https://mochajs.org/)** + **[SuperTest](https://github.com/visionmedia/supertest)**: Essa dupla foi utilizada para testar todos os endpoints do backend. Porém ficou faltando realizar os teste para o frontend, além de um teste E2E, necessários para orquestrar todo processo de implantação em ambiente de produção.

### Servidores de produção

**[Heroku](https://heroku.com)** (PAAS) + **[mLab](https://mlab.com)** (BAAS): Ambos foram escolhidos pela facilidade de uso e seus pacotes gratuitos. Além de serem facilmente integrados com o [GitHub](https://github.com/), que é responsável pelo versionamento do cdigo.

## Conclusão

Aprendi bastante em 3 dias de desenvolvimento, ainda existem várias melhorias que podem ser realizadas e possivelmente vários refatorações a serem feitos, AVANTE MOCADA! :muscle:
