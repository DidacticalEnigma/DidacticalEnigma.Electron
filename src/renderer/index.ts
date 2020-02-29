import { DidacticalEnigmaRestApi } from "../api/src/didacticalEnigmaRestApi";

window.addEventListener('load', async () => {
  const radicalLookupControls = document.getElementsByClassName("radicals");
  const api = new DidacticalEnigmaRestApi({ baseUri : "http://localhost:5000" });
  const radicals = await api.listRadicals();

  for(const control of radicalLookupControls) {
    const radicalSelector = control.getElementsByClassName("radicals-radicalselector")[0];
    for(const radical of radicals) {
      const b = document.createElement("button");
      b.innerText = radical;
      radicalSelector.appendChild(b);
    }
  }
});