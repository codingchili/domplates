import FormTextarea from "./form-textarea";

let StyleElement = class StyleElement {
    constructor(shadow, variable, initial) {
        this.variable = variable;
        this.shadow = shadow;
        this.dataset = {placeholder: variable, initial: initial, id: variable};
        this.update(initial);
    }
    update(value) {
        this.shadow.host.style.setProperty(this.variable, value);
    }
};

import ApplicationStyle from "./style.js";
import MarkdownSupport from "./markdown.js";
import measure from "./performance.js";

export class TemplateRenderer extends HTMLElement {

    constructor() {
        super();
        this.elements = {};
        this.editHandler = () => {};
    }

    connectedCallback() {
        this.shadow = this.attachShadow({mode: 'open'});
    }

    onEditRequest(handler) {
        this.editHandler = handler;
    }

    retrieve(resource, callback) {
        fetch(`template/${resource}.html`)
            .then((response) => {
                    if (response.status !== 200) {
                        console.log(response.status)
                    }
                    response.text().then((data) => {
                        this.template = data;
                        this.refresh();
                        callback(this.elements, this.template);
                    });
                }
            ).catch((err) => {
                console.log(err);
            });
    }

    setTemplateText(template, callback) {
        this.template = template;
        this.refresh();
        callback(this.elements, this.template);
    }

    refresh() {
        this.elements = {};
        this._processTemplate(this.template);

        for (let element of this.shadowRoot.querySelectorAll(`[data-id]`)) {
            ['click'].forEach(event => {
                element.addEventListener(event, (event) => {
                    this.editHandler(element.id);
                });
            });
            this._addElement(element);
        }
        return this.elements;
    }

    _generateId(element) {
        if (!element.id) {
            element.id = Math.random().toString(36).substring(7);
        }
    }

    _processTemplate(template) {
        let container = document.createElement('div');
        container.innerHTML = `${ApplicationStyle.template} ${template}`;
        this._attach(container);
        this._execute(container);
        return container;
    }

    _attach(container) {
        if (this.shadow.childNodes.length > 0) {
            this.shadow.removeChild(this.shadow.firstChild);
        }
        this.shadow.appendChild(container);
    }

    _execute(container) {
        for (let script of container.getElementsByTagName('script')) {
            eval(script.textContent);
        }
    }

    _theme(variable, initial) {
        let element = new StyleElement(this.shadowRoot, variable, initial);
        this._addElement(element);
    }

    _addElement(element) {
        this._generateId(element);
        this.elements[element.id] = element;
    }

    notify(path, data) {
        let element = this.elements[`${path}`];

        if (element instanceof HTMLImageElement) {
            element.src = data;
        } else if (element instanceof StyleElement) {
            element.update(data);
        } else {
            measure(`custom markdown render`, () => {
                element.innerHTML = MarkdownSupport.render(data);
            });
        }
    }

    _addPageBreakMarkers() {
        // works but does not update when the document height changes.
        // is not aware of how many page breaks to append into the parent either.
        let container = this.shadowRoot.querySelector('#resume');

        for (let i = 0; i < 1; i++) {
            let span = document.createElement('span');
            span.innerText = '...';
            span.style.cssText = `
            display: block;
            position: absolute;
            top: ${(i + 1) * 29.6}cm;
            float: right;
            font-size: 22px;
            margin: auto;
            right: 16px;
            text-align: center;
            }
        `;
            container.appendChild(span);
        }
    }
}

customElements.define("template-render", TemplateRenderer);