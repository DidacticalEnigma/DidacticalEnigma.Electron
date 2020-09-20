import { DataSourceLookup } from "./dataSourceLookup";
import { map, filter } from "lodash";
import { notNull, makeElement } from "./utility";
import { generateHtmlFromRichFormatting } from "./richFormatting"

export async function dataSourceGridAttachJs(dataSourceLookup: DataSourceLookup) {
    const dataSources = await dataSourceLookup.listDataSources();

    const dataSourceElements = document.getElementsByClassName("data-sources");

    for(const dataSourceElement of dataSourceElements) {
        dataSourceElement.appendChild(makeElement({
            tagName: "div",
            classes: ["data-source-viewer"],
            elements: [
                makeElement({
                    tagName: "select",
                    classes: ["data-source-selector"],
                    elements: map(dataSources, (dataSource) => makeElement({
                        tagName: "option",
                        attributes: [["value", dataSource.identifier]],
                        innerText: dataSource.friendlyName
                    }))
                })
            ]
        }));
    }
}

export async function dataSourceGridLookup(dataSourceGrid: Element, dataSourceLookup: DataSourceLookup, textIdentifier: string, position: number) {
    const viewers = dataSourceGrid.getElementsByClassName("data-source-viewer");
    const dataSourceIdentifiers = filter(
        map(viewers, (viewer) => (viewer.getElementsByClassName("data-source-selector")[0] as HTMLSelectElement).selectedOptions[0].value),
        notNull);

    const result = await dataSourceLookup.lookup(textIdentifier, position, dataSourceIdentifiers);

    for (const viewer of viewers) {
        const dataIdentifier = (viewer.getElementsByClassName("data-source-selector")[0] as HTMLSelectElement).selectedOptions[0].value;
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