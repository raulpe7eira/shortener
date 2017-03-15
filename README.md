# Shortener (forked from [bemobi/hire.me](https://github.com/bemobi/hire.me))

Um pequeno projeto para testar minhas habilidades.

![frontend-scshot](../master/scshot/frontend-scshot.png)

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

A aplicação possui um arquivo de configuração para cada ambiente (Teste, Desenvolvimento e Produção), nele temos as seguintes variáveis que podem ser redefinidas. Veja um exemplo padrão:

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

_Obs.:_ Vale ressaltar que em ambiente de produção, muitas das variáveis são configuradas no próprio servidor escolhido e por motivos de segurança, não deve constar tais informações em arquivos públicos.

## Subir & Rodar

### Ambiente de desenvolvemento

```bash
$ sh scripts/dsv-server.sh
```
![dsv-scshot](../master/scshot/dsv-scshot.png)

### Ambiente de teste

```bash
$ sh scripts/tst-server.sh
```

![tst-scshot](../master/scshot/tst-scshot.png)

### Ambiente de produção

Basta acessar: *[https://gentle-crag-99464.herokuapp.com/](https://gentle-crag-99464.herokuapp.com/)*

## Fluxos

### Criação de Alias

Foi criado um algoritmo de conversão de `base 10` para `base 58`, onde eu sempre espero um `inteiro` e retorno uma `string` convertida, para garantir que o `número` será sempre único, a base possui uma tabela sequencial que toda vez que há a necessidade de criar um `Alias` não customizado, incrementamos a última sequência e com base nesse `número` é gerada a `string` que será o novo `Alias`.

### Diagrama de sequência

#### Backend endpoints

![POST W/O CUSTOM_ALIAS](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=dGl0bGUgUE9TVCBXL08gQ1VTVE9NX0FMSUFTCgpVc2VyLT5FeHByZXNzLmpzOiBwb3N0IC9zaG9ydGVuZXIvY3JlYXRlP3VybD1odHRwOi8vbG9uZy11cmwuaW8Kbm90ZSByaWdodCBvZiAAPgoKICAgICBpZiBVUkwgVE8gQkUgU0hPUlRFTgAVBWFuZAAVBVZBTElEAAkJAIEOEWVuZCBub3RlCgCBFwotPk1vbmdvREI6IGZpbmQAUAZVUkwgU0VRVUVOQ0UKABkHLQCBSQ5yZXNwb25zZSBJTkNSRU1FTlQAgR0fZ2VuZXJhdGUgQkFTRTU4IEVOQ09ERQCBUgZmcm9tAGcTAIERHgCCQwYAgSgJAIEIIFNVQ0NFU1MAgW8MLT5Vc2VyABgMVEFUVVMgMjAxAIJNBUpTT04gREFUQQo&s=qsd)

![POST W/ CUSTOM_ALIAS](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=dGl0bGUgUE9TVCBXLyBDVVNUT01fQUxJQVMKClVzZXItPkV4cHJlc3MuanM6IHBvc3QgL3Nob3J0ZW5lci9jcmVhdGU_dXJsPWh0dHA6Ly9sb25nLXVybC5pbyYAQgw9bGdpCm5vdGUgcmlnaHQgb2YgAE8KCiAgICAgaWYgVVJMIFRPIEJFIFNIT1JURU4AFQVhbmQAFQVWQUxJRAAJCQCBHxBlbmQgbm90ZQoAgScKLT5Nb25nb0RCOiBmaW5kIACBUgYADQctAIFNDnJlc3BvbnNlIE5PVCBGT1VORAAzFgCBbQYAgRoGVVJMAC4gU1VDQ0VTUwCBCQwtPlVzZXIAGAxUQVRVUyAyMDEAgWYFSlNPTiBEQVRBCg&s=qsd)

![POST W/ ERROR 001](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=dGl0bGUgUE9TVCBXLyBFUlJPUiAwMDEKClVzZXItPkV4cHJlc3MuanM6IHBvc3QgL3Nob3J0ZW5lci9jcmVhdGU_dXJsPWh0dHA6Ly9sb25nLXVybC5pbyZDVVNUT01fQUxJQVM9bGdpCm5vdGUgcmlnaHQgb2YgAE8KCiAgICAgaWYgVVJMIFRPIEJFIFNIT1JURU4AFQVhbmQAFQVWQUxJRAAJCVcvIABVDAplbmQgbm90ZQoAgScKLT5Nb25nb0RCOiBmaW5kIAAjBgANBy0AgU0OcmVzcG9uc2UgRk9VTkQAgQkiAIFXBgBNBiBBTFJFQURZIEVYSVNUAHUWLT5Vc2VyAF0LU1RBVFVTIDQwMACBXAVKU09OAIJyCw&s=qsd)

![POST W/ ERROR 003](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=dGl0bGUgUE9TVCBXLyBFUlJPUiAwMDMKClVzZXItPkV4cHJlc3MuanM6IHBvc3QgL3Nob3J0ZW5lci9jcmVhdGUKbm90ZSByaWdodCBvZiAAJwoKICAgICBpZiBOTyBVUkwgVE8gQkUgU0hPUlRFTgplbmQgbm90ZQoAWAotLT5Vc2VyOiByZXNwb25zZSBTVEFUVVMgNDAwIGFuZCBKU09OAIEYCw&s=qsd)

![POST W/ ERROR 004](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=dGl0bGUgUE9TVCBXLyBFUlJPUiAwMDQKClVzZXItPkV4cHJlc3MuanM6IHBvc3QgL3Nob3J0ZW5lci9jcmVhdGU_dXJsPWxvbmctdXJsLmlvCm5vdGUgcmlnaHQgb2YgADcKCiAgICAgaWYgVVJMIFRPIEJFIFNIT1JURU4AFQVhbmQAFQVOT1QgVkFMSUQKZW5kIG5vdGUKAHsKLS0-VXNlcjogcmVzcG9uc2UgU1RBVFVTIDQwMAA9BUpTT04AgTsL&s=qsd)

![GET W/0 ALIAS](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=dGl0bGUgR0VUIFcvTyBBTElBUwoKVXNlci0-RXhwcmVzcy5qczogZ2V0IC9zaG9ydGVuZXIvdS8KABQKLS0-VXNlcjogcmVzcG9uc2UgU1RBVFVTIDQwNCBhbmQgSFRNTAo&s=qsd)

![GET W/ ALIAS](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=dGl0bGUgR0VUIFcvIEFMSUFTCgpVc2VyLT5FeHByZXNzLmpzOiBnZXQgL3Nob3J0ZW5lci91L2xnaQpub3RlIHJpZ2h0IG9mIAAlCgogICAgIGlmAEgHZW5kIG5vdGUKAEcKLT5Nb25nb0RCOiBmaW5kAHEHAEIOABsHAEYHbmNyZW1lbnQgUkVUUklFVkVEAE4KAEUHLQCBJQ5yZXNwb25zZSBTSE9SVCBVUkwAdQwtPlVzZXIAGgxUQVRVUyAzMDIgYW5kIEhUTUwK&s=qsd)

![GET W/ ERROR 002](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=dGl0bGUgR0VUIFcvIEVSUk9SIDAwMgoKVXNlci0-RXhwcmVzcy5qczogZ2V0IC9zaG9ydGVuZXIvdS9sZ2lYCm5vdGUgcmlnaHQgb2YgACYKCiAgICAgaWYgQUxJQVMKZW5kIG5vdGUKAEgKLT5Nb25nb0RCOiBmaW5kACIHAA0HLQBuDnJlc3BvbnNlIE5PVCBGT1VORAA9DC0-VXNlcgAbC1NUQVRVUyA0MDAgYW5kAIFMCw&s=qsd)

![GET TOP TEN](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=dGl0bGUgR0VUIFRPUCBURU4KClVzZXItPkV4cHJlc3MuanM6IGdldCAvc2hvcnRlbmVyL3RvcFRlbgoAGAotPk1vbmdvREI6IGZpbmQAQwggUkVUUklFVkVECgAZBy0ASg5yZXNwb25zZQBzCQBICy0-VXNlcgAZC1NUQVRVUyAyMDAgYW5kIEpTT04gREFUQQo&s=qsd)

#### Frontend navigation

`Todo frontend precisa ser repensado` :disappointed_relieved:

## Considerações

### Plataforma

**[Node.js](https://nodejs.org/)**: Foi uma escolha pessoal, resolvi encarar o desafio com uma plataforma que não tenho experiência profissional, fora que facilitaria ter tanto no backend quanto no frontend, o uso da mesma linguagem em todas as camadas da aplicação.

### Backend

#### Web Server

**[Express.js](https://expressjs.com/)**: Foi escolhido pela popularidade e pela vasta gama de material na web, facilitando a meta de cumprir com o prazo de entrega.

#### Banco de dados

**[MongoDB](https://mongodb.com/)**: Além de ser um banco de dados não relacional que dará conta do recado caso o volume de consultas seja grande, este também seria outra camada no desenvolvimento que utilizaria a mesma linguagem para desenvolvimento.

### Frontend

**[HTML](https://w3.org/html/)** + **[CSS](https://w3.org/Style/CSS/)** + **[Bootstrap](http://getbootstrap.com/)** + **[JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript)** + **[jQuery](https://jquery.com/)**: Não utilizei nenhum framework para implementar essa camada da solução, apenas bibliotecas facilitadoras, pois o foco era maior na parte backend, o desejo era apenas apresentar uma interface simples que conseguisse executar todos os endpoints.

### Testes

**[Mocha](https://mochajs.org/)** + **[SuperTest](https://github.com/visionmedia/supertest)**: Essa dupla foi utilizada para testar todos os endpoints do backend. Porém ficou faltando realizar os teste para o frontend, além de um teste E2E, necessários para orquestrar todo processo de implantação em ambiente de produção.

### Servidores de produção

**[Heroku](https://heroku.com)** (PAAS) + **[mLab](https://mlab.com)** (DAAS): Ambos foram escolhidos pela facilidade de uso e seus pacotes gratuitos. Além de serem facilmente integrados com o [GitHub](https://github.com/), que é responsável pelo versionamento do código.

## Conclusão

Aprendi bastante em 3 dias de desenvolvimento, ainda existem várias melhorias que podem ser realizadas e possivelmente várias refatorações a serem feitas, a maior parte delas esta na parte cliente, talvez usando algum framework como [Angular](https://angular.io/) ou [React](https://facebook.github.io/react/), também configuraria algum serviço de integração continua como o [Travis.ci](https://travis-ci.org), para agilizar e tornar seguro o processo de deploy. Enfim, novas melhoras em outro fork, num futuro bem próximo... ;)

AVANTE MOÇADA! :muscle:
