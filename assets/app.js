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

    const fixedExpPath = exp_kind ? buildRoute("EXPERIMENT_WITH_KIND", [exp_kind, exp_id]) : buildRoute("EXPERIMENT_NO_KIND", [exp_id]);
    const response = await fetch(fixedExpPath);
    let experiment = await response.json();

    let experimentDetailsCard = buildExperimentInfoCard(experiment);

    pageMount.innerHTML = '';
    pageMount.appendChild(experimentDetailsCard);

    if(experiment["kind"] == "user" && experiment["treatments"]){
        experiment["treatments"].forEach(treatment => {
            card = buildExperimentTreatmentCardForUser(treatment);
            pageMount.appendChild(card);
        });
    }

    if(experiment["kind"] == "guild" && experiment["treatments"]){
        experiment["treatments"].forEach(treatment => {
            console.log(treatment["label"])
        });
    }
}

function buildExperimentInfoCard(experiment){
    const experimentCardSkeleton = createElementWithClass("div", "experimentCard");
    const experimentCardHeader = createElementWithClass("div", "experimentCardHeader");
    const experimentCardContent = createElementWithClass("div", "experimentCardContent");

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

    experimentCardSkeleton.appendChild(experimentCardHeader);
    experimentCardSkeleton.appendChild(experimentCardContent);

    return experimentCardSkeleton
}

function buildExperimentTreatmentCardForUser(treatment){
    const treatmentCardSkeleton = createElementWithClass("div", "experimentCard");
    const treatmentCardHeader = createElementWithClass("div", "experimentCardHeader");
    const treatmentCardContent = createElementWithClass("div", "experimentCardContent");

    const treatmentLabel = document.createElement("h4");
    treatmentLabel.textContent = `${treatment["id"]} - ${treatment["label"]}`;
    
    treatmentCardHeader.appendChild(treatmentLabel);

    if (treatment["config"]) {
        const treatmentConfig = createElementWithClass("pre", "experimentCardContentTreatmentConfigCodeblock");
    
        treatmentConfig.textContent = JSON.stringify(treatment["config"], null, 2);
    
        treatmentCardContent.appendChild(treatmentConfig);
    }
    
    

    treatmentCardSkeleton.appendChild(treatmentCardHeader);
    treatmentCardSkeleton.appendChild(treatmentCardContent);

    return treatmentCardSkeleton
}

function buildExperimentRolloutElementForUser(){}