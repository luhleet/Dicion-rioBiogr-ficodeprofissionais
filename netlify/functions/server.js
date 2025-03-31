onst express = require('express');
const { createClient } = require('@supabase/supabase-js');

// Configurar o cliente Supabase
const supabaseUrl = 'https://seu-project-id.supabase.co'; // URL do Supabase
const supabaseKey = 'sua-chave-secreta'; // Sua chave secreta
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint para recuperar dados do Supabase
app.get('/api/data', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('sua_tabela') // Nome da tabela no Supabase
      .select('*'); // Selecionando todos os dados da tabela

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao recuperar dados', error });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
