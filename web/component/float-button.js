export default class FloatButton extends HTMLElement {

    static get tag() {
        return 'float-button';
    }

    connectedCallback() {
        // shadow dom this?
        this.shadow = this.attachShadow({mode: 'open'});
        this.action = this.getAttribute('action');
        this.render();
    }

    render() {
        this.shadow.innerHTML = this.template();
        this.bind();
    }

    template() {
        return `
<style>
    .toggle-container {
        bottom: 32px;
        right: 32px;
        background-color: var(--accent);
        border-radius: 32px;
        width: 44px;
        height: 44px;
        border: 1px solid #00000064;
        transition: background-color 0.2s;
        display: none;
        z-index: 200;
    }
    .toggler {
        margin: auto;
        display: block;
        width: 24px;
        height: 24px;
        margin-top: 10px;
        margin-left: 10px;
    }
    .toggle-container:hover {
        cursor: pointer;
        background-color: var(--theme);
    }
    @media screen and (max-width: 1580px) {
        .preview {
            display: var(--edit-mode);
        }
        .print {
            display: var(--preview-mode);
        }
        .edit {
            display: var(--preview-mode);
        }
    }
    @media screen and (min-width: 1580px) {
        .toggle-container {
            display: none;
        }
        .print {
            display: block;
            bottom: 32px;
        }
    }
    .toggler-edit {
        margin-left: 12px;
    }
    .edit {
        margin-top:16px;        
    }
</style>

    <div class="toggle-container ${this.action}">
        <img class="toggler toggler-${this.action}" src="icon/${this.action}.svg">
    </div>
        `;
    }

    bind() {
        let interactive = this.shadowRoot.querySelector('div');
        setProperty("--preview-mode", 'block');
        ['touchstart', 'mousedown'].forEach(event => {
            interactive.addEventListener(event, (e) => {
                e.stopPropagation();
                window.dispatchEvent(new Event(this.action));
                e.preventDefault();
            });
        });
    }

}
customElements.define(FloatButton.tag, FloatButton);