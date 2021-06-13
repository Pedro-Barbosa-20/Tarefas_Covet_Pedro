//-----------------------------------------------------------------//

const tarefa = document.querySelector('.tarefa');
const tarefaButton = document.querySelector('.tarefa-button');
const listTarefa = document.querySelector('.list-tarefa');
const filtroTarefa = document.querySelector('.filtro-tarefa')

//-----------------------------------------------------------------//
if( document.readyState !== 'loading' ) {
    getTarefas();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        getTarefas();
    });
}
tarefaButton.addEventListener('click', addTarefa);
listTarefa.addEventListener('click', deleteCheck);
filtroTarefa.addEventListener('click', filterTarefa)


//-----------------------------------------------------------------//

function addTarefa(event){
    event.preventDefault();
    
    const tarefaDiv = document.createElement("div");
    tarefaDiv.classList.add("tarefa");

    const novaTarefa = document.createElement('li');
    novaTarefa.innerText = tarefa.value;
    novaTarefa.classList.add('tarefa-item');
    tarefaDiv.appendChild(novaTarefa);

    saveLocalTarefas(tarefa.value);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    tarefaDiv.appendChild(completedButton);

    const removeButton = document.createElement('button');
    removeButton.innerHTML = '<i class="fas fa-trash"></i>';
    removeButton.classList.add("remove-btn");
    tarefaDiv.appendChild(removeButton);

    listTarefa.appendChild(tarefaDiv)

    tarefa.value = "";
}


function deleteCheck(event){

   const item = event.target;

   if(item.classList[0] === "remove-btn"){
       const tarefa = item.parentElement;
       tarefa.classList.add("fall")
       removeLocalTarefas(tarefa)
       tarefa.addEventListener('transitioned', function(){
           tarefa.remove();
       })
   }

   if(item.classList[0] === "complete-btn"){
    const tarefa = item.parentElement;
    tarefa.classList.toggle('completed');
    completasTarefas(tarefa);
    }

}

function filterTarefa(event){
    
    const tarefas = listTarefa.childNodes;
    tarefas.forEach(function(tarefa){
        switch(event.target.value){
            case "todas":
                tarefa.style.display = "flex";
                break;
            case "completed":
                if(tarefa.classList.contains("completed")){
                tarefa.style.display = "flex";
                }else{
                    tarefa.style.display = "none";  
                }
                break;
            case "incompletas":
                if(!tarefa.classList.contains("completed")){
                    tarefa.style.display = "flex";
                    }else{
                        tarefa.style.display = "none";  
                    }
                break;

        }
    })
}

function saveLocalTarefas(tarefa){

    let tarefas;
    if(localStorage.getItem("tarefas") === null){
        tarefas = [];
    }else{
        tarefas = JSON.parse(localStorage.getItem("tarefas"))
    }

    let data = {
        tarefa: tarefa,
        status: "incompletas"
    };

    tarefas.push(data);
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
}

function removeLocalTarefas(tarefa){

    let tarefas;
    if(localStorage.getItem('tarefas') === null){
        tarefas = [];
    }else{
        tarefas = JSON.parse(localStorage.getItem('tarefas'))
    }
    const tarefaIndex = tarefa.children[0].innerText;
    let index = tarefas.findIndex(obj => obj.tarefa==tarefaIndex);
    tarefas.splice(index, 1);

    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

function getTarefas(){


    let tarefas;
    if(localStorage.getItem("tarefas") === null){
        tarefas = [];
    }else{
        tarefas = JSON.parse(localStorage.getItem("tarefas"))
    }
   
    tarefas.forEach(function(tarefa){

    const tarefaDiv = document.createElement("div");
    tarefaDiv.classList.add("tarefa");

    const novaTarefa = document.createElement('li');
    novaTarefa.innerText = tarefa["tarefa"];
    novaTarefa.classList.add('tarefa-item');
    tarefaDiv.appendChild(novaTarefa);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    tarefaDiv.appendChild(completedButton);

    const removeButton = document.createElement('button');
    removeButton.innerHTML = '<i class="fas fa-trash"></i>';
    removeButton.classList.add("remove-btn");
    tarefaDiv.appendChild(removeButton);

    listTarefa.appendChild(tarefaDiv);
    let status = tarefa.status;
    if(status === "completed") {
        tarefaDiv.classList.toggle("completed");
        console.log(status);
    }
    });
}

function completasTarefas(tarefa) {
    let tarefas;
    if(localStorage.getItem('tarefas') === null) {
        tarefas = [];
    }
    else {
        tarefas = JSON.parse(localStorage.getItem('tarefas'));
    }
    const tarefaIndex = tarefa.children[0].innerText;
    let index = tarefas.findIndex(obj => obj.tarefa==tarefaIndex);
    if(tarefas[index].status === "incompletas") {
        tarefas[index].status = "completed";
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }
    else {
        tarefas[index].status = "incompletas";
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }
}