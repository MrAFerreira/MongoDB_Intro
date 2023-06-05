const mongoose = require('mongoose');
const Product = require('./models/Product.model');
// A conexão com mongoose é muito semelhante á dos drivers

async function manageDb() {
  try {
    //podemos definir directamente a que base de dados nos queremos ligar. Se não existir, é criada
    await mongoose.connect('mongodb://localhost/myStore');

    // Para inserir documentos utilizamos o método create do modelo que queremos. Se não existir ainda uma coleção para o modelo, o mongoose cria diretamente no mongodb uma collection com o nome do modelo em mínisculas e no plural, ou seja o modelom Product irá criar uma collection products
    await Product.create({ name: 'Wacom tablet', price: 52, available: true });

    //Para filtrar documentos usamos o método find. Podemos também utilizar a syntax e operadores de mongoDB
    let cheapProducts = await Product.find({ price: { $lte: 60 } }); // -> retorna um array

    //findOne ou findById retornam apenas um objecto
    let singleProduct = await Product.findOne({ age: { $gte: 12 } });
    //let idProduct = await Product.findById('63e4eed37419feeeeb30c41d');

    // Para alterar documentos temos também  os métodos updateOne e updateMany
    //Com o mongoose não precisamos de utilizar o operador $set, é assumido sempre que fazemos uma alteração
    await Product.updateMany({ available: true }, { discount: '20%' });

    //Podemos também encontrar por id e alterar. Este método altera apenas 1 documento
    //await Product.findByIdAndUpdate('63e4eed37419feeeeb30c41d', { color: 'orange' });

    //Para eliminar temos os métodos deleteMany, deleteOne e findByIdAndRemove

    //await Product.deleteMany({ available: 'false' });
    //await Product.deleteOne({ name: 'Iphone' });

    await Product.findByIdAndRemove('63e4f3e5dbb304aa57b1bc3f');

    //desconectar no final. Se estivéssemos a aplicar mongodb ou mongoose num servidor/API poderíamos deixar a conexãoa berta
    mongoose.disconnect();
  } catch (error) {
    console.log(error);
  }
}

// Invocar a funcção criada acima
manageDb();
