import FormComponent from "./form-component.js";

export default class FormTextarea extends FormComponent {

    static get tag() {
        return 'form-textarea';
    }

    onAttach(element, initialValue) {
        this.element = element;
        this.render();

        if (initialValue) {
            this.input.innerHTML = initialValue;
        }
        this.resize();
    }

    template() {
        return `<textarea placeholder="${this.element.innerHTML}"></textarea>`;
    }

    resize() {
        if (this.input.scrollHeight > 0) {
            this.input.style.height = '';
            this.input.style.height = `${this.input.scrollHeight + 3}px`;
        }
    }

    bind() {
        this.input = this.querySelector('textarea');
        window.addEventListener('resize', () => {
            this.resize(this.input);
        });
        this.input.addEventListener('input', () => {
            this.resize(this.input);
        });
        this.resize(this.input);
        this.propagate(this.input);
    }
}

customElements.define(FormTextarea.tag, FormTextarea);