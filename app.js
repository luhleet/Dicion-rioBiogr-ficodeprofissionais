// app.js

// Defina a URL e chave do Supabase
const supabaseUrl = 'https://ssethvlmwzdoainknztb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzZXRodmxtd3pkb2FpbmtuenRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0OTEwMzksImV4cCI6MjA1ODA2NzAzOX0.pyI4BkggUm9DnAIXaeAqyN99ymMJ98s-PnGMyMBqZu4
';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Função para realizar a pesquisa
async function searchDatabase(query) {
    const { data, error } = await supabase
        .from('perfil') // Substitua 'sua_tabela' pelo nome da sua tabela
        .select('*')
        .ilike('nome', `%${query}%`); // Substitua 'campo_a_ser_pesquisado' pelo nome do campo que será pesquisado

    if (error) {
        console.error('Erro ao buscar no banco de dados:', error);
        return;
    }

    return data;
}

// Função para exibir os resultados
function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Limpa os resultados anteriores

    if (results.length === 0) {
        resultsContainer.innerHTML = 'Nenhum resultado encontrado.';
        return;
    }

    results.forEach(result => {
        const div = document.createElement('div');
        div.textContent = JSON.stringify(result); // Exibe o resultado como string (você pode customizar isso)
        resultsContainer.appendChild(div);
    });
}

// Adiciona o ouvinte de evento para o botão de pesquisa
document.getElementById('searchButton').addEventListener('click', async () => {
    const searchQuery = document.getElementById('searchInput').value;
    if (searchQuery.trim() === '') {
        alert('Digite algo para pesquisar.');
        return;
    }

    // Realiza a pesquisa no Supabase
    const results = await searchDatabase(searchQuery);

    // Exibe os resultados
    displayResults(results);
});
