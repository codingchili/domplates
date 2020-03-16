const CONFIG_KEY = 'configuration';

export class AppSettings extends HTMLElement {

    constructor() {
        super();
        if (localStorage.getItem(CONFIG_KEY)) {
            this.configuration = JSON.parse(localStorage.getItem(CONFIG_KEY));
        } else {
            this.configuration = {
                theme: '#004b5c',
                accent: '#007587'
            }
        }
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = this.template();
        this.bind();
    }

    template() {
        return `
            <style>
                .row {
                    display: flex;
                    margin-left:32px;
                    margin-right:32px;
                    justify-content: space-between;
                }
                .block {
                    display: block;
                }
            </style>
            <div class="row">
                <span class="block">Theme</span>
                <input type="color" value="${this.configuration.theme}" id="theme-picker">
            </div>
            <div class="row">
                <span class="block">Accent</span>
                <input type="color" value="${this.configuration.accent}" id="accent-picker">
            </div>
        `;
    }

    bind() {
        this.theme = document.querySelector('#theme-picker');
        this.accent = document.querySelector('#accent-picker');

        [this.theme, this.accent].forEach(input => {
            input.addEventListener('input', (e) => {
                this._update();
                this._save();
            });
        });
        this._update();
    }

    _update() {
        this.configuration = {
            theme: this.theme.value,
            accent: this.accent.value
        };
        this.setStyleProperty('--theme', this.theme.value);
        this.setStyleProperty('--accent', this.accent.value);
        document.querySelector('meta[name="theme-color"]')
            .setAttribute("content", this.theme.value);
    }

    setStyleProperty(property, value) {
        document.documentElement.style.setProperty(property, value);
    }

    _save() {
        localStorage.setItem(CONFIG_KEY, JSON.stringify(this.configuration));
    }
}

customElements.define('app-settings', AppSettings);