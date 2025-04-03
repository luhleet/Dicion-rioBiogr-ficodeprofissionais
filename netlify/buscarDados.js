const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event) => {
    if (!event.body) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Request body is missing' }) };
    }

    let nome;
    try {
        const parsedBody = JSON.parse(event.body);
        nome = parsedBody.nome;
    } catch (err) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON in request body' }) };
    }

    if (!nome) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Nome é obrigatório' }) };
    }

    const { data, error } = await supabase
        .from('perfil')  // Nome da tabela no Supabase
        .select('*')
        .ilike('nome', `%${nome}%`); // Busca nomes semelhantes

    if (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }

    return { statusCode: 200, body: JSON.stringify(data) };
};