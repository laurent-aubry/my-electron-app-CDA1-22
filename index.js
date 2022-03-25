
const list = document.querySelector('ul');

api.receive('initData', initialData => {
    for (let i = 0; i < initialData[0].length; i++) {
        const li = document.createElement('li');
        const text = document.createTextNode(initialData[0][i].todo);
        li.appendChild(text);
        list.appendChild(li);
      }
})

api.receive('todo:add', todo => {
    console.log("todo : " + todo);
    const li = document.createElement('li');
    const text = document.createTextNode(todo[0].description + " - " + todo[0].complement);

    // debugger;

    li.appendChild(text);
    list.appendChild(li);
});

api.receive('todo:clear', () => {
    list.innerHTML = '';
})