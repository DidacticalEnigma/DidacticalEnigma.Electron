import { DidacticalEnigmaRestApi } from "../api/src/didacticalEnigmaRestApi";
import { map } from "lodash";
//import { map, join } from "lodash";
//import { isBuffer } from "util";

const api = new DidacticalEnigmaRestApi({ baseUri : "http://localhost:5000" });

window.addEventListener('load', async () => {
  const body = document.getElementsByTagName("body")[0];  
  //const lookupControl = new RadicalLookupControl(await api.listRadicals());
  const resultPost = await api.postText({
    fullText : "お前はもう死んでいる"
  });
  const resultList = map(await api.listDataSources(), (r) => r.identifier);
  const resultLookup = await api.requestInformationFromDataSources({
    body : {
      id : resultPost.identifier,
      position : 3,
      requestedDataSources : resultList
    }
  });
  for(const identifer of resultList) {
    const el = generateHtmlFromRichFormatting(resultLookup[identifer].context);
    body.appendChild(el);
  }
  //body.appendChild(lookupControl.rootElement);
});

/*class RadicalLookupControl {
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
            e.setAttribute("class", "radicals-radicalselectoroption");
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

    for(const radical of this.rootElement.getElementsByClassName("radicals-radicalselectoroption")) {
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
}*/

function generateHtmlFromRichFormatting(rawInputDocument : string) {
  const doc = new DOMParser().parseFromString(rawInputDocument, "application/xml");
  if(doc.getElementsByTagNameNS("http://www.mozilla.org/newlayout/xml/parsererror.xml", "parsererror").length !== 0) {
    throw "invalid document";
  }
  const result = document.createElement("div");
  for(const el of doc.getElementsByTagName("root")[0].children) {
    if(el.tagName == "link") {
      const pElement = document.createElement("p");
      const aElement = document.createElement("a");
      aElement.setAttribute("href", el.getAttribute("target"));
      aElement.innerText = el.getAttribute("text");
      pElement.appendChild(aElement);
      result.appendChild(pElement);
    }
    if(el.tagName == "par") {
      const pElement = document.createElement("p");
      for(const span of el.children) {
        if(span.tagName == "span") {
          const spanElement = document.createElement("span");
          spanElement.innerText = span.textContent;
          
          pElement.appendChild(spanElement);
        }
      }
      result.appendChild(pElement);
    }
  }

  return result;
}