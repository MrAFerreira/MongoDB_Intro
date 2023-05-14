# Queries

Apesar de MongoDB ser uma base de dados NoSQL (Non Structured Query Language) isso não significa que não podemos utilizar queries para filtrar e obter documentos específicos.

## Field : value

A query mais simples que podemos fazer é pelo campo e valor que queremos encontrar.

```
db.countries.find({cca2 : "PT"})
# Com esta query estamos a pesquisar todos os documentos que contenham o campo cca2 com um valor de PT
```

## Operadores de lógica

Podemos também utilizar operadores de lógica numa query.

### $and

O operador `$and` retorna todos os documentos que contenham ambos os campos. Para utilizá-lo podemos passar um array com todos as propriedades e valores que queremos.

```
db.countries.find({$and: [{region: "Europe"}, {subregion: "Southern Europe"}]})

```

No cado do operador `$and` podemos utilizar uma forma simplificada de escrita:

```bash
db.countries.find({region: "Europe", subregion: "Southern Europe"})
# Com este formato omitimos o array e separamos apenas os valores com vírgulas
```

### $or

O operador `$or` retorna todos os documentos que contenham **pelo menos um dos valores** especificados. Para utilizá-lo podemos passar um array com todos as propriedades e valores que queremos.

```
db.countries.find({$or: [{region: "Europe"}, {unMember: true}]})

```

### $nor

O operador `$nor` retorna todos os documentos que **não contenham nenhum dos valores** especificados.

```
db.countries.find({$nor: [{region: "Europe"}, {unMember: true}]})

```

### $ne

O operador `$ne` retorna todos os documentos que **não contenham o valor** especificado.

```
db.countries.find({unMember: {$ne: true}})

```

## Outros operadores

### $gt

O operador `$gt` retorna todos os documentos que contenham um **valor maior** que o especificado.

```
db.countries.find({area: {$gt: 1002450}})

```

### $gte

O operador `$gte` retorna todos os documentos que contenham um **valor maior ou igual** que o especificado.

```
db.countries.find({area: {$gte: 1002450}})

```

### $lt

O operador `$lt` retorna todos os documentos que contenham um **valor menor** que o especificado.

```
db.countries.find({area: {$lt: 1002450}})

```

### $lte

O operador `$lte` retorna todos os documentos que contenham um **valor menor ou igual** que o especificado.

```
db.countries.find({area: {$lte: 1002450}})

```

## Operadores de Arrays

Alguns operadores permitem-nos fazer queries com arrays e os elementos que estes contêm

### $in

O operador `$in` retorna todos os documentos em que o array especificado contenha **pelo menos um dos valores procurados**

```
db.countries.find({borders : {$in : ["CHN", "PRT"]}})

```

### $nin

O operador `$nin` retorna todos os documentos em que o array especificado **não contenha nenhum dos valores procurados**

```
db.countries.find({borders : {$nin : ["CHN", "PRT"]}})

```

### $all

O operador `$all` retorna todos os documentos em que o array especificado contenha **todos os valores procurados**

```
db.countries.find({borders : {$all : ["CHN", "AFG"]}})

```

### $size

O operador `$size` retorna todos os documentos em que o array especificado **tenha um tamanho igual ao número procurado**

```
db.countries.find({borders : {$size : 10}})

```
