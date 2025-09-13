import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://cbtjnmcvawbppeuvzrjz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNidGpubWN2YXdicHBldXZ6cmp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2MDA3NTQsImV4cCI6MjA3MzE3Njc1NH0.0DhydA9i2jlB23YQPJickJhsbgCL9lVstZpa6eeR40k"
);

export default supabase;
