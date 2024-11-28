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

function buildRoute(routeName, args = [], env){
    let prefix;

    if(env == "DEV"){ 
        prefix = "https://wumpus-central.github.io";
    } else {
        const depth = window.location.pathname.split('/').filter(Boolean).length; 
        prefix = depth === 0 ? "./" : "../".repeat(depth);
    } 

    const routes = {
        EXPERIMENTS_COLLECTION:  `/experiments-archive/data/experiments.json`,
        EXPERIMENT_WITH_KIND: `/experiments-archive/data/${args[0]}/${args[1]}.json`,
        EXPERIMENT_NO_KIND: `/experiments-archive/data/${args[0]}.json`
    }

    return `${prefix}${routes[routeName]}`.replace(/([^:]\/)\/+/g, "$1");
}

/*
    CONSTRUCTORS
*/

function pageUnderConstruction(){
    const pageMount = document.getElementById("page-mount");

    const underConstruction = createElementWithClass("div", "WIP");
    const header = createElementWithClass("h1", "WIPheading");
    const description = document.createElement("p");

    header.textContent = `The maze isn't meant for you`;
    description.textContent = "Service Work In Progress - come back later!"

    underConstruction.appendChild(header);
    underConstruction.appendChild(description);

    pageMount.appendChild(underConstruction);
}

async function buildList(kind) {
    const pageMount = document.getElementById("page-mount");

    const response = await fetch(buildRoute("EXPERIMENTS_COLLECTION"));
    const experiments = (await response.json()).reverse();

    const listContainer = createElementWithClass("div", "experimentsListContainer");

    const ul = document.createElement("ul");

    experiments
        .filter(({ kind: experimentKind }) => experimentKind === kind)
        .forEach(({ id }) => {
            const li = createElementWithClass("li", "experimentsListItem");
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

    const fixedExpPath = exp_kind ? buildRoute("EXPERIMENT_WITH_KIND", [exp_kind, exp_id]) : buildRoute("EXPERIMENT_NO_KIND", [exp_id]);
    const response = await fetch(fixedExpPath);
    let experiment = await response.json();

    const experimentTitle = document.createElement("h3");
    const experimentHash = document.createElement("div");
    const experimentId = document.createElement("div");
    const experimentKind = document.createElement("div");

    if(!experiment["label"]){
        experimentTitle.textContent = experiment["id"];
        experimentId.textContent = `Id: ${experiment["id"]}`;
    } else {
        experimentTitle.textContent = experiment["label"];
        experimentId.textContent = `Id: ${experiment["id"]}`;
    }

    experimentHash.textContent = `Hash: ${experiment["hash"]}`;
    experimentKind.textContent = `Kind: ${experiment["kind"]}`;

    experimentCardHeader.appendChild(experimentTitle);

    experimentCardContent.appendChild(experimentHash);
    experimentCardContent.appendChild(experimentId);

    if (experiment["kind"]) {
        experimentCardContent.appendChild(experimentKind);
    }

    experimentCard.appendChild(experimentCardHeader);
    experimentCard.appendChild(experimentCardContent);

    pageMount.innerHTML = '';
    pageMount.appendChild(experimentCard);
}