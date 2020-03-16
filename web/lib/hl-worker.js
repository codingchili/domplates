onmessage = (event) => {
    importScripts('./highlight.pack.js');
    const result = self.hljs.highlightAuto(event.data);
    postMessage(result.value);
};