# Relações entre documentos e estutura de dados

Apesar de MongoDB ser uma base de dados não-relacional, é possível criar pontos de ligação entre documentos.
Esta ligação pode ser feita de duas maneiras, o que vai de encontro á flexibilidade presente nas bases de dado MongoDB.

<br>

## Tipos de relação

Existem 3 principais tipos de relação que podemos criar : one-to-one , one-to-many e many-to-many.
A escolha de qual usar depende do que queremos para a nossa base de dados e das propriedades desta como o tamanho, nº de coleções, aplicações que vão aceder...

<br>

## One-to-one

O tipo de relação one-to-one (um para um) é utilizado quando temos informação conectada e que tem apenas ligação entre si, por exempolo, o documento A está conectado com o documento B e vice versa, sem outras relações do mesmo tipo.

Existem dois tipos de conexão que podemos criar (que também são aplicáveis aos outros tipos de relação): `embedded` e `referencing`.

<br>

### Embedding

Quando falamos em documentos `embedded`, referimo-nos a documentos que existem dentro de outros, ou seja, estão inseridos/embedded.
Este tipo de esquema para um documento é bastante útil poque permite-nos guardar informação relacionada a um sub-documento sem precisar de criar uma coleção separada para isso.

![Exemplo de embedding](https://www.mongodb.com/docs/manual/images/data-model-denormalized.bakedsvg.svg)

Este tipo de relação passa muitas vezes despercebido por ser comum termos objectos dentro de objectos em JSON, mas a sua aplicação numa base de dados pode tornar o fluxo de informação mais rápido. Desta maneira, em vez de fazer duas pesquisas na base de dados conseguimos obter toda a informação num só documento.

É especialmente útil quando temos informação que não vai ser (muito) repetida e refere-se apenas a um documento, como por exemplo, uma morada ou contacto de um utilizador.

<br>

### Referencing

Por `referencing` entendemos criar um ponto de ligação entre dois documentos em coleções separadas, geralmente através de um id.

![Exemplo de referencing](https://www.mongodb.com/docs/manual/images/data-model-normalized.bakedsvg.svg)

Esta estratégia pode ser benéfica quando o volume de informação é relativamente grande ou não é necessário na maioria dos casos.

No seguinte exemplo temos um objecto numa coleção de filmes que tem toda a informação que pretendemos:

```json
{
  "_id": 1,
  "title": "The Arrival of a Train",
  "year": 1896,
  "runtime": 1,
  "released": ISODate("01-25-1896"),
  "poster": "http://ia.media-imdb.com/images/M/MV5BMjEyNDk5MDYzOV5BMl5BanBnXkFtZTgwNjIxMTEwMzE@._V1_SX300.jpg",
  "plot": "A group of people are standing in a straight line along the platform of a railway station, waiting for a train, which is seen coming at some distance. When the train stops at the platform, ...",
  "fullplot": "A group of people are standing in a straight line along the platform of a railway station, waiting for a train, which is seen coming at some distance. When the train stops at the platform, the line dissolves. The doors of the railway-cars open, and people on the platform help passengers to get off.",
  "lastupdated": ISODate("2015-08-15T10:06:53"),
  "type": "movie",
  "directors": [ "Auguste Lumière", "Louis Lumière" ],
  "imdb": {
    "rating": 7.3,
    "votes": 5043,
    "id": 12
  },
  "countries": [ "France" ],
  "genres": [ "Documentary", "Short" ],
  "tomatoes": {
    "viewer": {
      "rating": 3.7,
      "numReviews": 59
    },
    "lastUpdated": ISODate("2020-01-09T00:02:53")
  }
}
```

Apesar de poder ser benéfico ter toda a informação disponível num objecto, alguma desta informação pode ser pouco usada nas aplicações que acedem á nossa base de dados. Nesses casos, sempre que fazemos uma query estamos a retornar mais informação do que precisamos, o que pode impactar a performance e até mesmo gastos.

Podemos então dividir o objecto em dois e colocá-lo em coleções diferentes, tendo apenas um ponto de ligação entre ambos (o id neste caso).

```json
// movie collection

{
  "_id": 1,
  "title": "The Arrival of a Train",
  "year": 1896,
  "runtime": 1,
  "released": ISODate("1896-01-25"),
  "type": "movie",
  "directors": [ "Auguste Lumière", "Louis Lumière" ],
  "countries": [ "France" ],
  "genres": [ "Documentary", "Short" ],
}
```

```json
// movie_details collection

{
  "_id": 156,
  "movie_id": 1, // reference to the movie collection
  "poster": "http://ia.media-imdb.com/images/M/MV5BMjEyNDk5MDYzOV5BMl5BanBnXkFtZTgwNjIxMTEwMzE@._V1_SX300.jpg",
  "plot": "A group of people are standing in a straight line along the platform of a railway station, waiting for a train, which is seen coming at some distance. When the train stops at the platform, ...",
  "fullplot": "A group of people are standing in a straight line along the platform of a railway station, waiting for a train, which is seen coming at some distance. When the train stops at the platform, the line dissolves. The doors of the railway-cars open, and people on the platform help passengers to get off.",
  "lastupdated": ISODate("2015-08-15T10:06:53"),
  "imdb": {
    "rating": 7.3,
    "votes": 5043,
    "id": 12
  },
  "tomatoes": {
    "viewer": {
      "rating": 3.7,
      "numReviews": 59
    },
    "lastUpdated": ISODate("2020-01-29T00:02:53")
  }
}
```

Assim, se alguma vez precisarmos de toda a informação sobre o filme podemos fazer uma segunda pesquisa na coleção dos detalhes, caso contrário temos o essencial logo na primeira pesquisa, poupando assim no tráfego de dados.

<br>

## One-to-many

O tipo de relação one-to-many (um para muitos) acontece quando temos um documento que pode conter (ou estar ligado) a vários outros documentos do mesmo tipo.
Neste tipo de relação podemos também criar ligações através de `embedding` ou `referencing`, escolhendo o mais apropriado para o nosso caso.

<br>

### Embedding

Este tipo de ligação é preferencial quando precisamos de inserir documentos do mesmo tipo mas a quantidade não vai ser grande o suficiente para causar problemas de performance ou mesmo de leitura de informação. Por exemplo, uma coleção de users em que um user possa ter mais do que uma morada:

```json
{
  "_id": "joe",
  "name": "Joe Bookreader",
  "addresses": [
    {
      "street": "123 Fake Street",
      "city": "Faketon",
      "state": "MA",
      "zip": "12345"
    },
    {
      "street": "1 Some Other Street",
      "city": "Boston",
      "state": "MA",
      "zip": "12345"
    }
  ]
}
```

Assim, temos a informação toda concentrada num objecto.

<br>

### Referencing

Quando os objectos que queremos relacionar ao nosso primeiro objecto são relativamente grandes ou contêm informação que não é usada regularmente, podemos optar por ligá-los através de referencing. Por exemplo, numa aplicação em que os utilizadores podem fazer reviews, pode ser-nops útil guardar as reviews na sua própria coleção e depois ligá-las ao user através de um id:

```json
// user collection
{
   "_id": "joe",
   "name": "Joe Bookreader",
   "reviews": [712, 713, 714]
 }

 // reviews collection
 [
    {
      "review_id": 712,
      "review_author": "joe",
      "review_text": "This is indeed an amazing widget.",
      "published_date": ISODate("2019-02-18")
    },
    {
      "review_id": 713,
      "review_author": "joe",
      "review_text": "Nice product. Slow shipping.",
      "published_date": ISODate("2019-02-17")
    },
    ...
    {
      "review_id": 714,
      "review_author": "joe",
      "review_text": "Meh, it's okay.",
      "published_date": ISODate("2017-12-06")
    }
  ]
```

Temos assim uma relação one-to-many: Um utilizador pode ter várias reviews mas uma review é escrita apenas por um utilizador.

<br>

## Many-to-many

O tipo de relação many-to-many (muitos para muitos) assume que ambos os documentos podem estar relacionados com vários documentos do mesmo tipo. Para este tipo de relação é recomendado usar `referencing` para evitar duplicação de dados.

Por exemplo, se tivermos um livro este pode ser escrito por vários autores. Ao mesmo tempo, esses autores podem escrever vários livros.
Podemos representar esta organização em duas coleções diferentes e relacioná-las com um id:

```json
{
  _id: 76
   name: "Kristina Chodorow",
   born: 1980,
   location: "CA",
   books: [123456789, 234567890, ...]
}
{
   _id: 143
   name: "Mike Dirolf",
   born: 1990,
   location: "NY",
   books: [123456789]
}

{
    _id: 123456789,
    title: "MongoDB: The Definitive Guide",
    author: [ 76, 143 ],
    published_date: ISODate("2010-09-24"),
    pages: 216,
    language: "English"
}

{
   _id: 234567890,
   title: "50 Tips and Tricks for MongoDB Developer",
   author: [76],
   published_date: ISODate("2011-05-06"),
   pages: 68,
   language: "English"
}
```

Desta maneira conseguimos relacionar os documentos entre si sem criar dados duplicados ou incorrectos.
