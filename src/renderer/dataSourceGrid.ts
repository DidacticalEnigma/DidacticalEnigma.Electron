import { DataSourceLookup } from "./dataSourceLookup";
import { map, filter } from "lodash";
import { notNull, makeElement } from "./utility";
import { generateHtmlFromRichFormatting } from "./richFormatting"
import { ListDataSourcesResponse } from "../api/src/models";

export async function dataSourceGridAttachJs(dataSourceLookup: DataSourceLookup) {
    const dataSources = await dataSourceLookup.listDataSources();

    const dataSourceElements = document.getElementsByClassName("data-sources");

    for(const dataSourceElement of dataSourceElements) {
        dataSourceElement.appendChild(createViewer(dataSources));
    }
}

function createViewer(dataSources: ListDataSourcesResponse) {
    return makeElement({
        tagName: "div",
        classes: ["data-source-viewer"],
        elements: [
            makeElement({
                tagName: "select",
                classes: ["data-source-viewer-selector"],
                elements: map(dataSources, (dataSource) => makeElement({
                    tagName: "option",
                    attributes: [["value", dataSource.identifier]],
                    innerText: dataSource.friendlyName
                }))
            }),
            makeElement({
                tagName: "button",
                innerText: "V",
                andAlso: (element) => {
                    element.addEventListener("click", () => {
                        createSplit(dataSources, element.parentElement!, "vsplit");
                    })
                }
            }),
            makeElement({
                tagName: "button",
                innerText: "H",
                andAlso: (element) => {
                    element.addEventListener("click", () => {
                        createSplit(dataSources, element.parentElement!, "hsplit");
                    })
                }
            }),
            makeElement({
                tagName: "button",
                innerText: "X",
                andAlso: (element) => {
                    element.addEventListener("click", () => {
                        closeSplit(element.parentElement!);
                    })
                }
            })
        ]
    })
}

function createSplit(dataSources: ListDataSourcesResponse, dataSourceViewer: Element, type: "vsplit" | "hsplit") {
    const parent = dataSourceViewer.parentElement;
    if(parent == null) {
        throw "Should not be a root node";
    }
    if(parent.classList.contains("data-sources") ||
       parent.classList.contains("data-source-vsplit") ||
       parent.classList.contains("data-source-hsplit")) {
        const split = makeElement({
            tagName: "div",
            classes: ["data-source-" + type]
        });
        dataSourceViewer.replaceWith(split);
        split.appendChild(dataSourceViewer);
        split.appendChild(createViewer(dataSources));
    }
}

function closeSplit(dataSourceViewer: Element) {
    const parent = dataSourceViewer.parentElement;
    if(parent == null) {
        throw "Should not be a root node";
    }
    if(parent.classList.contains("data-sources")) {
        return;
    }
    if(parent.classList.contains("data-source-vsplit") ||
       parent.classList.contains("data-source-hsplit")) {
        dataSourceViewer.remove();
        for(const child of parent.children) {
            if(child.classList.contains("data-source-vsplit") ||
               child.classList.contains("data-source-hsplit") || 
               child.classList.contains("data-source-viewer")) {
                parent.replaceWith(child);
                break;
            }
        }
    }
}

export async function dataSourceGridLookup(dataSourceGrid: Element, dataSourceLookup: DataSourceLookup, textIdentifier: string, position: number) {
    const viewers = dataSourceGrid.getElementsByClassName("data-source-viewer");
    const dataSourceIdentifiers = filter(
        map(viewers, (viewer) => (viewer.getElementsByClassName("data-source-viewer-selector")[0] as HTMLSelectElement).selectedOptions[0].value),
        notNull);

    const result = await dataSourceLookup.lookup(textIdentifier, position, dataSourceIdentifiers);

    for (const viewer of viewers) {
        const dataIdentifier = (viewer.getElementsByClassName("data-source-viewer-selector")[0] as HTMLSelectElement).selectedOptions[0].value;
        if (dataIdentifier == null) {
            continue;
        }

        for(const dataSourceText of viewer.getElementsByClassName("data-source-text")) {
            dataSourceText.remove();
        }

        let content = result[dataIdentifier].context;
        if(content) {
            const el = generateHtmlFromRichFormatting(content);
            el.classList.add("data-source-text");
            viewer.appendChild(el);
        }
        else {
            const errorDiv = document.createElement("div");
            errorDiv.innerText = result[dataIdentifier].error ?? "";
            errorDiv.classList.add("data-source-text");
            viewer.appendChild(errorDiv);
        }
    }
}