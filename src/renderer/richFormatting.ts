export function generateHtmlFromRichFormatting(rawInputDocument : string) {
    const doc = new DOMParser().parseFromString(rawInputDocument, "application/xml");
    if(doc.getElementsByTagNameNS("http://www.mozilla.org/newlayout/xml/parsererror.xml", "parsererror").length !== 0) {
      throw "invalid document";
    }
    const result = document.createElement("div");
    for(const el of doc.getElementsByTagName("root")[0].children) {
      if(el.tagName == "link") {
        const pElement = document.createElement("p");
        const aElement = document.createElement("a");
        const target = el.getAttribute("target");
        const text = el.getAttribute("text");
        if(!target || !text) {
          continue;
        }
        aElement.setAttribute("href", target);
        aElement.innerText = text;
        pElement.appendChild(aElement);
        result.appendChild(pElement);
      }
      if(el.tagName == "par") {
        const pElement = document.createElement("p");
        for(const span of el.children) {
          if(span.tagName == "span") {
            const spanElement = document.createElement("span");
            const text = span.textContent;
            if(text) {
              spanElement.innerText = text;
            }
            
            pElement.appendChild(spanElement);
          }
        }
        result.appendChild(pElement);
      }
    }
  
    return result;
  }