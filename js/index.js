document.addEventListener("DOMContentLoaded", function(event) {
    const CODIGO_BANCO_BRASIL = "001";

    let inputFile = document.getElementById('cnab400File');
    let warningMessage = document.getElementById('warningMessage');

    clear();

    inputFile.addEventListener('change', function(event) {
        clear();

        let file = inputFile.files[0];

        let fileReader = new FileReader();
        fileReader.onload = function() {
            let banco = null;
            let text = fileReader.result;
            let node = document.getElementById('outputConteudo');
            node.textContent = text;

            let codigoDoBanco = text.substring(76, 79);
            switch (codigoDoBanco) {
                case CODIGO_BANCO_BRASIL:
                    banco = new BancoDoBrasil(text);
                    break;
                default:
                    showWarning(`Ainda não implementamos o banco ${codigoDoBanco}. :( `);
                    break;
            }

            drawTableFor(banco.header.campos, 'tableForHeader', true);


            banco.detalhes.forEach(function(detalhe, index) {
                drawTableFor(detalhe.campos, 'tableForDetalhes', index === 0);
            });

        };

        fileReader.readAsText(file);
    });

    function clear() {
        clearWarningMessage();
        clearTables();
    }

    function clearWarningMessage() {
        warningMessage.style.visibility = "hidden";
        warningMessage.textContent = "";
    }


    function clearTables() {
        let tableForHeader = document.getElementById("tableForHeader");
        tableForHeader.querySelector('thead > tr').innerHTML = "";
        tableForHeader.querySelector('tbody').innerHTML = "";

        let tableForDetalhes = document.getElementById("tableForDetalhes");
        tableForDetalhes.querySelector('thead > tr').innerHTML = "";
        tableForDetalhes.querySelector('tbody').innerHTML = "";
    }

    function showWarning(warningText) {
        warningMessage.textContent = warningText;
        warningMessage.style.visibility = "";
    }


    function drawTableFor(campos, targetTable, drawTh) {
        let target = document.getElementById(targetTable);
        let trThead = target.querySelector('thead > tr');
        let tbody = target.querySelector('tbody');
        let tr = document.createElement("tr");

        campos.forEach(function(campo) {
            if (drawTh) {
                let th = document.createElement("th");
                th.textContent = campo.nome;
                trThead.appendChild(th);
            }

            let td = document.createElement("td");
            let divInputField = document.createElement("div");
            divInputField.classList.add("input-field");
            
            let inputField = document.createElement("input");
            inputField.classList.add("form-control");
            inputField.value = campo.conteudo;

            divInputField.appendChild(inputField);
            td.appendChild(divInputField);
            tr.appendChild(td);
        }, this);

        tbody.appendChild(tr);
    }
});
