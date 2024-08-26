import { createClient } from '@supabase/supabase-js';

// Fetch environment variables
const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_ANON_KEY as string;

// Create Supabase client
export const supabase = createClient('https://vkdziowfwaukvjotfyao.supabase.co', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrZHppb3dmd2F1a3Zqb3RmeWFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MDgzMDIsImV4cCI6MjA0MDA4NDMwMn0.A49Ty4CKwKrcsDmWCVmMyd-6qxMhlzifMKwV9Pt4r4A");
