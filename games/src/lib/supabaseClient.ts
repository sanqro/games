import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://udxhcjhhbxvrfawzfsgc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkeGhjamhoYnh2cmZhd3pmc2djIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU1NjAyMDQsImV4cCI6MjAyMTEzNjIwNH0.XbvuaMICzx_v8aCenSilEv2T0HAxbPqsd6A-iQlcL5U';
export const supabase = createClient(supabaseUrl, supabaseKey);