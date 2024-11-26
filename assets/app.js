/*
    UTILS
*/

function createElementWithClass(tagName, className = "") {
    const element = document.createElement(tagName);

    if (className) {
        element.className = className;
    }

    return element;
}


/*
    CONSTRUCTORS
*/

function pageUnderConstruction(){
    const pageMount = document.getElementById("page-mount");

    const underConstruction = document.createElement("div");
    const header = document.createElement("h1");
    const description = document.createElement("p");

    underConstruction.className = "WIP"
    header.className = "WIPheading"

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
            li.onclick = () => openExperiment(id, kind);
            ul.appendChild(li);
        });

    listContainer.appendChild(ul);
    pageMount.appendChild(listContainer);
}

async function openExperiment(exp_id, exp_kind){
    const pageMount = document.getElementById("page-mount");

    const experimentCard = createElementWithClass("div", "experimentCard");
    const experimentCardHeader = createElementWithClass("div", "experimentCardHeader");
    const experimentCardContent = createElementWithClass("div", "experimentCardContent");

    const fixedExpPath = exp_kind ? `../../experiments-archive/data/${exp_kind}/${exp_id}.json` : `../../experiments-archive/data/${exp_id}.json`;
    const response = await fetch(fixedExpPath);
    let experiment = await response.json();

    const experimentTitle = createElement("div");
    const experimentId = document.createElement("div");

    if(!experiment["label"]){
        experimentTitle.textContent = experiment["id"];
    } else {
        experimentTitle.textContent = experiment["label"];
        experimentId.textContent = experiment["id"];
    }

    experimentCardHeader.appendChild(experimentTitle);

    const experimentKind = document.createElement("div");
    experimentKind.textContent = experiment["kind"];

    experimentCardContent.appendChild(experimentId);
    experimentCardContent.appendChild(experimentKind);

    experimentCard.appendChild(experimentCardHeader);
    experimentCard.appendChild(experimentCardContent);

    pageMount.innerHTML = '';
    pageMount.appendChild(experimentCard);
}