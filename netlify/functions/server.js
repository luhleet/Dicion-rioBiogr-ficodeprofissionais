onst express = require('express');
const { createClient } = require('@supabase/supabase-js');

// Configurar o cliente Supabase
const supabaseUrl = 'https://ssethvlmwzdoainknztb.supabase.co'; // URL do Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzZXRodmxtd3pkb2FpbmtuenRiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MjQ5MTAzOSwiZXhwIjoyMDU4MDY3MDM5fQ.ZezYulhziaF5MqVb6ec0FApCanWC7J0vFhkKqYhWyg4'; // Sua chave secreta
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
