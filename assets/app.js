function pageUnderConstruction() {
  const pageMount = document.getElementById("page-mount");

  const underConstruction = document.createElement("div");
  underConstruction.style.backgroundColor = "#f0f2f5";
  underConstruction.style.border = "1px solid #ccc";
  underConstruction.style.borderRadius = "5px";
  underConstruction.style.padding = "20px";
  underConstruction.style.fontFamily = "sans-serif";
  underConstruction.style.display = "flex";
  underConstruction.style.flexDirection = "column";
  underConstruction.style.alignItems = "center";
  underConstruction.style.justifyContent = "center";

  const header = document.createElement("h1");
  header.textContent = "The maze isn't meant for you";
  header.style.fontSize = "1.5em";
  header.style.marginBottom = "10px";
  header.style.color = "#232629";

  const description = document.createElement("p");
  description.textContent = "Service Work In Progress - come back later!";
  description.style.fontSize = "1em";
  description.style.color = "#66757c";

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