
document.querySelector("form").addEventListener("submit", event => {

    event.preventDefault();
    
    console.log(document);

    // const { value } = document.querySelector("input");
    const description = event.target["todo"].value
    const  comp  = event.target["comp"].value


    debugger;

    const todo = {
        description,
        complement: comp
    }

    // console.log(value);
    api.send("todo:add", todo)

})