import './form-textarea';

export class TemplateEditor extends HTMLElement {

    constructor() {
        super();
        this.templates = ['basic', 'testing', 'rduda', 'jbloe2'];
    }

    connectedCallback() {
        this.render();
        this.bind();
        window.addEventListener('activate-editor', (e) => {
            this._resize();
        });
    }

    render() {
        // copy from renderer
        this.innerHTML = `
            <style>
                .button {
                    text-align: center;
                    width: -webkit-fill-available;
                }
                #button-container {
                    position: absolute;
                    bottom: 8px;
                    left: 16px;
                    right: 16px;
                }
                #edit-container {
                    position: absolute;
                    left: 32px;
                    right: 32px;
                    bottom: 86px;
                    top: 76px;
                    overflow-y: scroll;
                }
                #editor {
                    padding-bottom: 0px;
                    margin-bottom: 0px;
                }
                #output {
                    white-space: pre;
                    overflow:hidden;
                    padding-bottom: 26px;
                }
                #input {
                    color: rgba(0, 0, 0, 0);
                    background-color: rgba(0, 0, 0, 0);
                    caret-color: var(--accent);
                    display: block;
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    right: 0px;
                    bottom: 86px;
                    height:100%;
                    
                    font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
                    font-size:13px;
                    font-weight:400;
                    line-height:20.8px;
                    margin: 0px 2px;
                    padding: 6.5px;
                    text-size-adjust: 100%;
                    white-space: pre;
                    overflow: hidden;
                }
                .scroll-content {
                    overflow-y: scroll;
                    overflow-x: hidden;
                    position: absolute;
                    bottom: 80px;
                    top: 52px;
                    left: 0px;
                    right: 0px;
                }
            </style>
            
            <div class="scroll-content">
               <code id="output" class="hljs" spellcheck="false"></code>
               <textarea spellcheck="false" id="input"></textarea>
           </div>
           
           <link rel="stylesheet" href="style/github.css">
                       
           <div id="button-container">
               <hr style="margin-bottom:8px">
               <div class="button">SAVE</div>
           </div>
        `;
    }

    bind() {
        let script = document.createElement('script');
        script.src = 'lib/highlight.pack.js';
        script.type = "text/javascript";
        this.appendChild(script);

        let id = setInterval((e) => {
            if (typeof hljs === 'undefined') {
                return;
            } else {
                clearInterval(id);
            }
            hljs.configure({useBR: false});
            this.output = document.querySelector('#output');
            this.input = document.querySelector('#input');

            const worker = new Worker('lib/hl-worker.js');
            worker.onmessage = (event) => {
                this.output.innerHTML = event.data;
            };

            this.input.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    document.execCommand('insertText', false /*no UI*/, '    ');
                    e.preventDefault();
                }
                // skip re-evaluation for keyboard navigation
                if (!e.key.includes('Arrow')) {
                    setTimeout(() => {
                        worker.postMessage(this.input.value);
                        this.dispatchEvent(new CustomEvent('template-update', {detail: this.input.value}));
                        this._resize();
                    }, 0);
                }
            });
            worker.postMessage(this.input.value);
        }, 50);
        //this._resize();
    }

    _resize() {
        // no way to set max height on textarea through css.
        setTimeout(() => {
            if (this.input.scrollHeight > 0) {
                this.input.style.height = '';
                this.input.style.height = `${this.input.scrollHeight + 3}px`;
            }
        }, 0);
    }

    setTemplate(template) {
        this.querySelector('#input').value = template;
    }
}

customElements.define('template-editor', TemplateEditor);