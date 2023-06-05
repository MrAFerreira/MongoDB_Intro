// Exemplo de como utilizar a driver de mongodb para conectar a uma base de dados, realizar operações CRUD e criar um index

//importamos MongoClient do package mongodb
const { MongoClient } = require('mongodb');

// Definimos onde nos quwremos conectar. Neste caso estamos a conectar ao serviço local mas poderíamos conectar também ao serviço Atlas
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Vamos utilizar este nome para criar uma base de dados
const dbName = 'myProject';

async function main() {
  // Utilizamos o método connect para conectarmos ao serviço especificado
  await client.connect();
  console.log('Connected successfully to MongoDB!');

  // Com o método db do client podemos OU criar uma base de dados OU utilizar uma que já exista. Semelhante ao comando 'use' que utilizamos na shell
  const db = client.db(dbName);

  //O mesmo é verdade para as collections. Se a collection não existir criamos uma. Independentemente de existir ou não, desta maneira estamos a guardar uma instância da collection numa variável para depois ser mais fácil aceder
  const collection = db.collection('documents');

  //Array com produtos para inserir na base de dados
  const products = [
    {
      name: 'Iphone 14',
      available: true,
      price: 1200,
    },
    {
      name: 'Macbook Pro',
      available: true,
      price: 1600,
    },
    {
      name: 'Dell 4k Monitor',
      available: false,
      price: 2000,
    },
  ];

  //Para inserir documentos numa collection utilizamos o mesmo comando que utilizamos na shell, insertMany.
  // Não é necessário guardar estas operações em variáveis, estamos apenas a fazê-lo para poder fazer um cosole.log e verificar o resultado
  const insertedProducts = await collection.insertMany(products);
  console.log('Produtos inseridos =>', insertedProducts);

  //Para encontrar resultados utilizamos o find
  const findAllProducts = await collection.find({}).toArray();
  console.log('Todos os produtos =>', findAllProducts);

  //Tal como na shell, podemos passar uma query no método find para filtrar o que queremos encontrar
  const unavailableProducts = await collection.find({ available: false }).toArray();
  console.log('Produtos não disponíveis =>', filteredDocs);

  // Para fazer um update podemos utilizar o método updateOne com os mesmos operadores que aprendemos, tal como o $set
  const updatedProduct = await collection.updateOne(
    { available: false },
    { $set: { description: 'A very high resolution monitor perfect for gaming' } }
  );
  console.log(' Produto atualizado =>', updatedProduct);

  // Para apagar, deleteMany (com um filtro, caso contrário apagaria todos os documentos)
  const deletedProduct = await collection.deleteMany({ available: false });
  console.log('Produto eliminado =>', deletedProduct);

  //Para criar um index utilizamos o método createIndex com os campos que queremos indexar e ordem dos mesmos (1 para ascendente, -1 para descendente)

  const newIndex = await collection.createIndex({ price: 1 });
  console.log('Nome do novo index => ', newIndex);

  return 'Finished all operations';
}

//Este código corre apenas a função que criámos acima
// É importante fechar a conexão com a base de dados no final, independentemente de termos tido algum erro
main()
  .then()
  .catch(console.error)
  .finally(() => client.close());
