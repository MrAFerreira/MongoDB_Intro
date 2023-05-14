# Databases e collections

Uma database (base de dados) é o primeiro ponto de contacto com o serviço de MongoDB e serve como repositório para toda a informação que queiramos guardar.

## show dbs

Para verificarmos uma lista de databases que temos neste momento podemos correr o comando `show dbs` . Inicialmente devem estar presentes 3 databases que são criadas quando isntalamos o serviço.

## use

O comando `use` tem dois propósitos, usar uma database ou criar uma nova.

Se corrermos o comando `use myDatabase` e esta ainda não existir, vamos criar uma database com o nome `myDatabase` e começar a utilizá-la.
<br>
Por outro lado se usarmos o comando `use local` e já tivermos uma database com esse nome, começamos então a usar a mesma. Assemelha-se a entrarmos numa pasta através do terminal usando o comando `cd`

## createCollection

Para uma database existir precisa de uma collection.
<br>
Após criarmos a nossa base de dados podemos criar uma coleção dentro da mesma com o comando:

```
db.createCollection('collectionName')
```

Este comando aceita um string (texto) com o nome que queremos dar á nossa colecção.

## drop

Se quisermos apagar uma collection podemos fazê-lo com o comando `drop`:

```
db.collectionName.drop()
```

## dropDatabse

Para apagar uma database completamente podemos correr o comando `dropDatabase` quando estamos a utilizar uma databse em específico:

```
db.dropDatabase()
```
