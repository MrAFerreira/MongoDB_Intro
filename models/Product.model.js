// Para criar um modelo utilizamos a biblioteca mongoose
const mongoose = require('mongoose');

// Extraímos a classe Schema de dentro da biblioteca. Schema é o que nos permite criar validação nos nossos modelos
const Schema = mongoose.Schema;

// Declaramos o nosso schema
const productSchema = new Schema(
  {
    // Podemos agora definir as propriedades que queremos e que tipo de data são (string, number, etc...)
    name: {
      type: String,
      // temos também vários métodos de validação, como por exemplo a opção unique que não permite valores duplicados para este campo em especifico
      unique: true,
    },
    quantity: {
      type: Number,
      min: 0,
    },
    available: {
      type: Boolean,
      required: true,
    },
  },
  //a opção timestamps coloca diretamente no objeto os campos "createdAt" e "updatedAt"
  { timestamps: true }
);

// Enquanto que o schema é apenas o esquema de validação para os nossos documentos, um model é o que nos permite utilizar os métodos CRUD e manipular a nossa informação. Criamos portanto um model com base no nosso schema
const Product = mongoose.model('Product', productSchema);

// Exportamos para poder usar em qualuqer lugar na nossa aplicação
module.exports = Product;
