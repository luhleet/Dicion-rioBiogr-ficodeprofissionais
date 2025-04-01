import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// Conectar ao Supabase usando variáveis de ambiente
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export async function handler(event) {
    try {
        // Pegar o parâmetro "query" da URL
        const { query } = event.queryStringParameters;

        if (!query) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "O parâmetro 'query' é obrigatório" })
            };
        }

        // Buscar dados no Supabase
        const { data, error } = await supabase
            .from('sua_tabela') // Substitua pelo nome real da sua tabela
            .select('*')
            .ilike('nome', `%${query}%`); // Busca pelo nome (altere para o campo correto)

        if (error) throw error;

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
}
