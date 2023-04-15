class Despesas{
    constructor(ano,mes,dia,tipo,descricao,valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }
    validarDados() {
        for (let i in this) {
            if (this[i] == '' || this[i] == null || this[i] == undefined) {
                return false
            } 
            
        }
        return true
    }
}

   /*  for (let i in despesas) {
        let verifica = despesas[i]
        if (verifica =='') {
            console.log('Preencha todos os campos')
        } 
    }*/
    /* banco.gravar(despesas) */



    //persistir dados

class Banco {
    constructor() {
        let id = localStorage.getItem('id')
        console.log(id)
        
        if (id == null) {
            localStorage.setItem('id', 0)
        }
        
    }

    novoId() {
        let key = localStorage.getItem('id')
        return parseInt(key)+1
    }

    gravar(d) {
        let id = this.novoId()
        localStorage.setItem(id, JSON.stringify(d))
        //retorna valor novoId pro banco
        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros(){
        let despesasR = []
        let id = localStorage.getItem('id')
        for(let i = 1; i<= id; i++){
            //Convertendo em objeto
            let despesaR = JSON.parse(localStorage. getItem(i))
            //Verificando se exixste índices que foram pulados/removidos
            //neste caso nás vamos pular esses índices
            if (despesaR === null){
                continue
            }
            //adiciona uma key
            despesaR.id = i
            despesasR.push(despesaR)
        }
        console.log(despesasR) 
        return despesasR
    }
    
    pesquisar(d){
        //array recebe array
        let despesasFiltradas = []
        despesasFiltradas = this.recuperarTodosRegistros()
        /*Como local storage não possui metodos de filtro 
        é necessário fazer isso na lógica recuperando todos os dados
        e depois compara-los*/

        //d = objeto filtro pg consulta
        /* console.log(d)

        //despesasFiltradas = array contendo todos os dados de local Storage
        console.log(despesasFiltradas) */

        //filtros
        //ano
        //f =  parametro da função de callBack que aponta para ano de despesasFiltrada
        if(d.ano != ""){
            despesasFiltradas = despesasFiltradas.filter(f => f.ano == d.ano)
        }

        //mes
        if(d.mes != ""){
            despesasFiltradas = despesasFiltradas.filter(f => f.mes == d.mes)
        }

        //dia
        if(d.dia != ""){
            despesasFiltradas = despesasFiltradas.filter(f => f.dia == d.dia)
        }

        //tipo
        if(d.tipo != ""){
            despesasFiltradas = despesasFiltradas.filter(f => f.tipo == d.tipo)
        }

        //descrição
        if(d.descricao != ""){
            despesasFiltradas = despesasFiltradas.filter(f => f.descricao == d.descricao)
        }

        //valor
        console.log(despesasFiltradas)
        return despesasFiltradas
    }
    remover(i){
        localStorage.removeItem(i)
    }
}
let banco = new Banco()


//função recuperar valor elemento
function cadastraDespesas() {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')
    
    //Modal

    let confModal = document.getElementById('modal');
    let texto = document.getElementById('mensagem');
    let botao = document.getElementById('Botao');
    let tituloModal = document.getElementById('myModalLabel');
      

    
    //Objeto invocado
    let despesas = new Despesas(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )

    if (despesas.validarDados()) {
        banco.gravar(despesas) 
        confModal.classList.remove('text-danger')
        confModal.classList.add('text-success')
        tituloModal.innerHTML = 'Gravado com sucesso!'
        texto.innerHTML = 'Despesas salvas com sucesso'
        botao.className = "btn btn-success"

        $('#modal').modal('show')

        document.getElementById('dia').value = ''
        document.getElementById('mes').value = ''
        document.getElementById('ano').value = ''
        document.getElementById('tipo').value = ''
        document.getElementById('descricao').value = ''
        document.getElementById('valor').value = ''
    }
    else {
        confModal.classList.add('text-danger')
        tituloModal.innerHTML = 'Ocorreu um erro!'
        texto.innerHTML = 'Erro so salvar, verifique todos os campos'
        
        botao.className= "btn btn-danger";
     
        $('#modal').modal('show') 
    }

    
}

//Página Consulta
function CarregaListasDespesas(){
    let despesaCarregada = []
        despesaCarregada = banco.recuperarTodosRegistros()
    listasCaregadas(despesaCarregada)
    
}

function listasCaregadas(d){
        
    /* console.log(despesaCarregada) */
    //apontando pro elemento tBody
    let listaDespesas = document.getElementById('lista')
    if (verifica) {
        listaDespesas.innerHTML = ''
    }

    d.forEach(function(d){
        //cria linha(tr)
        let linha = listaDespesas.insertRow()
        //criar as colunas (td)
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        switch (parseInt(d.tipo)) {
            case 6: d.tipo = 'Casa'
                break;
                case 5: d.tipo = 'Transporte'
                break;
                case 4: d.tipo = 'Saúde'
                break;
                case 3: d.tipo = 'Lazer'
                break;
                case 2: d.tipo = 'Educação'
                break;
                case 1: d.tipo = 'Alimentação'
                break;
        
            default:
                break;
        }
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
        //Criar btn-Exclusão
        let btn = document.createElement("button")
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_btn_${d.id}`
        btn.onclick = function(){
            let id = this.id.replace('id_btn_', '')
            alert(id)
            banco.remover(id)
            window.location.reload()
        }

        linha.insertCell(4).append(btn)

    })
} 
let verifica = false
//Função filtrar pesaquisas
function filtroPesquisa(){
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value
    
    let despesaPesquisada = new Despesas(
        ano,
        mes,
        dia,
        tipo,
        descricao,
        valor
    )
    verifica = true
    let t = banco.pesquisar(despesaPesquisada)
    
    
    listasCaregadas(t)
}





