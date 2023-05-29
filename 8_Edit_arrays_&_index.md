# Array operations | Indexing

---

## Push e pull em arrays

---

O operador `$set` permite-nos adicionar ou alterar informação num documento, incluindo arrays. No entanto este método não adiciona elementos a um array se este já existir, simplesmente substitui-o por completo.
Por exemplo, se tivermos este documento na nossa coleção:

```json
{
  "name": "John",
  "interests": ["Hiking", "Running", "Swimming"]
}
```

E realizarmos a seguinte operação:

```bash
db.users.updateOne({name: "John"}, {$set: {interests: ["Video games", "Music"]}})
```

O resultado final no documento vai ser o novo array:

```json
{
  "name": "John",
  "interests": ["Video games", "Music"]
}
```

Para podermos adicionar e remover elementos em arrays podemos utilizar certos operadores de MongoDB.

<br>

### $push

O operador `$push` permite-nos adicionar _um_ elemento a um array:

```bash
db.users.updateOne({name: "John"}, {$push: {interests: ["Painting"]}})
```

<br>

### $each

Se quisermos adicionar mais do que um elemento a um array temos que utilizar além do operador `$push` o operador `$each`:

```bash
db.users.updateOne({name: "John"}, {$push: {interests: {$each: ["Dancing", "Coding", "Movies"]}}})
```

<br>

### $pull

O operador `$pull` permite-nos remover um ou mais elementos de um array:

```bash
db.users.updateOne({name: "John"}, {$pull: {interests: "Painting"}})
```

Para retirar vários elementos:

```bash
db.users.updateOne({name: "John"}, {$pull: {interests: {$in: ["Music", "Coding"]} }})
```

<br>

## Indexing

---

Em MongoDB temos a possibilidade de utilizar a ferramenta `index`. Esta ferramenta é bastante útil para otimizar os processos de leitura da base de dados.

<br>

### Como funciona?

Por norma quando realizamos uma query com o método `find`, o MongoDB pesquisa toda a nossa coleção , algo chamado `collscan`. Para realizar esta pesquisa o serviço percorre todos os elementos da coleção, um a um, pela mesma ordem que estes apresentam naturalmente. Enquanto que esta pesquisa garante que vamos ter todos os resultados pretendidos é também bastante extensa e numa coleção co vários documentos pode tornar-se lenta.

Com um `index` podemos criar uma nova "ordem" nos nossos documentos, através do valor que escolhermos. Isto vai permitir ao serviço ordenar os documentos e quando fizermos uma pesquisa usando o `index`, ao invés de percorrer toda a coleção o serviço consegue ir diretamente aos documentos que possam conter a informação que queremos.

<br>

### createIndex

Existem vários tipos de `index`, sendo o mais comum o `index` de single-field.

```bash
db.countries.createIndex({cca3: 1})
```

Este `index` vai organizar toda a nossa coleção pelo campo `cca3`. Como passámos o número 1 como valor, vai organizar por ordem _ascendente_ e sendo o valor deste campo um string isso significa que vamos ter os elementos organizados por ordem lexiocográfica.

Para verificarmos que o MongoDB está de facto a utilizar um `index` para fazer a pesquisa podemos utilizar o método `explain`. Este método pode preceder o método find e vai-nos informar de como a pesquisa foi feita (entre outros detalhes):

```bash
db.countries.explain().find({cca3: "PRT"})
```

Dentro do objecto resultante podemos verificar um campo que descreve o método de pesquisa:

```json
...
winningPlan: {
      stage: 'FETCH',
      inputStage: {
        stage: 'IXSCAN',
        keyPattern: {
          cca3: 1
        },
        ...
```

Podemos verificar que em `winningPlan.inputStage.stage` o valor é de `IXSCAN` (index scan).
Se utilizarmos o método `explain` numa pesquisa que não está indexada receberíamos outro valor :

```bash
db.countries.explain().find({cca2: "PT"})
```

```json
...
 winningPlan: {
      stage: 'COLLSCAN',
      ...
```

<br>

### getIndexes e nomes dos indexes

Por norma quando criamos um index este vai ficar com o nome do(s) campo(s) indexado(s) e o número que refere se a ordem é ascendente ou descendente. O exemplo criado anteriormente tem o nome de `cca3_1` e podemos verificar os indexes que temos com o comando `getIndexes`:

```bash
db.countries.getIndexes()
```

Resultado:

```json
[
  { "v": 2, "key": { "_id": 1 }, "name": "_id_" },
  { "v": 2, "key": { "cca3": 1 }, "name": "cca3_1" }
]
```

É normal encontrarmos dois indexes porque além de termos criado um o MongoDb cria sempre um de raíz utilizando o \_id.

Para nomearmos um `index` de outra forma podemos passar o nome que queremos quando criamos o `index`:

```bash
db.countries.createIndex({"name.common": 1}, {name: "alfabética ascendente"})
```

Não é possível renomear um `index` já existente. Para isos temos que apagá-lo e criá-lo de novo.

<br>

### dropIndex

Para apagarmos um `index` podemos correr o comando `dropIndex` com o nome do index a apagar:

```bash
db.countries.createIndex("cca3_1")
```

## Quando utilizar?

Indexes são uma ferramenta poderosa que nos permitem otimizar e acelerar os processos de pesqusia na base de dados, mas existem alguns pontos negativos, especialmente com as operações de `insert`.

Se tivermos demasiados indexes o que acontece quando inserimos um documento novo na base de dados é que o serviço além de adicionar o documento vai ter que adicioná-lo na ordem correcta em todos os indexes que existem na coleção. Se tivermos 10 indexes o serviço vai ter que fazer esta operação 10 vezes.

Como tal, é importante usar indexes apenas para o necessário, que de forma geral serão atributos num documento que serão pesquisados com bastante frequência (como email em users ou quantidade em produtos)....
