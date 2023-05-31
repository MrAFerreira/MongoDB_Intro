# MongoDB Atlas e Setup

## Introdução

MongoDB atlas é uma solução oferecida pela empresa que gere o MongoDB.
Trata-se de um serviço de cloud que nos permite criar, gerir e aumentar a nossa base de dados de uma forma simples e intiuitiva. É adequado para qualquer utilizador que precise de interagir com a base de dados, desde developers a analistas ou até mesmo gestores de projeto.

## Benefícios

Scalability: Dependendo das necessidades da nossa aplicação podemos escalar a nossa base de dados tanto verticalmente (aumentando os recursos do servidor) como horizontalmente (colocando a nossa base de dados disponível em mais servidores)
Segurança: Podemos controlar o acesso á nossa DB e até mesmo encriptar pedidos.
Disponibilidade : O Atlas permite-nos colocar uma DB em várias regiões, o que garante que o serviço se mantéma tivo mesmo em caso de falhas de rede.
Automação: É possível automatizar algumas tarefas como backups, atualizações de software e monitorização.
Presença Global: O serviço Atlas está disponível em várias regiões e através de diversos "providers" como AWS e Azure, o que permite fazer host da base de dados o mais perto possível do utlizador base.

## Criar uma conta

Para ciar uma conta basta visitar o `[site](https://www.mongodb.com/atlas/database)` e clicar em **Try Free**
De seguida basta preencher o formulário ou fazer login com uma conta Google.
É possível que apareçam perguntas sobre o porquê de utilizar o serviço e que tipo de trbaalho efectuamos, mas estas questões são meramente para estatística e não vão afetar os serviços prestados.

## Criar um cluster

Depois de criada a conta é-nos apresentada a opção de criar um cluster (o que irá conter as nossas bases de dados e collections.)
É possível escolher um tier de serviço como `serverless` (pago por utilização), `dedicated` (pago por hora) e `shared` (versão gratuita).
As opções de providers e região dependem das necessidades do projecto, mas para efeitos de teste podem ser usadas as recomendações (AWS e Paris).
É também possível configurar a versão do MongoDB a utilizar.
Depois de clicar no botão `Create Cluster` o serviço vai criá-lo com as opções que selecionamos. Esta operação pode demorar alguns minutos.

## Configurar acessos

Podemos ir ao painel de `Security` e selecionar a opção de `Quickstart` para definirmos um utilizador e palavra passe para a nossa base de dados.

Neste menu podemos também alterar os IP's que têm acesso á base de dados. Para permitirmos que qualque IP se conecte (desde que tenha as credenciais correctas) podemos adicionar `0.0.0.0/0` á lista de IP's.

## Conectar com o Compass

Para conectar o nosso clucter com o Compass podemos ir a `Database` -> `Connect` e selecionar ao que queremos conectar, neste caso, MongoDB Compass. De seguida basta copiar o link que nos é dado e colocar no MongoDB Compass, certificando que o utilizador e password estão correctos.
