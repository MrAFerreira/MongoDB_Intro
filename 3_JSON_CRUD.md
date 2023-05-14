# JSON/BSON e CRUD

## JSON/BSON

JSON (Javascript Object Notation) é um formato de armazenamento e troca de dados bastante popular que evolui para lá da linguagem que lhe dá nome.
<br>
O serviço MongoDB guarda documentos no formato `BSON` (Binary JSON). Quando introduzimos informação em MongoDB podemos fazê-lo através do formato JSON regular e o serviço encarrega-se de transformá-lo em binário, o que permite armazenar informação de maneira mais leve e rápida.

### Formato

Um objecto JSON é composto por key-value pairs, semalhante a um dicionário em que primeiro temos uma palavra e de seguida a descrição.

Exemplo:

```json
{
  "name": "iPhone 12",
  "price": 799.99,
  "description": "The latest and greatest iPhone",
  "colors": ["Black", "White", "Blue", "Green",],
  "release_date": ISODate("2020-10-23T00:00:00Z"),
  "is_available": true
}
```

Dentro de um objecto `JSON` podemos guardar valores de diferentes tipos como strings, numbers, objects, arrays, dates e booleans.

Um objecto `BSON` tem a mesma aparência que um objecto `JSON` mas guarda a informação num formato diferente, usando para isso mais tipos de data, entre os quais:

| Data Type          | Description                                                                                                    |
| ------------------ | -------------------------------------------------------------------------------------------------------------- |
| Double             | Double precision floating point value.                                                                         |
| String             | A UTF-8 string.                                                                                                |
| Boolean            | A Boolean value (true or false).                                                                               |
| Date               | A 64-bit integer representing the number of milliseconds since the Unix epoch (Jan 1, 1970).                   |
| ObjectId           | A unique identifier consisting of a 12-byte value, typically represented as a 24-character hexadecimal string. |
| Object             | An object containing key-value pairs (the document itself is an object)                                        |
| Array              | A collection/grouping of data (can be mixed or all the same data)                                              |
| Null               | A null value.                                                                                                  |
| Int32              | A 32-bit integer value.                                                                                        |
| Int64              | A 64-bit integer value.                                                                                        |
| Decimal128         | A decimal floating point value that can represent numbers with up to 34 decimal places.                        |
| Binary Data        | A binary data object, represented as a byte array with a subtype field.                                        |
| Regular Expression | A regular expression pattern and its associated options.                                                       |
| Timestamp          | A 64-bit integer representing a timestamp, typically used for versioning purposes.                             |

## Operações CRUD

As operações `CRUD` (Create, Read, Update, Delete) são a base de qualquer base de dados e permitem-nos manipular a informação que temos.

### Create

Para criar documentos dentro de uma coleção podemos utilizar dois comandos, `insertOne` e `insertMany`.

O comando `insertOne` aceita um objecto JSON e adiciona-o a uma coleção.

```
db.myCollection.insertOne({name: "John", age: 30, isCustomer: true})
```

O comando `insertMany` aceita um array de objectos JSON e insere-os a todos numa coleção.

```
db.myCollection.insertMany([
  {name: "John", age: 30, isCustomer: true},
  {name: "Mary", age: 30, isCustomer: false},
  ])
```

### Read

Para encontrar/filtrar documentos da base de dados utilizamos os comandos `findOne` ou `find`.

O comando `findOne` aceita uma query que vai utilizar para filtrar os documentos e vai retornar **apenas o primeiro elemento que encontrar**. Ou seja, havendo mais do que um documento que satisfaça o filtro, apenas vamos ter acesso ao primeiro:

```bash
db.users.findOne({name: "John"})
# Esta operação iria retornar o primeiro documento que tivesse a propriedade name com o valor de John
```

O comando `find` aceita uma query que vai utilizar para filtrar os documentos e vai retornar **todos os elemento que encontrar** que satisfaçam a query. Neste caso recebemos **sempre** um array com os documentos encontrados (ou vazio caso não seja encontrado nenhum).

```bash
db.users.findOne({age: 30})
# Esta operação iria retornar todos os documentos que tivessem a propriedade age com um valor de 30
```

Se corrermos o comando `find` sem qualquer query obtemos todos os documentos pressentes na collection.

```bash
  db.users.find()
  # Esta operação retorna todos os documentos presentes na coleção users
```

### Update

Para editar documentos da base de dados utilizamos os comandos `updateOne` ou `updateMany`.

O comando `updateOne` precisa de dois argumentos: uma query que vai utilizar para filtrar os documentos e um objecto com a informação que queremos alterar. Existem várias operações de edição, de momento vamos usar o operador `$set` que adiciona algo a um documento.

```bash
db.myCollection.updateOne({name: "John"}, {$set: {color: "green"}})
# Neste exemplo estamos á procura de um documento com name: "John" e queremos adicionar a propriedade color: "green" .
```

O método `updateOne`, á semelhança do `findOne` apenas vai encontrar **o primeiro elemento** que cumprir a query, e editá-lo.

O comando `updateMany` aceita também uma query que vai utilizar para filtrar os documentos e um objecot com as propriedades a alterar. Ao contrário do método anterior, o método `updateMany` vai editar **todos os documentos que cumpram a query**.

```bash
db.myCollection.upateMany({age: 30}, {$set: {canVote: true}})
# Esta operação iria editar todos os documentos que tivessem a propriedade age:30 e adicionar a propriedade canVote: true
```

### Delete

Para eliminar documentos da base de dados utilizamos os comandos `deleteOne` ou `deleteMany`.

O comando `deleteOne` precisa de uma query para encontrar um documento e eliminá-lo da coleção. Este método elimina apenas ** o primeiro elemento que cumprir a query**

```bash
db.users.deleteOne({name: "John"})
# Esta operação iria apagar o primeiro elemento que tivesse a propriedade name: "John"
```

O comando `deleteMany` aceita também uma query que vai utilizar para eleminar **todos os documentos que cumpram a query**.

```bash
db.myCollection.deleteMany({age: 30})
# Esta operação iria eliminar todos os documentos que tivessem a propriedade age: 30
```
