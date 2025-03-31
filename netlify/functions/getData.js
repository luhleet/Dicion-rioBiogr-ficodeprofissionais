const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ssethvlmwzdoainknztb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzZXRodmxtd3pkb2FpbmtuenRiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MjQ5MTAzOSwiZXhwIjoyMDU4MDY3MDM5fQ.ZezYulhziaF5MqVb6ec0FApCanWC7J0vFhkKqYhWyg4';
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async function(event, context) {
  try {
    const { data, error } = await supabase
      .from('sua_tabela')
      .select('*');

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro ao recuperar dados', error }),
    };
  }
};
