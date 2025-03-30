import { supabase } from "./db.js";

async function buscarPerfis() {
    const { data, error } = await supabase.from("perfis").select("*");

    if (error) {
        console.error("Erro ao buscar perfis:", error);
        return;
    }

    console.log("Perfis encontrados:", data);
}

    // 🔎 Buscar no Supabase (filtrando pelo nome)
    let { data, error } = await supabase
        .from("usuarios")
        .select("*")
        .ilike("nome", `%${nomeBuscado}%`); // Busca aproximada (ignora maiúsculas e minúsculas)

    if (error) {
        console.error("Erro na busca:", error);
        document.getElementById("resultados").innerHTML = "<p>Erro ao buscar dados.</p>";
        return;
    }

    // 🔄 Exibir os resultados
    if (data.length > 0) {
        let html = data.map(perfil => `
            <div class="perfil">
                <h2>${perfil.nome} ${perfil.sobrenome || ""}</h2>
                <p><strong>Cidade:</strong> ${perfil.cidade || "Não informado"}</p>
                <p><strong>Estado:</strong> ${perfil.estado || "Não informado"}</p>
                <p><strong>Escolaridade:</strong> ${perfil.escolaridade || "Não informado"}</p>
            </div>
        `).join("");
        document.getElementById("resultados").innerHTML = html;
    } else {
        document.getElementById("resultados").innerHTML = "<p>Nenhum resultado encontrado.</p>";
    }
}

// 🔄 Chamar a função ao carregar a página
window.onload = buscarPerfil;
