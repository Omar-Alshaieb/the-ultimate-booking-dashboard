import {createClient} from '@supabase/supabase-js';

export const supabaseUrl = 'https://vlgjfxoyohzafdkyeehr.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsZ2pmeG95b2h6YWZka3llZWhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyOTE3NDksImV4cCI6MjA2Mzg2Nzc0OX0._ajhhnXVPpJIoZdd06rh--5ZUPwVMCg6dO7-Fa88s2I';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
