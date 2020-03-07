import { map } from "lodash";
import { removeAllChildElements } from "./utility";
import { RadicalLookup } from "./radicalLookup";

export async function radicalControlAttachJs(radicalLookup: RadicalLookup) {
    const radicals = await radicalLookup.getRadicals();

    for (const radicalRoot of document.getElementsByClassName("radicals")) {
        const radicalSelector = radicalRoot.getElementsByClassName("radicals-radicalselector")[0];

        for (const radical of radicals) {
            const button = document.createElement("button");
            button.setAttribute("class", "radicals-radicalselectoroption");
            button.innerText = radical;
            button.addEventListener("click", async function () {
                button.classList.toggle("radicals-radicalselected");
                await updateKanjiResults(radicalRoot, radicalLookup);
            });
            radicalSelector.appendChild(button);
        }
    }
}

async function updateKanjiResults(radicalRoot: Element, radicalLookup: RadicalLookup) {
    const result = await radicalLookup.selectRadicals(map(
        radicalRoot.getElementsByClassName("radicals-radicalselected"),
        (e) => (e as HTMLButtonElement).innerText));

    const kanjiResultElementsRootDiv = radicalRoot.getElementsByClassName("radicals-kanjiresults")[0];
    removeAllChildElements(kanjiResultElementsRootDiv);
    for (const kanji of result.kanji) {
        const kanjiButton = document.createElement("button");

        kanjiButton.setAttribute("class", "radicals-kanjiresult");
        kanjiButton.innerText = kanji;

        kanjiResultElementsRootDiv.appendChild(kanjiButton);
    }

    const possibleRadicals = new Set<string>(result.possibleRadicals);

    for (const radical of radicalRoot.getElementsByClassName("radicals-radicalselectoroption")) {
        if (possibleRadicals.has((radical as HTMLButtonElement).innerText)) {
            radical.removeAttribute("disabled");
        }
        else {
            radical.setAttribute("disabled", "");
        }
    }
}