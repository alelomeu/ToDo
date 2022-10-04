const body = document.querySelector("body")


const dateToday = ()  => {
    const dateP = document.querySelector("#date-today")
    const date = new Date()
    dateP.innerText = date.toLocaleDateString()
}
dateToday()

const taskCard = (task, categoryName) => {
    const {name, date} = task

    const li = document.createElement('li')
    li.classList = "task flex"

    const containerName = document.createElement('div')
    containerName.classList = "task-name flex"

    const checkbox = document.createElement('input')
    checkbox.type = "checkbox"

    checkbox.addEventListener("click", () =>   {
        taskName.classList.toggle("line-through")
        dateCreated.classList.toggle("line-through")
    })

    const taskName = document.createElement('p')
    taskName.innerText = name
    taskName.classList = "teste"

    containerName.append(checkbox, taskName)

    const infoTask = document.createElement('div')
    infoTask.classList = "info-task flex"

    const dateCreated = document.createElement('p')
    dateCreated.innerText = date

    const trashButton = document.createElement('button')
    trashButton.classList = "trash-button"
    trashButton.type = "button"

    trashButton.addEventListener('click', () => {
        const findCategory = categoryList.find(({name}) =>{
            return name === categoryName
        })
         const idTask = findCategory.tasks.indexOf(task)

         findCategory.tasks.splice(idTask,1)

         li.remove()

        })

    infoTask.append (dateCreated, trashButton)

    li.append(containerName,infoTask)

    return li
}

const renderCards = (categories) => {
    const taskContainer = document.querySelectorAll(".task-container")
        

    taskContainer.forEach((container) => {
        container.innerHTML = ""

        categories.forEach((category) =>{
            if (category.name.toLowerCase() === container.id){

                category.tasks.forEach((task) => {
                    const card = taskCard(task, category.name)
                    container.appendChild(card)
                })

            }
        })
       
    })   
  
}

const categoryCard = (cartegory) =>{
    const {name} = cartegory


    const section = document.createElement('section')
    section.classList = "category"

    const containerCategory = document.createElement('div')
    containerCategory.classList = "container-category flex align-content-center justify-between"

    const h2 = document.createElement('h2')
    h2.innerText = name

    const buttonCreateTask = document.createElement('button')
    buttonCreateTask.classList = "create-task open_modal"
    buttonCreateTask.id = `btn-${name.toLowerCase()}`
    buttonCreateTask.innerText = "+"

    containerCategory.append(h2,buttonCreateTask)

    const ul = document.createElement('ul')
    ul.classList = "task-container"
    ul.id = name.toLowerCase()

    section.append (containerCategory,ul)

    return section

}

const renderCategories = (categoryList) => {
const allCategories = document.querySelector("#main-category")
    allCategories.innerHTML = ""

    categoryList.forEach((category) => {
        const card = categoryCard(category)
        
        allCategories.appendChild(card)
        
    })
    renderCards(categoryList)
    addEventModalOpen()
}


//Modal

const createModal = (form) => {

    const modal = document.createElement('section');
    modal.id = "modal"

    const modalContainer = document.createElement('div');
    modalContainer.id = "modal-container"

    const closeModal = document.createElement('div');
    closeModal.id = "close-modal"

    const buttonCloseModal = document.createElement('button');
    buttonCloseModal.type = "button";
    buttonCloseModal.id = "close-modal-button";
    buttonCloseModal.innerText = "X"


    closeModal.appendChild(buttonCloseModal);
    modalContainer.appendChild(closeModal, form);
    modal.appendChild(modalContainer)

    return modal
}

const createCategoryForm = () => {
    const container = document.createElement("div")
    container.id = "container_create_category"
       
    
     container.insertAdjacentHTML("afterbegin", `
        <h2> Nova categoria</h2>
        <form class = "inputs_container" id = "form_category"> 
            <input type = "text" placeholder = "Nome da categoria">
            <button type="submit" id = "button_create_category_modal"> Criar </button>
        </form>
    `) 

    return container
} 


const createTaskForm = (btnId) => {
    const container = document.createElement("div")
    container.id = "container_create_task"
       
    
     container.insertAdjacentHTML("afterbegin", `
        <h2> Nova tarefa</h2>
        <form class = "inputs_container ${btnId}" id = "form_task"> 
            <input type = "text" placeholder = "Tarefa">
            <button type="submit" id = "button_create_task_modal"> Criar </button>
        </form>
    `) 

    return container
} 

const addEventModalOpen = () => {
    const buttonsOpen = document.querySelectorAll(".open_modal")

    buttonsOpen.forEach((button) =>{
            button.addEventListener("click",() => {
                const classButton = [...button.classList]

                if (classButton.includes("create-task")) {
                    body.appendChild(createModal())
                    const modalContainer = document.querySelector("#modal-container")
                    modalContainer.appendChild(createTaskForm(button.id))
                    createNewTask ()
                } else {
                    body.appendChild(createModal())
                    const modalContainer = document.querySelector("#modal-container")
                    modalContainer.appendChild(createCategoryForm())
                    creatNewCategory() 
                }
                addEventModalClose() 
            })
        })
              
}



const addEventModalClose = () => {
    const buttonClose = document.querySelector("#close-modal-button") 

    buttonClose.addEventListener("click", () => {
        const modal = document.querySelector("#modal")
        modal.remove()
    })


 }

 renderCategories(categoryList)


 const creatNewCategory = () => {
    const modal = document.querySelector("#modal")
    const form = document.querySelector("#form_category")

    form.addEventListener("submit", (event) => {
        event.preventDefault()
        const elements = form.elements

        let creatNewCategory = {
            name: elements[0].value,
            tasks: []
        }

        categoryList.push(creatNewCategory)
        renderCategories(categoryList)
        modal.remove()

    })
 }


 const createNewTask = () => {
    const modal = document.querySelector('#modal')
    const form = document.querySelector("#form_task")

    form.addEventListener("submit", (event) => {
        event.preventDefault()
        const elements = form.elements

        const categoryClass = form.classList[1].slice(4)
        console.log (categoryClass)

        const findCategory = categoryList.find((category) => category.name.toLocaleLowerCase() === categoryClass)
        console.log (findCategory)

        const dateTask = new Date()

        let createNewTask = {
            name: elements[0].value,
            date: `${dateTask.toLocaleDateString()} ${dateTask.toLocaleTimeString()}`
        }

        findCategory.tasks.push(createNewTask)

        renderCards(categoryList)
        modal.remove()

    })
 }
