import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zsuphwvhrbmuwurmplan.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzdXBod3ZocmJtdXd1cm1wbGFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4Mzk2MjksImV4cCI6MjA0OTQxNTYyOX0.9y8O8aRpwHH4ZjTTc02QHqplZmkUG2T-XXElLXlmmro'

export const supabase = createClient(supabaseUrl, supabaseKey)
