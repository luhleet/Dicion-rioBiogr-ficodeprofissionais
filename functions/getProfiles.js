// functions/getProfiles.js
const { createClient } = require('@supabase/supabase-js');

// Credenciais Supabase (defina no Netlify ou diretamente aqui)
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

exports.handler = async (event, context) => {
    try {
        // Buscar todos os perfis
        const { data, error } = await supabase
            .from('profiles')
            .select('*');

        if (error) throw error;

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        };
    }
};
