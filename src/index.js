const createBtn = document.querySelector('.create__post');
const inputTitle = document.querySelector('.input-title');
const inputText = document.querySelector('.input-text');
const posts = document.querySelector('.all-post');

const updateTitle = document.querySelector('.update-title');
const updateText = document.querySelector('.update-text');
const updateBtn = document.querySelector('.update__post');


const deletePost = document.querySelector('.modal-delete');
const updatePost = document.querySelector('.modal-update');
const createPost = document.querySelector('.modal-create');
const updatePostCancel = document.querySelector('.update__post-cancel');
const updateCrossBtn = document.querySelector('.updateCrossBtn');

const createCrossBtn = document.querySelector('.createCrossBtn');
const createPostCancel = document.querySelector('.create__post-cancel');
const cancelCrossBtn = document.querySelector('.cancelCrossBtn');
const cancelBtn = document.querySelector(".cancelBtn");
const deleteBtn = document.querySelector('.deleteBtn');

const openCreateModal = document.querySelector('.openCreateModal');



let tasksArr;
let postElems = [];
!localStorage.tasks ? tasksArr = [] : tasksArr = JSON.parse(localStorage.getItem('tasks'));

function createModalPost () {
    createPost.classList.toggle("show-modal");
};

function deleteModalPost () {
    deletePost.classList.toggle("show-modal");
};

function updateModalPost () {
    updatePost.classList.toggle("show-modal");
};

cancelCrossBtn.addEventListener("click", deleteModalPost);
cancelBtn.addEventListener("click", deleteModalPost);

updatePostCancel.addEventListener('click', updateModalPost);
updateCrossBtn.addEventListener('click', updateModalPost);

openCreateModal.addEventListener('click', createModalPost);
createPostCancel.addEventListener('click', createModalPost);
createCrossBtn.addEventListener('click', createModalPost);

function clearInputs (){
    inputTitle.value = '';
    inputText.value = '';
};

function clearInputsUp(){
    updateTitle.value = '';
    updateText.value = '';
}

function Task(title, text){
    this.title = title;
    this.text = text;
    this.compleated = false;
};

const createTemplate = (task, index) => {
    return `<div class="posts">
                <h1 class="title ${task.compleated ? 'checked' : ''}">${task.title}</h1>
                <p class="post__text">${task.text}</p>
                <p onclick='updateTask(${index})' class="post__update">Изменить</p>
                <input onclick='completeTask(${index})' type="checkbox" name="checkbox" id="checkbox" class='checkbox' ${task.compleated ? 'checked' : ''}>
                <button onclick='deleteTask(${index})' class="post__delete"></button>
            </div>`
};



const fillHtmlList = () => {
    posts.innerHTML = '';
    if(tasksArr.length > 0){
        tasksArr.forEach((item, index) => {
            posts.innerHTML += createTemplate(item, index);
        });
        titleElems = document.querySelectorAll('.title');
        postElems = document.querySelectorAll('.posts');
    };
};

fillHtmlList();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasksArr));
};


const completeTask = (index) => {
    tasksArr[index].compleated = !tasksArr[index].compleated;
    if(tasksArr[index].compleated === true){
        titleElems[index].classList.add('checked');
    }else{
        titleElems[index].classList.remove('checked');
    };
    updateLocal();
    fillHtmlList();
};


createBtn.addEventListener('click', () => {
    const errorText = document.querySelector('.error-text');
    if(inputTitle.value.length > 3 && inputText.value.length > 3){
        const someTask = new Task(inputTitle.value, inputText.value)
        errorText.innerHTML = '';
        inputTitle.style.border = '1px solid #5F81B2';
        inputText.style.border = '1px solid #5F81B2';
        tasksArr.unshift(someTask);
        updateLocal();
        fillHtmlList();
        clearInputs ();
        createModalPost();

    }else{
        errorText.innerHTML = 'Неверно введены заголовок или текст!';
        inputTitle.style.border = '1px solid red';
        inputText.style.border = '1px solid red';
    };
    
});




const deleteTask = (index) => {
    deleteModalPost ();
        deleteBtn.addEventListener('click', () => {
            // setTimeout(() => {
                tasksArr.splice(index, 1);
                updateLocal();
                fillHtmlList();
                location.reload();
                
            // }, 1000);
            postElems[index].classList.add('deleted');
            deleteModalPost ();
            deletePost.classList.remove("show-modal");
        });
};



const updateTask = (index) => {
    updateModalPost();
    updateTitle.value = tasksArr[index].title;
    updateText.value = tasksArr[index].text;
    updateBtn.addEventListener('click', () => {
        tasksArr[index].title = updateTitle.value;
        tasksArr[index].text = updateText.value;
        updateModalPost();
        updateLocal();
        fillHtmlList();
        updatePost.classList.remove("show-modal");
        clearInputsUp();
        updateTitle.value = tasksArr[index].title;
        updateText.value = tasksArr[index].text;
        index = NaN;
    });
};