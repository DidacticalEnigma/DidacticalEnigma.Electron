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

    await dataSourceGridLookup(dataSources, dataSourceLookup, identifier, parseInt(input.value, 10));
  });
});

