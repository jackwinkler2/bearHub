import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kfgatwgjsjmivvxmwbpp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmZ2F0d2dqc2ptaXZ2eG13YnBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNjkwMTcsImV4cCI6MjA2OTk0NTAxN30.hKGi4cfevbs8mSwTJHmUgBIuJ6Eu_UE2pdWVtNA95-I';

export const supabase = createClient(supabaseUrl, supabaseKey);
