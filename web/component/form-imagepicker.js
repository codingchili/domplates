import FormComponent from "./form-component.js";

export default class FormImagepicker extends FormComponent {

    static get tag() {
        return 'form-imagepicker';
    }

    template() {
        return `<input datatype="image" placeholder="${this.element.src}" type="text"/>`
    }

    bind() {
        this.input = this.querySelector('input');
        super.propagate(this.input);
    }
}
customElements.define(FormImagepicker.tag, FormImagepicker);