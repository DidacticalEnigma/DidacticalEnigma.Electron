import { map } from "lodash";
import { tabControlAttachJs } from "./tabControl"
import { removeAllChildElements } from "./utility"
import { api } from "./api"
import { generateHtmlFromRichFormatting } from "./richFormatting"
import { RadicalLookup } from "./radicalLookup";
import { radicalControlAttachJs } from "./radicalControl";

window.addEventListener('load', async () => {
  const radicalLookup = new RadicalLookup();

  tabControlAttachJs();
  await radicalControlAttachJs(radicalLookup);
});

window.addEventListener('load', async () => {
  const japaneseInput = document.getElementsByClassName("japanese-input")[0];
  const textArea = japaneseInput.getElementsByTagName("textarea")[0];
  const button = japaneseInput.getElementsByTagName("button")[0];
  const input = japaneseInput.getElementsByTagName("input")[0];
  const dataSources = document.getElementsByClassName("data-sources")[0];

  let identifier: string | null = null;

  button.addEventListener("click", async function () {
    if (identifier !== null) {
      await api.deleteText({ identifier: identifier });
    }
    const resultPost = await api.postText({
      fullText: textArea.value
    });
    identifier = resultPost.identifier;

    const resultList = map(await api.listDataSources(), (r) => r.identifier);
    const resultLookup = await api.requestInformationFromDataSources({
      body: {
        id: resultPost.identifier,
        position: parseInt(input.value, 10),
        requestedDataSources: resultList
      }
    });
    removeAllChildElements(dataSources);
    for (const identifer of resultList) {
      let content = resultLookup[identifer].context;
      if(content) {
        const el = generateHtmlFromRichFormatting(content);
        dataSources.appendChild(el);
      }
      else {
        const errorDiv = document.createElement("div");
        errorDiv.innerText = "ERROR";
        dataSources.appendChild(errorDiv);
      }
    }
  });
});



