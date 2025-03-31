const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');

// Inicializar o aplicativo Firebase com a chave do serviço
admin.initializeApp({
  credential: admin.credential.cert('./serviceAccountKey.json'), // Caminho para o arquivo JSON da chave
  databaseURL: 'https://seu-projeto.firebaseio.com',  // URL do seu Firebase Database
});

const app = express();
const db = admin.database();

// Middleware para aceitar JSON no corpo da requisição
app.use(bodyParser.json());

// Exemplo de endpoint para adicionar dados no Firebase
app.post('/addData', (req, res) => {
  const data = req.body;  // Dados do corpo da requisição

  const ref = db.ref('data'); // Referência ao nó 'data' no Realtime Database

  ref.push(data)
    .then(() => res.status(200).send('Data added successfully'))
    .catch((error) => res.status(500).send('Error adding data: ' + error));
});

// Exemplo de endpoint para ler dados do Firebase
app.get('/getData', (req, res) => {
  const ref = db.ref('data'); // Referência ao nó 'data'

  ref.once('value')
    .then(snapshot => {
      const data = snapshot.val();
      res.status(200).json(data);
    })
    .catch((error) => res.status(500).send('Error retrieving data: ' + error));
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
