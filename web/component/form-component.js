/**
 * Base class for input support in the form.
 *
 *  element - this is the rendered HTML element from the template.
 *  input - this is the HTML form component which updates the template element.
 *
 *  To create a new component
 *
 *  1. make sure to plug in the template source tag in form.js
 *  2. add the custom web compnent which extends this class (optional)
 *  3. make sure to provide a getter for value and placeholder.
 *      if value is empty then the placeholder will be rendered to the template element.
 *      the placeholder value will not be stored in the persistence store.
 *  4. implement template/bind and set `this.input` in bind to support default implementations
 *      of render/value/placeholder/focus and propagate.
 *  5. for customized behavior, required for special source template elements make sure
 *     to implement onAttach.
 */
export default class FormComponent extends HTMLElement {

    constructor() {
        super();
        this.input = {
            value: '',
            placeholder: ''
        }
    }

    /**
     * Required for source template elements that does not use value/placeholder to store these values.
     * These values may be a part of the tag content instead, image and textarea for example.
     *
     * This method needs to call render and then bind to set the input component, or override
     * value/placeholder/focus.
     *
     * @param element the rendered element from the template, use this to get placeholder value
     *        and other information about its attributes.
     * @param initialValue the previous value stored for this form component as returned by #value.
     */
    onAttach(element, initialValue) {
        this.element = element;
        this.render();
        this.input.value = initialValue;
    }

    /**
     * Creates the template updates the components HTML and then calls bind which
     * allows the custom form component to bind the input component etc.
     */
    render() {
        this.innerHTML = this.template();
        this.bind();
    }

    /**
     * @returns {string} the current value of the input component.
     */
    get value() {
        return this.input.value;
    }

    /**
     * @returns {string} the value to render when there is no value.
     */
    get placeholder() {
        return this.input.placeholder;
    }

    /**
     * Propagates events from the given input component to parent components listening to change events.
     * This mechanism is used to notify the renderer to update.
     *
     * @param component  the component to add input propagation to.
     */
    propagate(component) {
        component = component || this.input;

        component.addEventListener('input', () => {
            this.dispatchEvent(new Event('input'));
        });
        component.addEventListener('focus', (e) => {
            this.dispatchEvent(new Event('focus'));
        });
    }

    /**
     * Focuses on the input component or given component by flashing it briefly and
     * calling focus() on it.
     *
     * @param component an input component to focus.
     */
    focus(component) {
        component = component || this.input;

        component.focus();
        component.classList.add('flash');
        setTimeout(() => {
            component.classList.remove('flash');
        }, 700);
    }

}