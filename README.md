# Shortener (forked from [bemobi/hire.me](https://github.com/bemobi/hire.me))

Um pequeno projeto para testar minhas habilidades.

## Pré-requisitos

Ter instalado localmente (apenas p/ Desenvolvimento e Teste):
- NodeJs
- MongoDb

## Instalando dependências

```bash
$ npm install
```

## Arquivo de configuração

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

## Banco de dados

**MongoDb**: Foi adotado uma base não relacional por esperar um grande volume de consultas.

_Obs:_ As tabelas serão geradas automaticamente pela aplicação.

## Modo p/ desenvolver

```bash
$ sh scripts/dsv-server.sh
```

## Modo p/ testar

```bash
$ sh scripts/dsv-server.sh
```

## Acessar produção

**Heroku + Mlab**: Ambos foram escolhidos pela facilidade de uso e seu pacote de dados gratuito.

_[https://gentle-crag-99464.herokuapp.com/](https://gentle-crag-99464.herokuapp.com/)_

## Algoritmo p/ criação de novo ALIAS automático 

Foi criado um algoritmo de conversão de `base 10` para `base 54`, onde eu sempre espero um `inteiro` e retorno uma `string` convertida, para garantir que o número será sempre único, a base possui uma tabela sequencial que toda vez que há a necessidade de criar um ALIAS não customizado, incrementamos a última sequência e com base nesse número é gerada a `string` que será o novo ALIAS.

## Diagrama de sequência

`_TODO: Falta fazer e anexar a imagem._`
