import { supabase } from './supabaseClient';
import { flavorData } from './data/flavors';

const themeArray = flavorData.map(item => {
    return {"theme": item.theme}
});


const { data, error } = await supabase.rpc('update prompts', { arr: themeArray })

/*

this will need to be added in the database functions section of the website:
and called above

```
create function add_one_each(arr int[]) returns int[] as $$
  select array_agg(n + 1) from unnest(arr) as n;
$$ language sql;

*/