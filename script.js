
const SUPABASE_URL = "https://dmuomeeuriqlayyuwrim.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_MSdBBcMSPa8a6g3cTPFEWw_uUOOeigD;

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

async function signUp(email, password, username) {
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  if (data.user && data.session) {
    const { error: profileError } = await supabaseClient
      .from("profiles")
      .insert({
        user_id: data.user.id,
        username: username
      });

    if (profileError) alert(profileError.message);
  }

  alert("Kontot har skapats! Kontrollera din e-post om du behöver bekräfta kontot.");
}

async function signIn(email, password) {
  const { error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Du är inloggad!");
}

async function signOut() {
  const { error } = await supabaseClient.auth.signOut();

  if (error) alert(error.message);
  else alert("Du är utloggad!");
}

