import { removeAllChildElements } from "./utility";
import { RadicalLookup } from "./radicalLookup";

export async function radicalControlAttachJs(radicalLookup: RadicalLookup) {
    const radicalsResult = await radicalLookup.getRadicals();

    for (const radicalRoot of document.getElementsByClassName("radicals")) {
        const radicalSelector = radicalRoot.getElementsByClassName("radicals-radicalselector")[0];
        const radicalSearchEditBox = radicalRoot.getElementsByClassName("radicals-searchbox")[0] as HTMLInputElement;
        const radicalSearchCriteriaSelect = radicalRoot.getElementsByClassName("radicals-sort-criteria")[0] as HTMLSelectElement;

        radicalSearchEditBox.addEventListener("keydown", async function(ev) {
            if (ev.key !== "Enter")
                return;
            
            const queryText = radicalSearchEditBox.value;
            await updateKanjiResults(radicalRoot, radicalLookup, queryText);
            return true;
        });

        for (const radicalCriterion of radicalsResult.sortingCriteria) {
            const option = document.createElement("option");
            option.value = radicalCriterion;
            option.innerText = radicalCriterion;
            radicalSearchCriteriaSelect.appendChild(option);
        }

        for (const radical of radicalsResult.possibleRadicals) {
            const button = document.createElement("button");
            button.setAttribute("class", "radicals-radicalselectoroption");
            button.innerText = radical;
            button.addEventListener("click", async function () {
                let queryText = radicalSearchEditBox.value;
                if (button.classList.contains("radicals-radicalselected"))
                {
                    queryText = queryText.replace(button.innerText, "");
                }
                else
                {
                    queryText += " " + button.innerText;
                }
                queryText = queryText.trim();
                radicalSearchEditBox.value = queryText;
                await updateKanjiResults(radicalRoot, radicalLookup, queryText, radicalSearchCriteriaSelect.selectedOptions[0].value);
            });
            radicalSelector.appendChild(button);
        }

        radicalSearchCriteriaSelect.addEventListener("change", async function(){
            await updateKanjiResults(radicalRoot, radicalLookup, radicalSearchEditBox.value, radicalSearchCriteriaSelect.selectedOptions[0].value);
        });
    }
}

async function updateKanjiResults(
    radicalRoot: Element,
    radicalLookup: RadicalLookup,
    queryText: string,
    sortCriterion?: string) {
    const result = await radicalLookup.selectRadicals(queryText, sortCriterion);

    const kanjiResultElementsRootDiv = radicalRoot.getElementsByClassName("radicals-kanjiresults")[0];
    removeAllChildElements(kanjiResultElementsRootDiv);
    for (const kanji of result.kanji) {
        const kanjiButton = document.createElement("button");

        kanjiButton.setAttribute("class", "radicals-kanjiresult");
        kanjiButton.innerText = kanji;

        kanjiResultElementsRootDiv.appendChild(kanjiButton);
    }

    const usedRadicals = new Set<string>(Object.values(result.usedRadicals));
    const possibleRadicals = new Set<string>(result.possibleRadicals);

    for (const radical of radicalRoot.getElementsByClassName("radicals-radicalselectoroption")) {
        if (possibleRadicals.has((radical as HTMLButtonElement).innerText)) {
            radical.removeAttribute("disabled");
        }
        else {
            radical.setAttribute("disabled", "");
        }

        if (usedRadicals.has((radical as HTMLButtonElement).innerText)) {
            radical.classList.add("radicals-radicalselected");
        }
        else {
            radical.classList.remove("radicals-radicalselected");
        }
    }
}