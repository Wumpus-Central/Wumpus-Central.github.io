function pageUnderConstruction() {
  const pageMount = document.getElementById("page-mount");

  const underConstruction = document.createElement("div");
  underConstruction.style.backgroundColor = "#f0f2f5";
  underConstruction.style.border = "1px solid #ccc";
  underConstruction.style.borderRadius = "5px";
  underConstruction.style.padding = "20px";
  underConstruction.style.fontFamily = "sans-serif";
  underConstruction.style.margin = "20px";

  const cardHeader = document.createElement("div");
  cardHeader.style.backgroundColor = "#232629";
  cardHeader.style.color = "#fff";
  cardHeader.style.padding = "10px";
  cardHeader.style.borderRadius = "5px 5px 0 0";

  const header = document.createElement("h1");
  header.textContent = "The maze isn't meant for you";

  cardHeader.appendChild(header);
  underConstruction.appendChild(cardHeader);

  const description = document.createElement("p");
  description.textContent = "Service Work In Progress - come back later!";

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