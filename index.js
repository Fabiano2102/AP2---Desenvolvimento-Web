document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const inputSenha = document.querySelector("input[type='password']");
    const btnEntrar = document.querySelector("button");

    btnEntrar.addEventListener("click", function () {
      const senhaDigitada = inputSenha.value;

      // Exemplo simples para verificar a senha digitada
      if (senhaDigitada === "Senh@") {
        window.location.href = "elenco_completo.html";
      } else {
        alert("Senha incorreta. Tente novamente.");
      }
    });
  });

