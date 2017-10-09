const REGISTRO_HEADER = "0";
const REGISTRO_DETALHE = "7";

class BancoDoBrasil {
    constructor(fileContent) {
        this.linhas = fileContent.split('\n');
        this.campos = [];
        this.deserialize();
    }

    deserialize() {
        this.linhas.forEach(function(linha) {
            let tipoDeRegistro = linha.substring(0,1);
            switch (tipoDeRegistro) {
                case REGISTRO_HEADER:
                    this.campos.push(new Campo("Identificação do Registro Header", linha.substring(0, 1)));
                    this.campos.push(new Campo("Tipo de Operação", linha.substring(1, 2)));
                    this.campos.push(new Campo("Identificação Tipo de Operação", linha.substring(2, 9)));
                    this.campos.push(new Campo("Identificação do Tipo de Serviço", linha.substring(9, 11)));
                    this.campos.push(new Campo("Identificação por Extenso do Tipo de Serviço", linha.substring(11, 19)));
                    this.campos.push(new Campo("Complemento do Registro", linha.substring(19, 26)));
                    this.campos.push(new Campo("Prefixo da Agência", linha.substring(26, 30)));
                    this.campos.push(new Campo("Dígito Verificador - D.V. - do Prefixo da Agência", linha.substring(30, 31)));
                    this.campos.push(new Campo("Número da Conta Corrente", linha.substring(31, 39)));
                    this.campos.push(new Campo("Dígito Verificador - D.V. - da Conta Corrente do Cedente", linha.substring(39, 40)));
                    this.campos.push(new Campo("Zeros", linha.substring(30, 46)));
                    this.campos.push(new Campo("Nome do Cedente", linha.substring(46, 76)));
                    this.campos.push(new Campo("001BANCODOBRASIL", linha.substring(76, 94)));
                    this.campos.push(new Campo("Data da Gravação", linha.substring(94, 100)));
                    this.campos.push(new Campo("Seqüencial do Retorno", linha.substring(100, 107)));
                    this.campos.push(new Campo("Complemento do Registro: “Brancos”", linha.substring(107, 149)));
                    this.campos.push(new Campo("Número de convênio", linha.substring(149, 156)));
                    this.campos.push(new Campo("Complemento do Registro: “Brancos”", linha.substring(156, 394)));
                    this.campos.push(new Campo("Nr. Seqüencial do registro", linha.substring(394, 400)));
                    this.campos.push(new Campo("separator", "separator"));
                    break;
                case REGISTRO_DETALHE:
                    this.campos.push(new Campo("Identificação do Registro Detalhe", linha.substring(0, 1)));
                    this.campos.push(new Campo("Zeros", linha.substring(1, 3)));
                    this.campos.push(new Campo("Zeros", linha.substring(3, 17)));
                    this.campos.push(new Campo("Prefixo da Agência", linha.substring(17, 21)));
                    this.campos.push(new Campo("Dígito Verificador - D.V. - do Prefixo da Agência", linha.substring(21, 22)));
                    this.campos.push(new Campo("Número da Conta Corrente do Cedente", linha.substring(22, 30)));
                    this.campos.push(new Campo("Dígito Verificador - D.V. - do Número da Conta Corrente do Cedente", linha.substring(30, 31)));
                    this.campos.push(new Campo("Número do Convênio de Cobrança do Cedente", linha.substring(31, 38)));
                    this.campos.push(new Campo("Número de Controle do Participante", linha.substring(38, 63)));
                    this.campos.push(new Campo("Nosso-Número", linha.substring(63, 80)));
                    this.campos.push(new Campo("Tipo de cobrança", linha.substring(80, 81)));
                    this.campos.push(new Campo("Tipo de cobrança específico para comando 72", linha.substring(81, 82)));
                    this.campos.push(new Campo("Dias para cálculo", linha.substring(82, 86)));
                    this.campos.push(new Campo("Natureza do recebimento", linha.substring(86, 88)));
                    this.campos.push(new Campo("Prefixo do Título", linha.substring(88, 91)));
                    this.campos.push(new Campo("Variação da Carteira", linha.substring(91, 94)));
                    this.campos.push(new Campo("Conta Caução", linha.substring(94, 95)));
                    this.campos.push(new Campo("Taxa para desconto", linha.substring(95, 100)));
                    this.campos.push(new Campo("Taxa IOF", linha.substring(100, 105)));
                    this.campos.push(new Campo("Branco", linha.substring(105, 106)));
                    this.campos.push(new Campo("Carteira", linha.substring(106, 108)));
                    this.campos.push(new Campo("Comando", linha.substring(108, 110)));
                    this.campos.push(new Campo("Data de liquidação (DDMMAA)", linha.substring(110, 116)));
                    this.campos.push(new Campo("Número do título dado pelo cedente", linha.substring(116, 126)));
                    this.campos.push(new Campo("Brancos", linha.substring(126, 146)));
                    this.campos.push(new Campo("Data de vencimento (DDMMAA)", linha.substring(146, 152)));
                    this.campos.push(new Campo("Valor do título", linha.substring(152, 165)));
                    this.campos.push(new Campo("Código do banco recebedor", linha.substring(165, 168)));
                    this.campos.push(new Campo("Prefixo da agência recebedora", linha.substring(168, 172)));
                    this.campos.push(new Campo("DV prefixo recebedora", linha.substring(172, 173)));
                    this.campos.push(new Campo("Espécie do título", linha.substring(173, 175)));
                    this.campos.push(new Campo("Data do crédito (DDMMAA)", linha.substring(176, 181)));
                    this.campos.push(new Campo("Valor da tarifa", linha.substring(181, 188)));
                    this.campos.push(new Campo("Outras despesas", linha.substring(188, 201)));
                    this.campos.push(new Campo("Juros do desconto", linha.substring(201, 214)));
                    this.campos.push(new Campo("IOF do desconto", linha.substring(214, 227)));
                    this.campos.push(new Campo("Valor do abatimento", linha.substring(227, 240)));
                    this.campos.push(new Campo("Desconto concedido (diferença entre valor do título e valor recebido)", linha.substring(240, 253)));
                    this.campos.push(new Campo("Valor recebido (valor recebido parcial)", linha.substring(253, 266)));
                    this.campos.push(new Campo("Juros de mora", linha.substring(266, 279)));
                    this.campos.push(new Campo("Outros recebimentos", linha.substring(270, 292)));
                    this.campos.push(new Campo("Abatimento não aproveitado pelo sacado", linha.substring(292, 305)));
                    this.campos.push(new Campo("Valor do lançamento", linha.substring(305, 318)));
                    this.campos.push(new Campo("Indicativo de débito/crédito", linha.substring(318, 319)));
                    this.campos.push(new Campo("Indicador de valor", linha.substring(319, 320)));
                    this.campos.push(new Campo("Valor do ajuste", linha.substring(320, 332)));
                    this.campos.push(new Campo("Brancos", linha.substring(332, 333)));
                    this.campos.push(new Campo("Brancos", linha.substring(333, 342)));
                    this.campos.push(new Campo("Zeros", linha.substring(342, 390)));
                    this.campos.push(new Campo("Indicativo de Autorização de Liquidação Parcial", linha.substring(390, 391)));
                    this.campos.push(new Campo("Branco", linha.substring(391, 392)));
                    this.campos.push(new Campo("Canal de pagamento do título utilizado pelo sacado/Meio de Apresentação do Título ao Sacado", linha.substring(392, 394)));
                    this.campos.push(new Campo("Seqüencial do registro", linha.substring(394, 400)));
                    this.campos.push(new Campo("separator", "separator"));
                    break;
                default:
                    break;
            }
        }, this);
    }
}

class Campo {
    constructor(nome, conteudo) {
        this.nome = nome;
        this.conteudo = conteudo;
    }
}
