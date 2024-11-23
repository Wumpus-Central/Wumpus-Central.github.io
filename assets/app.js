function pageUnderConstruction(){
    const pageMount = document.getElementById("page-mount");

    const underConstruction = document.createElement("div");
    const header = document.createElement("h1");
    const description = document.createElement("p");

    underConstruction.style.paddingLeft = "20px";
    underConstruction.style.paddingTop = "20px";

    header.style.margin = 0;
    header.textContent = `The maze isn't meant for you`;
    
    description.textContent = "Service Work In Progress - come back later!"
    
    underConstruction.appendChild(header);
    underConstruction.appendChild(description);

    pageMount.appendChild(underConstruction);
}

async function buildList(kind) {
    const pageMount = document.getElementById("page-mount");

    const response = await fetch('../../experiments-archive/data/experiments.json');
    const experiments = (await response.json()).reverse();

    const listContainer = document.createElement("div");
    listContainer.className = "experimentsListContainer";

    const ul = document.createElement("ul");

    experiments
        .filter(({ kind: experimentKind }) => experimentKind === kind)
        .forEach(({ id }) => {
            const li = document.createElement("li");
            li.className = "experimentsListItem";
            li.textContent = id;
            li.onclick = () => openExperiment(id);
            ul.appendChild(li);
        });

    listContainer.appendChild(ul);
    pageMount.appendChild(listContainer);
}

function openExperiment(exp_id){
    alert(exp_id)
    /*
        TODO
    */
   return;
}