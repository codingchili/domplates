import FormComponent from "./form-component.js";

export default class FormColorpicker extends FormComponent {

    static get tag() {
        return 'form-colorpicker';
    }

    onAttach(element, initialValue) {
        this.element = element;
        this.render();
        this.input.value = initialValue || element.dataset.initial;
    }

    template() {
        let text = this.element.variable.replace("--", "");
        text = text.replace("-", " ");
        text = text[0].toUpperCase() + text.slice(1);

        return `
                <div class="color-picker">
                    <span class="color-hint">${text}</span>
                    <input type="color"/>
                </div>
            `;
    }

    bind() {
        this.input = this.querySelector('input');
    }
}
customElements.define(FormColorpicker.tag, FormColorpicker);
