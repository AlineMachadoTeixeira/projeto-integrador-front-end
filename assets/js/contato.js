const celular = document.querySelector("#tel");

$(celular).mask("(00) 00000-0000");

var form = document.getElementById("form");
    
    async function handleSubmit(event) {
      event.preventDefault();
      var status = document.getElementById("status");
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          status.innerHTML = "Obrigado pela mensagem!";
          form.reset()
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
              status.innerHTML = "Oops! Algo de errado não está certo."
            }
          })
        }
      }).catch(error => {
        status.innerHTML = "Oops! Algo de errado não está certo."
      });
    }
    form.addEventListener("submit", handleSubmit)