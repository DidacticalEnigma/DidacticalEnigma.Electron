import { DidacticalEnigmaRestApi } from "../api/src/didacticalEnigmaRestApi";
import { map, join } from "lodash";

const api = new DidacticalEnigmaRestApi({ baseUri : "http://localhost:5000" });

window.addEventListener('load', async () => {
  
  
  const lookupControl = new RadicalLookupControl(await api.listRadicals());

  document.getElementsByTagName("body")[0].appendChild(lookupControl.rootElement);
});

class RadicalLookupControl {
  public readonly rootElement : Element;

  constructor(radicals : Iterable<string>) {
    const self = this;
    this.rootElement = function(){
      const e = document.createElement("div");
      e.setAttribute("class", "radicals");

      e.appendChild(function() {
        const e = document.createElement("div");
        e.setAttribute("class", "radicals-radicalselector");

        for(const radical of radicals) {
          e.appendChild(function(){
            const e = document.createElement("button");
            e.setAttribute("class", "radicals-radicalselector");
            e.innerText = radical;
            e.addEventListener("click", async function(){
              e.classList.toggle("radicals-radicalselected");
              await self.updateKanjiResults();
            });
            return e;
          }())
        }

        return e;
      }());

      e.appendChild(function() {
        const e = document.createElement("div");
        e.setAttribute("class", "radicals-kanjiresults");
        return e;
      }());

      return e;
    }();
  }

  public async updateKanjiResults() {
    const radicals = join(
        map(
          this.rootElement.getElementsByClassName("radicals-radicalselected"),
          (e) => (e as HTMLButtonElement).innerText),
        ",");
    const result = await api.selectRadicals({
      radical : radicals
    });
    const kanjiResultElementsRootDiv = this.rootElement.getElementsByClassName("radicals-kanjiresults")[0];
    this.removeAllChildElements(kanjiResultElementsRootDiv);
    for(const kanji of result.kanji) {
      kanjiResultElementsRootDiv.appendChild(function(){
        const e = document.createElement("button");

        e.setAttribute("class", "radicals-kanjiresult");
        e.innerText = kanji;

        return e;
      }());
    }

    const possibleRadicals = new Set<string>(result.possibleRadicals);

    for(const radical of this.rootElement.getElementsByClassName("radicals-radicalselector")) {
      if(possibleRadicals.has((radical as HTMLButtonElement).innerText)) {
        radical.removeAttribute("disabled");
      }
      else {
        radical.setAttribute("disabled", "");
      }
    }
  }

  private removeAllChildElements(el : Element) {
    while (el.lastElementChild) {
      el.removeChild(el.lastElementChild);
    }
  }
}