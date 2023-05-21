# CRUD avançado

As operações CRUD existentes em MongoDB podem ser utilizadas com algumas opções mais avançadas.

## Create

### insertMany

O método `insertMany` apesar de ser utilizado para adicionar vários documentos numa coleção, pode ser utilizado para inserir apenas um. Ou seja, numa situação em que não temos a certeza de quantos documentos vamos precisar de inserir, podemos utilizar este método.

```bash
db.users.insertMany([{name: "Max", age: "30"}])
```

### Adding custom ids

Apesar do MongoDB gerar um campo de `_id` com um identificador único, podemos adicionar o nosso próprio:

```bash
db.users.insertOne({name: "Max", age: "30", _id: "user_1"})
```

### insert order

Quando usamos o método `isnertMany`, se existir algum erro na operação o MongoDB vai adicionar documentos na mesma _até ao ponto em que existiu o erro_, por exemplo:

```bash
db.users.insertMany({name: "Julie", age: "29", _id: "user_2"}, {name: "Max", age: "30", _id: "user_1"}, {name: "John", age: "30", _id: "user_3"})
```

Neste caso (assumindo que já tinhamos um elemento na collection com o `_id` "user_1) o primeiro documento (Julie) seria inserido, mas o último (John) não seria poque existiu um erro no meio.

Isto é o comportamento normal do MongoDB , conhecido como **ordered insert** ou seja, as operações de inserção são feitas na ordem que especificamos.

No caso de não querermos esta opção e preferirmos adicionar todos os documentos que estejam correctos, independentemente da sua ordem, podemos adicionar um objecto de opções a seguir ao array de documentos. Este objecto só precisa de conter a key `ordered` com o valor de `false`:

```bash
db.users.insertMany([{name: "Julie", age: "29", _id: "user_2"}, {name: "Carl", age: "50", _id: "user_4"}, {name: "Mary", age: "45", _id: "user_5"}], {ordered: false})
```

Neste caso, apesar do primeiro documento conter um erro (um \_id que já existe), o MongoDB continua a operaçãoe insere os seguintes documentos.

## Read

### Cursor e métodos

Quando utilizamos o método `find`, se estivermos a utilizar uma base de dados com bastantes documentos, o que recebemos é apenas uma amostra de todos os resultados.

```bash
db.countries.find()
//retorna os 20 primeiros resultados
```

Este grupo de documentos é chamado um `batch`. O MongoDb divide os resultados de uma operação `find` em batches para facilitar o processo e não enviar demasiada informação de uma só vez.
A query que utilizamos é chamada de `cursor` e é guardada para podermos requisitar os batches seguintes sem fazer um "reset" á operação.

Podemos guardar um cursor como uma variável de javascript:

```bash

const dataCursor = db.countries.find()
```

Podemos agora invocar o cursor para fazer a pesquisa e utilizar outros métodos:

```bash
# invoca a funcçao find e retorna os primeiros 20 países
dataCursor

# apresenta o próximo resultado do cursor
dataCursor.next()

```

Podemos também utilizar uma função `forEach` para percorrer todos os documentos da collection.

```bash
dataCursor.forEach(doc => {printJson(doc)} )
```

Esta operação vai imprimir no terminal todos os documentos _restantes_ da operação find. Ou seja, se o nosso cursor já não estiver nos primeiros 20 resultdaos mas sim mais avançado, vamos apenas obter o resto dos documentos.

Quando o cursor já não tem mais resultados para apresentar recebemos um erro. Se quisermos garantir se existe ou não um documento seguinte no cursor podemos correr o método `hasNext` que retorna um boolean.

```bash
dataCursor.hasNext()
# retorna true ou false
```

## Update

### $set

O operador `$set` quando utilizado numa operação de update vai adicionar _ou_ alterar um campo já existente num documento.

```bash
db.users.updateOne({name: "Max"}, {$set: {hobbies: ["Sports", "Cooking"]}})
#adicionamos um array com hobbies ao documento existente
```

Se corrermos a operação anterior com conteúdos diferentes no array, vamos receber um array novo com apenas os novos elementos, neste caso o operador `$set` vai substituir os valores já existentes.

```bash
db.users.updateOne({name: "Max"}, {$set: {hobbies: ["Cards", "Hiking"]}})
# o array hobbies pass a ter apenas estes dois elementos
```

Podemos também alterar/adicionar mais do que um campo com o operador `$set`.

```bash
db.users.updateOne({name: "Max"}, {$set: {age: 45, phone: "919191919"}})

```

### $inc

O operador `$inc` permite-nos alterar um valor num documento ao incrementá-lo:

```bash
db.users.updateOne({name: "Max"}, {$inc: {age: 1}})
# incrementamos o valor por 1
db.users.updateOne({name: "Max"}, {$inc: {age: 2}})
# incrementamos o valor por 2
db.users.updateOne({name: "Max"}, {$inc: {age: -1}})
# decrescemos o valor por 1
```

### $mul

O operador `$mul` permite-nos alterar um valor num documento ao multiplicá-lo:

```bash
db.users.updateOne({name: "Max"}, {$mul: {age: 2}})
# multiplicamos o valor por 2
db.users.updateOne({name: "Max"}, {$mul: {age: 0.5}})
# multiplicamos o valor por metade
db.users.updateOne({name: "Max"}, {$mul: {age: 0.1}})
# multiplicamos o valor por 0.1 (10%)
```

### $unset

O operador `$unset` permite-nos remover completamente um valor de um documento.

```bash
db.users.updateOne({name: "Max"}, {$unset: {phone: ""}})
# o valor colocado para phone é redundante porque o campo vai ser apagado

```

### $rename

O operador `$rename` permite-nos alterar o nome de um campo num documento.

```bash
db.users.updateOne({name: "Max"}, {$rename: {age: "years"}})
# o campo age chama-se agora "years"

```

### uspert

A opção `upsert` permite-nos adicioanr um documento caso este não exista na collection.

```bash
db.users.updateOne({name: "Mario"}, {$set: {age: 25, hobbies: ["Running"]}, {upsert: true}})
# neste caso um documento com o nome Mario ainda não existe. Como adicionamos a opção upsert : true, o MongoDB vai criar um novo documento não só com a propriedade name: Mario, mas também com as propriedades que estávamos a tentar alterar com o operador $set

```

## Delete

Os métodos `deleteOne` e `deleteMany` aceitam uma query com todos os operadores previamente vistos no documento `4_Queries`.

Para apagar todos os documentos duma collection (mas não a collection em si) podemos correr o comando `deleteMany` sem um filtro:

```bash
db.users.deleteMany({})
```
