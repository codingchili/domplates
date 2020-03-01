import DataSet from './dataset.js';
import measure from "./performance.js";

import DatasetSelector from "./dataset-selector.js";
import FormTextarea from "./form-textarea.js";
import FormTextinput from "./form-textinput.js";
import FormColorpicker from "./form-colorpicker.js";
import FormImagepicker from "./form-imagepicker.js";
import FormRepeat from "./form-repeat.js";

export class TemplateForm extends HTMLElement {

    constructor() {
        super();
        this.store = new DataSet();
        this.fieldCallbacks = [];
        this.datasetCallbacks = [];
    }

    edit(elementId) {
        if (elementId) {
            this.lastEdited = elementId;
        } else {
            if (this.lastEdited) {
                elementId = this.lastEdited;
            } else {
                return;
            }
        }
        let element = document.getElementById(elementId);
        if (element) {
            element.focus();
        }
    }

    connectedCallback() {
        this.render();
    }

    updateFields(elements) {
        if (elements) {
            this.elements = elements;
        }
        this.update();
    }

    render() {
        this.innerHTML = `
            <style>
                .color-picker {
                    display: flex;
                    justify-content: space-between;
                }
                input[type=color] {
                    cursor: pointer;
                }
                .color-hint {
                    margin-top: 8px;
                }
                textarea {
                    width: 100%;
                    resize: none;
                }
                input[datatype="image"] {
                    width: 630px;
                    max-width: 100%;
                }
                input[datatype="text"] {
                    width: 312px;
                    margin-right: 4px;
                    max-width: 100%;
                }
                
                @media screen and (max-width: 734px) {
                    input[datatype="text"] {
                        width: 100%;
                    }
                }
                .flash {
                    animation: fade 0.32s ease-in infinite;
                    animation-iteration-count: 1;
                }
                #datasets select {
                    width: 232px;
                    display: block;
                    margin: auto;
                }      
                .markdown-reference {
                    text-align: center;
                    margin: auto;
                    font-size: 12px;
                }
                .links-container {
                    width: 100%;
                    display: block;
                    text-align: center;
                    bottom: 8px;
                    position: absolute;
                    left: 0px;
                    right: 0px;
                }
                .input-container {
                    top: 108px;
                    position: absolute;
                    padding: 32px;
                    padding-top: 0px;
                    padding-bottom: 0px;
                    bottom: 172px;
                    overflow-y: scroll;
                    overflow-x: hidden;
                    left: 2px;
                    right: 2px;
                }  
               @keyframes fade {
                  0%,100% { background-color: #00798a00) }
                  50% { background-color: var(--accent); color: #ffffff; }
                }
            </style>
            
            <div id="datasets">
                <dataset-selector></dataset-selector>
            </div>

            <div class="input-container">
            </div>
            <div class="links-container">
                <a target="_blank" rel="noopener noreferrer" class="markdown-reference" 
                    href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet">
                    Markdown reference
                </a>
            </div>
        `;
    }

    update() {
        let container = this.querySelector('.input-container');
        container.innerHTML = `
            <div style="margin-top:24px;"></div>
                ${Object.keys(this.elements).map(element => {
            return `${this._input(this.elements[element])}`;
        }).join(``)
        }`;
        this._bind();
    }

    _input(element) {
        let tag = null;
        if (this._isStyleElement(element)) {
            tag = FormColorpicker.tag;
        } else if (element instanceof HTMLParagraphElement) {
            tag = FormTextarea.tag;
        } else if (element instanceof HTMLTemplateElement) {
            tag = FormRepeat.tag;
        } else {
            if (element instanceof HTMLImageElement) {
                tag = FormImagepicker.tag;
            } else {
                tag = FormTextinput.tag;
            }
        }
        return `<${tag} id="${element.id}" data-id="${element.dataset.id}"></${tag}>`;
    }

    _isStyleElement(element) {
        return element.constructor.name === 'StyleElement';
    }

    _value(element) {
        return this.store.get(element.dataset.id) || (this._isStyleElement(element) ? element.dataset.initial : "");
    }

    _bind() {
        for (let element of this.querySelectorAll(`[data-id]`)) {
            element.addEventListener('input', () => {
                if (element.dataset.id) {
                    this.store.set(element.dataset.id, element.value);
                }
                this._update(element);
            });

            element.addEventListener('focus', () => {
                this.lastEdited = element.id;
            });

            if (element.onAttach) {
                element.onAttach(this.elements[element.id], this._value(element));
            }

            if (this._value(element)) {
                this._update(element);
            }
        }
        this._datastoreListener();
    }

    _datastoreListener() {
        let selector = this.querySelector('dataset-selector');
        selector.setStore(this.store);

        selector.onStoreChanged((store) => {
            measure(`selected database ${store}`, () => {
                this.store.open(store);
                this._datasetChanged();
            });
        });
    }

    _update(element) {
        for (let callback of this.fieldCallbacks) {
            if (element.value.length > 0) {
                callback(element.id, element.value);
            } else {
                callback(element.id, element.placeholder);
            }
        }
    }

    _datasetChanged() {
        for (let callback of this.datasetCallbacks) {
            callback();
        }
    }

    onFieldUpdate(callback) {
        this.fieldCallbacks.push(callback);
    }

    onDatasetChange(callback) {
        this.datasetCallbacks.push(callback);
    }
}

customElements.define("template-form", TemplateForm);