const SUPABASE_URL = "https://tzugubrpoizirgufhozn.supabase.co/"; 
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6dWd1YnJwb2l6aXJndWZob3puIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE0OTY1ODEsImV4cCI6MjEwNzA3MjU4MX0.q8GrSI-3MpTeKgHSHwp8q4QcU7uA_SeYavW4uwHFJj0"; 
export const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);