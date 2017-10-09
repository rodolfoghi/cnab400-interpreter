document.addEventListener("DOMContentLoaded", function(event) {
    const CODIGO_BANCO_BRASIL = "001";

    let inputFile = document.getElementById('cnab400File');
    let spanFileName = document.getElementsByClassName('file-name')[0];
    let warningMessage = document.getElementById('warningMessage');
    let outuputFields = document.getElementById('outuputFields');

    clearAndHideWarningMessage();

    inputFile.addEventListener('change', function(event) {
        clearAndHideWarningMessage();
        outuputFields.innerHTML = "";

        let file = inputFile.files[0];
        spanFileName.textContent = file.name;

        let fileReader = new FileReader();
        fileReader.onload = function() {
            let banco = null;
            let text = fileReader.result;
            let node = document.getElementById('output');
            node.innerText = text;

            let codigoDoBanco = text.substring(76, 79);
            switch (codigoDoBanco) {
                case CODIGO_BANCO_BRASIL:
                    banco = new BancoDoBrasil(text);
                    break;
                default:
                    showWarning(`Ainda não implementamos o banco ${codigoDoBanco}. :( `);
                    break;
            }

            banco.campos.forEach(function(campo) {
                renderInputFor(campo);
            }, this);
        };

        fileReader.readAsText(file);
    });

    function clearAndHideWarningMessage() {
        warningMessage.style.visibility = "hidden";
        warningMessage.textContent = "";
    }

    function showWarning(warningText) {
        warningMessage.textContent = warningText;
        warningMessage.style.visibility = "";
    }

    function renderInputFor(campo) {
        let content = 
            `<div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">${campo.nome}</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control">
                  <input class="input" type="text" value="${campo.conteudo}">
                </p>
              </div>
            </div>
          </div>`;

        if (campo.nome === "separator") {
            content = "<hr>"
        }

          outuputFields.innerHTML += content;
    }
});
