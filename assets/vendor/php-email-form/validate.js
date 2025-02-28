document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("soul-chat");
  const button = document.getElementById("soulChatButton");
  const loadingDiv = document.querySelector(".loading");
  const errorDiv = document.querySelector(".error-message");
  const successDiv = document.querySelector(".sent-message");

  button.addEventListener("click", async (event) => {
    event.preventDefault(); // Evita el envío por defecto del formulario

    // Limpia los mensajes anteriores
    loadingDiv.style.display = "none";
    errorDiv.style.display = "none";
    successDiv.style.display = "none";

    // Obtén el valor del input
    const preguntaInput = form.querySelector('input[name="pregunta"]');
    const pregunta = preguntaInput.value.trim();

    if (!pregunta) {
      errorDiv.style.display = "block";
      errorDiv.textContent = "Por favor, escribe una pregunta.";
      return;
    }

    try {
      // Muestra el estado de carga
      loadingDiv.style.display = "block";

      // Envía la solicitud POST al endpoint
      const response = await fetch("https://prismaapi-zqbr.onrender.com/chat/hugging/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: pregunta }),
      });

      // Procesa la respuesta
      if (response.ok) {
        const data = await response.json();
        successDiv.style.display = "block";
        successDiv.textContent = ` ${data.mensaje || "Procesado con éxito."}`;
      } else {
        const errorData = await response.json();
        errorDiv.style.display = "block";
        errorDiv.textContent = `Error: ${errorData.mensaje || "No se pudo procesar la solicitud."}`;
      }
    } catch (error) {
      errorDiv.style.display = "block";
      errorDiv.textContent = "Error inesperado";
    } finally {
      loadingDiv.style.display = "none"; // Oculta el estado de carga
    }
  });
});