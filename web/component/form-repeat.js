import FormComponent from "./form-component.js";

// grab template and create input components
// repeat/remove repeat set
// modify renderer directly
// serialize to json for store support
export default class FormRepeat extends FormComponent {

    static get tag() {
        return 'form-repeat';
    }

    constructor() {
        super();
        this.inputs = [];
    }

    onAttach(element, initialValue) {
        super.onAttach(element, initialValue);
        this.createTemplateContainer();
        this.parseTemplate();
        this.render();
    }

    parseTemplate() {
        this.container.querySelector('a').addEventListener('click', () => {
            let section = document.createElement('div');
            section.innerHTML = this.element.innerHTML;
            this.container.appendChild(section);

            this.inputs = Array.from(this.container.querySelectorAll('[data-id]'));
            this.render();
            //window.dispatchEvent(new Event('refresh'))
        });
    }

    createTemplateContainer() {
        this.container = document.createElement('div');
        this.container.innerHTML = `<a href="javascript:">+ add ${this.element.dataset.id} +</a>`;
        this.container.style.width = '100%';
        this.container.style['text-align'] = 'center';
        this.container.style['margin-right'] = '70px';
        this.container.style['font-size'] = '12px';
        this.element.parentNode.appendChild(this.container);
    }

    template() {
        return `
            ${new Date().toString()}
            <!-- repeat for each template set -->
            ${this.inputs.map(i => {
                /* add button to add/remove template sets. */
                /* todo chose inputs as is done in forms.js */
                return `<input type="text" data-id="${i.dataset.id}" value="${i.innerText}"/>`
            }).join('')}
        `;
    }

    bind() {
        // todo should rendering be done here, or somehow in the render.js?
        this.querySelectorAll('input').forEach(input => {
            // consider markdown support when rendering?
            input.addEventListener('input', () => {
                // update the rendered object
                //this.container.innerHTML = ``;
            });
        });
        // implement focus logic here */*
    }

    // todo: what if:
    // 1. show media-type screen <link> to add set
    // 2. on click - grab templates parent and stamp it - include remove link
    // 3. update fields in form to appear stuff
    // 4. this component is never rendered in the form, it's virtual.
}
customElements.define(FormRepeat.tag, FormRepeat);