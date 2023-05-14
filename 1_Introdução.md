# Introdução a MongoDB

MongoDB (que deriva da palavra "humongous", sinónimo de gigante), é um sistema de base de dados NoSQL.
Á semelhança com outras bases de dado NoSQL, MongoDB distingue-se por se focar maioritariamente nos documentos (data) em si, não utilizando um sistema de tabelas (ao contrário das bases de dado SQL), e optando por um esquema hierárquico de organização.

## Características

A informação em MongoDB é guardado no formato BSON, que é á primeira vista igual a JSON mas convertido para binário.

MongoDB é "schemaless", o que significa que não necessita de nenhuma esquema ou padrão para os documentos que vai guardar, a não ser que o utilizador o especifique.

## Hierarquia

O sistema de organização em MongoDB é composto por 3 componentes principais: Database, collections e documents:

- Databases (bases de dado) são o primeiro e maior elemento, aquele que vai agregar toda a informação que o utilizador quiser guardar.
- Collections (coleções) existem dentro das bases de dado e servem para fazer uma separação da informação. Por exemplo, uma base de dados de uma loja pode ter uma collection para os produtos e outra para os compradores.
- Documents (documentos) - a informação que o utilizador guarda, em formato JSON/BSON

Apesar de ser uma base de dados não-relacional, é possível criar relações entre os documentos numa base de dados através de alguns métodos como embedding e referencing.

## Ecosistema

O serviço de MongoDB pode ser utilizado principalmente de 3 maneiras:

- Community edition - serviço gratuito que pode ser utilizado para aprendizagem e projectos pequenos
- Enterprise - Solução de grande escala geralmente utilizado em projectos maiores
- Atlas - Serviço de MongoDB na cloud que pode ser escalável consoante as necessidades do utilizador (inclui uma versão gratuita)

Além disso também existem várias ferramentas que permitem conectar um serviço de MongoDB a diferentes linguages de programação (drivers) e uma GUI (interface visual) chamada MongoDB Compass que permite um acesso diferente ao serviço.
