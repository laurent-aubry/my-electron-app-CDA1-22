
document.querySelector("form").addEventListener("submit", event => {

    event.preventDefault();
    
    // const { value } = document.querySelector("input");
    const description = event.target["todo"].value
    const  comp  = event.target["comp"].value
    const  echeance  = event.target["echeance"].value
    const  responsibleFor  = event.target["affectea"].value


    debugger;

    const task = {
        description,
        complement: comp,
        echeance,
        responsibleFor
    }

    // console.log(value);
    api.send("todo:add", task)

})