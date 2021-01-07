var myVar;

function myFunction() {
    myVar = setTimeout(showPage, 500);
}

function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
}

function slowopen() {
    document.getElementById("myDiv").style.display = "block";
}

function btnchange(btnid) {
    document.getElementById(btnid).style.backgroundColor = "goldenrod"
}

function gotoinicio() {
    location.replace("../html/index.html")
}

function gotocadastro() {
    location.replace("../html/cadastro.html")
}

function gotobaixa() {
    location.replace("../html/baixa.html")
}

function gotoconsulta() {
    location.replace("../html/consulta.html")
}

function gotorelatorio() {
    location.replace("../html/relatorio.html")
}

function ShowPanelIntro() {
    var x = document.getElementById("DataGeral");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function starpanel() {
    var x = document.getElementById("DataGeral");
    x.style.display = "none"
}

async function startCad() {
    let cod = await eel.GenerateCod()();
    document.getElementById("Codigo").disabled = true;
    document.getElementById("Codigo").value = cod;
}

function startBxa() {
    nome = document.getElementById("Nome").disabled = true;
    custo = document.getElementById("Custo").disabled = true;
    venda = document.getElementById("Venda").disabled = true;
    fornecedor = document.getElementById("Fornecedor").disabled = true;
    NNF = document.getElementById("NF").disabled = true;
}

async function getGeneralQuantite() {
    let retorno = await eel.qtdProductsProducts()();
    if (retorno == "") {
        document.getElementById("TextoTotalProducts").innerHTML = "Error"
    } else {
        document.getElementById("TextoTotalProducts").innerHTML = retorno
    }

}

async function getGeneralValue() {
    let retorno = await eel.qtdValueProducts()();
    if (retorno == "") {
        document.getElementById("TextoTotalValue").innerHTML = "Error"
    } else {
        document.getElementById("TextoTotalValue").innerHTML = "R$ " + retorno
    }

}

async function getCadastro() {

    var codigo, nome, custo, venda, quantidade, fornecedor, NNF, data_cadastro, dia, mes, ano;

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    codigo = document.getElementById("Codigo").value
    nome = document.getElementById("Nome").value
    custo = document.getElementById("Custo").value
    venda = document.getElementById("Venda").value
    quantidade = document.getElementById("Quantidade").value
    fornecedor = document.getElementById("Fornecedor").value
    NNF = document.getElementById("NF").value
    data_cadastro = document.getElementById("Data").value

    if (nome != "" || custo != "" || venda != "" || quantidade != "" || fornecedor != "" || NNF != "" || data_cadastro != "") {
        let result = await eel.insertProdutos(codigo, nome, custo, venda, quantidade, fornecedor, NNF, data_cadastro, today, "Cadastrou Produto")();
        alert("Produto " + codigo + " Cadastrado com Sucesso!!");
        gotocadastro()
    } else {
        alert("Por Favor Preencha Todos os Campos")
    }
}

async function busca() {
    var cod = document.getElementById("Codigo").value

    if (cod.length > 3) {

        let infos = await eel.selectTable('produtos', cod)();

        nome = document.getElementById("Nome").value = infos[1];
        custo = document.getElementById("Custo").value = infos[2];
        venda = document.getElementById("Venda").value = infos[3];
        //qtd = document.getElementById("Quantidade").value = infos[4];
        qtd = document.getElementById("Quantidade").value = 1;
        forn = document.getElementById("Fornecedor").value = infos[5];
        nf = document.getElementById("NF").value = infos[6];
    } else {
        nome = document.getElementById("Nome").value = "";
        custo = document.getElementById("Custo").value = "";
        venda = document.getElementById("Venda").value = "";
        qtd = document.getElementById("Quantidade").value = "";
        forn = document.getElementById("Fornecedor").value = "";
        nf = document.getElementById("NF").value = "";
    }

}

async function baixar() {
    var qtd = document.getElementById("Quantidade").value;
    var cod = document.getElementById("Codigo").value;
    var nome = document.getElementById("Nome").value;
    var venda = document.getElementById("Venda").value;

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    let result = await eel.BaixaProduto(qtd, cod, nome, venda, today)();

    if (result[0] == "OK") {
        alert('Foram baixados "' + qtd + '" produto(s), agora restam "' + result[1] + '" no estoque');
    } else {
        alert('Você não possuí itens suficientes no estoque para dar baixa')
    }

}

async function PopulateConsulta() {
    const t = document.createElement('table')
    const data = {
        "headings": [
            "Codigo",
            "Nome",
            "Valor de Custo",
            "Valor de Venda",
            "Quantidade",
            "Fornecedor",
            "Numero Nota Fiscal",
            "Data Cadastro",
            "Data Alteração",
            "Descrição Alteração"
        ],
        "data": []
    }

    // Make a request for a user with a given ID
    data.data = await eel.selectTableArray('produtos')()
    document.getElementById("myDiv").appendChild(t)

    window.dt = new simpleDatatables.DataTable(t, {
        data,
        columns: [{
            select: 6,
            type: "date",
            format: "DD/MM/YYYY"
        }]
    })
}

async function AlterarTabela() {
    var codigo, nome, custo, venda, quantidade, fornecedor, NNF;

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    codigo = document.getElementById("Codigo").value
    nome = document.getElementById("Nome").value
    custo = document.getElementById("Custo").value
    venda = document.getElementById("Venda").value
    quantidade = document.getElementById("Quantidade").value
    fornecedor = document.getElementById("Fornecedor").value
    NNF = document.getElementById("NF").value

    await eel.alterTable('produtos', 'nome', nome, codigo)();
    await eel.alterTable('produtos', 'custo', custo, codigo)();
    await eel.alterTable('produtos', 'venda', venda, codigo)();
    await eel.alterTable('produtos', 'quantidade', quantidade, codigo)();
    await eel.alterTable('produtos', 'fornecedor', fornecedor, codigo)();
    await eel.alterTable('produtos', 'NNF', NNF, codigo)();
    await eel.alterTable('produtos', 'data_alteracao', today, codigo)();
    await eel.alterTable('produtos', 'alteracao', 'Atualizou os dados Cadastrados', codigo)();

    alert("Item Alterado Com Sucesso!!")

    document.location.reload(true);
}

async function deleteTable() {
    var codigo, nome, custo, venda, quantidade, fornecedor, NNF;

    codigo = document.getElementById("Codigo").value

    await eel.deleteTable('produtos', codigo)();

    alert("Item Deletado Com Sucesso!!")

    document.location.reload(true);
}

async function gerRelProd() {
    let res = await eel.exportRelProdutos()();

    alert(res);

    document.location.reload(true);
}

async function gerRelVend() {
    let res = await eel.exportRelVendas()();

    alert(res);

    document.location.reload(true);
}