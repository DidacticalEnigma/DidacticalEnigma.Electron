import { tabControlAttachJs } from "./tabControl";
import { api } from "./api"
import { RadicalLookup } from "./radicalLookup";
import { DataSourceLookup } from "./dataSourceLookup";
import { radicalControlAttachJs } from "./radicalControl";
import { dataSourceGridAttachJs, dataSourceGridLookup } from "./dataSourceGrid";

window.addEventListener('load', async () => {
  const radicalLookup = new RadicalLookup();
  const dataSourceLookup = new DataSourceLookup();

  tabControlAttachJs();
  await radicalControlAttachJs(radicalLookup);
  await dataSourceGridAttachJs(dataSourceLookup);





  const japaneseInput = document.getElementsByClassName("japanese-input")[0];
  const textArea = japaneseInput.getElementsByTagName("textarea")[0];
  

  let identifier: string | null = null;

  let lastPosition : number | undefined;
  async function send() {
    if(textArea.value.length === 0) {
      return;
    }
    if(lastPosition === textArea.selectionStart) {
      return;
    } else {
      lastPosition = textArea.selectionStart;
    }

    if (identifier !== null) {
      await api.deleteText({ identifier: identifier });
    }
    const resultPost = await api.postText({
      fullText: textArea.value
    });
    identifier = resultPost.identifier;

    const dataSources = document.querySelector(".tabcontrol-tabcontent-selected .data-sources");
    if(dataSources) {
      await dataSourceGridLookup(dataSources, dataSourceLookup, identifier, lastPosition);
    }
  }

  textArea.addEventListener("click", send);
  textArea.addEventListener("focus", send);
});