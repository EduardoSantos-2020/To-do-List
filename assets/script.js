let Banco = [{ 'tarefa': 'Estudar as 8 horas da manhã', 'Status': true },];

const criandoItem = (Text, indice) => {
    let item = document.createElement('div');
    item.classList.add('Itemcheck');
    item.setAttribute('data-indice', indice)
    let contCheck = document.createElement('label');
    contCheck.classList.add('container-check');
    let inputCheck = document.createElement('input');
    inputCheck.classList.add('check');
    inputCheck.setAttribute('type', 'checkbox');
    inputCheck.setAttribute('data-indice', indice);

    let customCheck = document.createElement('div');
    customCheck.classList.add('checkmark');

    contCheck.append(inputCheck, customCheck);

    let containerText = document.createElement('div');
    containerText.classList.add('container-text');

    let text = document.createElement('p');
    text.classList.add('text-list');
    text.setAttribute('data-indice', indice);
    text.textContent = Text;

    containerText.append(text);

    let button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.classList.add('fa-solid');
    button.classList.add('fa-xmark');
    button.setAttribute('data-indice', indice);

    item.append(contCheck, containerText, button);
    document.getElementById('ItemList').appendChild(item);

}


const limparTela = () => {
    let Tolist = document.getElementById('ItemList');

    while (Tolist.firstChild) {
        Tolist.removeChild(Tolist.lastChild);
    }
}

const atualizandoTela = () => {
    limparTela()
    Banco.forEach((item, indice) => { criandoItem(item.tarefa, indice), marcaCheckbox(item, indice) })
}
const adicionarItemBanco = (evento) => {

    InputTexto = document.querySelector('#input-text');

    if (InputTexto.value > "" && (evento.type === "click" || evento.keyCode === 13|| evento.type ==='touchstart')) {

        Banco.push({ 'tarefa': InputTexto.value, "Status": false });
        InputTexto.value = '';
        InputTexto.placeholder = 'Qual é sua nova tarefa !';

        atualizandoTela();
        focusElement();

        if (window.innerWidth > 992) {
            InputTexto.focus();
        }

    }
    if (evento.keyCode == 32 || evento.type=='touchstart'|| evento.type === "click" && InputTexto.value == '') {
        evento.preventDefault();
        InputTexto.focus();
        InputTexto.placeholder = 'Digite uma Tarefa !';
    }

    if (evento.type === "click" || evento.type=='touchstart' || evento.keyCode == 13 && InputTexto.value == '') {

            InputTexto.focus();
    
        InputTexto.placeholder = 'Digite uma Tarefa !';

    }

    atualizandoTela();
}

const ClickCadaItem = (evento) => {
    if (evento.target.type === 'button') {
        const indiceElement = evento.target.dataset.indice;
        removeItemBanco(indiceElement)

        atualizandoTela()
    }
    else if (evento.target.type === 'checkbox') {
        const checkboxElement = evento.target.dataset.indice;
        verificarCheckbox(checkboxElement)

    }
}

const removeItemBanco = (indice) => {
    Banco.splice(indice, 1)
    atualizandoTela()
}


const verificarCheckbox = (indice) => {
    Banco[indice].Status = Banco[indice].Status == false ? true : false;
    atualizandoTela()
}

const focusElement = () => {

    let item = document.querySelector('#ItemList').lastElementChild;

    item.scrollIntoView({ inline: 'center', behavior: 'smooth', });

}

const marcaCheckbox = (itemBox, i) => {

    let label = document.getElementsByClassName('text-list')[i];
    let checkbox = document.querySelectorAll('.check')[i];

    if (itemBox.Status) {
        checkbox.checked = true;
        label.style.textDecoration = 'line-through';
    } else {
        checkbox.checked = false;
        label.style.textDecoration = 'none';
    }
}

atualizandoTela();
if (window.innerWidth>992) {
    document.querySelector('#btn-enviar').addEventListener('click', adicionarItemBanco);
    document.querySelector('#ItemList').addEventListener('click', ClickCadaItem);
}

document.querySelector('#btn-enviar').addEventListener('touchstart', adicionarItemBanco,false);
document.querySelector('#ItemList').addEventListener('touchstart', ClickCadaItem,false);
document.getElementById('input-text').addEventListener('keypress', adicionarItemBanco);














