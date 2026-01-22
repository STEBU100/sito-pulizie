document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contatto-form");
  const risultato = document.getElementById("risultato");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    risultato.textContent = "Invio in corso...";
    risultato.style.color = "black";

    const data = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      telefono: document.getElementById("telefono").value,
      messaggio: document.getElementById("messaggio").value
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/contatti", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error("Errore server");
      }

      risultato.textContent = "✅ Richiesta inviata con successo!";
      risultato.style.color = "green";
      form.reset();

    } catch (err) {
      console.error(err);
      risultato.textContent = "❌ Errore di connessione al server";
      risultato.style.color = "red";
    }
  });
});
