# Projection, sorting, limiting e skipping

## Sorting

Os resultados de chamarmos o método `find` são apresentados na mesma ordem que estão presentes na collection. Podemos no entanto organizar a informação por parâmetros diferentes utilizando o método `sort`.

```bash
# usando a collection countries
db.countries.find().sort({area: 1})
```

O número em frente ao campo representa a ordem: 1 para ascendente, -1 para descendente.

Podemos também passar mais do que um parâmetro. Nesse caso, se dois ou mais documentos tiverem o mesmo valor para o primeiro parâmetro, vão ser organizados entre eles quanto ao segundo.

```bash
# nesta situação, se alguns países tiverem uma área igual vão ser organizados pela sua população
db.countries.find().sort({area: 1, population: 1})
```

## Skipping

`skip` é um método que nos permite saltar x resultados. É especialmente útil em situações como paginação, em que queremos não os primeiros resultados mas outros.

```bash
db.countries.find().skip(10)
# "Salta" os primeiros 10 resultados
```

## Limiting

O MongoDb apresenta 20 resultados com o método `find`. No entanto podemos diminuir o valor de resultados apresentados com o método `limit`.

```bash
db.countries.find().limit(5)
# Retorna apenas 5 resultados
```

Podemos juntar todos estes métodos para retornar os resultados específicos que queremos, e quantos.

```bash
db.countries.find({region: "Europe"}).sort({population: -1}).skip(3).limit(3)
# Retornamos países na Europa ordenados pela sua população (descendente), saltando os 3 primeiros e apresentando apenas 3
```

### Ordem das operações

Como podemos utilizar todos os métodos na mesma operação uma pergunta comum é se a ordem interessa. No MongoDB,utilizando estes 3 métodos a ordem `não importa`. Ou seja, não é por fazermos um `skip` de 10 primeiro e depois um `sort` que o o MongoDB vai apenas ordenar os resultados depois do 10º documento.

As operações são sempre realizadas pela seguinte ordem: `sort`, `skip` e `limit`.

## Projecting

o campo `project` permite-nos formatar a apresentação do método `find` ao escolher quais os campos que queremos apresentar. É o segundo argumento do método find, um objecto com os campos que queremos retornar e o número 1 para apresentar ou 0 para esconder.

```bash
db.countries.find({region: "Europe"}, {cca2: 1, region: 1, area: 1})
```

Reparamos que o \_id continua presente. É o único campo que aparece mesmo que não o especifiquemos. Para omitir basta adicionar ao objecto de project com o valor 0:

```bash
db.countries.find({region: "Europe"}, {cca2: 1, region: 1, area: 1, _id: 0})
```

Podemos também aplicar o `project` a campos dentro de objectos dentro do nosso documento.

```bash
db.countries.find({region: "Europe"}, {cca2: 1, "name.common": 1, _id: 0})
```
