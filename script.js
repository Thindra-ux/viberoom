
const SUPABASE_URL = "https://dmuomeeuriqlayyuwrim.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_MSdBBcMSPa8a6g3cTPFEWw_uUOOeigD";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

document.addEventListener("DOMContentLoaded", () => {
  const signupButton = document.getElementById("signup-btn");
  const loginButton = document.getElementById("login-btn");

  if (!signupButton || !loginButton) {
    console.error("Registreringsknapparna hittades inte.");
    return;
  }

  signupButton.addEventListener("click", async () => {
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!username || !email || !password) {
      alert("Fyll i alla fält!");
      return;
    }

    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password
    });

    if (error) {
      alert(error.message);
      return;
    }

    if (data.session && data.user) {
      const { error: profileError } = await supabaseClient
        .from("profiles")
        .insert({
          user_id: data.user.id,
          username: username
        });

      if (profileError) {
        alert(profileError.message);
        return;
      }
    }

    alert("Kontot har skapats! Kontrollera din e-post.");
  });

  loginButton.addEventListener("click", async () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Fyll i e-post och lösenord!");
      return;
    }

    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert(error.message);
      return;
    }

    window.location.href = "home.html";
  });
});
