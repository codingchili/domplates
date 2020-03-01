import FormComponent from "./form-component.js";

export default class FormTextinput extends FormComponent {

    static get tag() {
        return 'form-textinput';
    }

    onAttach(element, initialValue) {
        this.element = element;
        this.render();

        if (element.dataset.placeholder) {
            this.input.placeholder = element.dataset.placeholder;
        }
        this.input.value = initialValue;
    }

    template() {
        return `<input datatype="text" placeholder="${this.element.innerHTML}" type="text" name="${this.element.dataset.id}"/>`
    }

    bind() {
        this.input = this.querySelector('input');
        super.propagate(this.input);
    }
}
customElements.define(FormTextinput.tag, FormTextinput);