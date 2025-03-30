// Importar a biblioteca supabase-js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ssethvlmwzdoainknztb.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// Função para buscar perfis no Supabase
async function buscarPerfis(query) {
    const { data, error } = await supabase
        .from("perfis")
        .select("*")
        .or(`nome.ilike.%${query}%, sobrenome.ilike.%${query}%`); // Pesquisa por nome ou sobrenome

    if (error) {
        console.error("Erro ao buscar perfis:", error);
        return [];
    }

    return data;
}
document.getElementById("searchForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Impede recarregamento da página

    let query = document.getElementById("searchInput").value.trim();
    let resultDiv = document.getElementById("results");
    resultDiv.innerHTML = "<p>🔍 Buscando...</p>";

    if (query !== "") {
        const perfis = await buscarPerfis(query);
        resultDiv.innerHTML = ""; // Limpa os resultados anteriores

        if (perfis.length > 0) {
            perfis.forEach(profile => {
                resultDiv.innerHTML += `
                    <div class="public.perfil">
                        <img src="images/${profile.foto}" alt="${profile.nome}">
                        <h2>${profile.nome} ${profile.sobrenome}</h2>
                        <p><strong>Cidade:</strong> ${profile.cidade}, ${profile.estado}</p>
                        <p><strong>Escolaridade:</strong> ${profile.escolaridade}</p>
                        <p><strong>Cargo:</strong> ${profile.cargo}</p>
                        <div class="social-links">
                            <a href="${profile.facebook}" target="_blank">🔵 Facebook</a>
                            <a href="${profile.instagram}" target="_blank">📷 Instagram</a>
                            <a href="${profile.linkedin}" target="_blank">💼 LinkedIn</a>
                        </div>
                    </div>
                `;
            });
