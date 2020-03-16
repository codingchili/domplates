export default class TabSelect extends HTMLElement {

    static get tag() {
        return 'tab-select';
    }

    constructor() {
        super();
    }

    connectedCallback() {
        //this.shadow = this.attachShadow({mode: 'open'});
        let style = document.createElement('style');
        style.innerHTML = `
        <style>
                :host {
                    position: absolute;
                    left: 0px;
                    top: 0px;
                    right: 0px;
                    bottom: 0px;
                    /* bottom: 0px; */
                    /* z-index: 101; */
            }
            
            .tab-heading {
                position: absolute;
                display: flex;
                justify-content: space-between;
                height: 48px;
                background-color: var(--theme);
                border-bottom: 1px solid #00000088;
                top: 0px;
                left: 0px;
                right: 0px;
            }
        
                .tab-item {
                    color: #ffffff88;
                    text-align: center;
                    text-transform: uppercase;
                    padding-left: 8px;
                    padding-right: 8px;
                    cursor: pointer;
                    flex-grow: 1;
                    user-select: none;
                    transition: background-color var(--background-transition);
                }
                .tab-item:hover {
                    background-color: var(--accent);
                }
                .tab-label {
                    margin-top: 12px;
                    display: block;
                }
                .active {
                    background-color: var(--accent);
                    color: #ffffff;
                }
            </style>
        `;
        this.heading = document.createElement('div');
        this.heading.classList.add('tab-heading');
        //this.shadow.appendChild(this.heading);
        this.appendChild(this.heading);

        for (let content of this.querySelectorAll('div[data-tab]')) {
            let tab = document.createElement('div');
            tab.classList.add('tab-item');
            tab.dataset.label = content.dataset.tab;
            tab.innerHTML = `
                            <span class="tab-label">
                                ${content.dataset.tab}
                            </span>
                            `;
            if (!content.dataset.active) {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
                tab.classList.add('active');
            }
            this.heading.appendChild(tab);
        }
        this.container = document.createElement('div');
        this.container.id = 'container';
        this.appendChild(style);
        //this.shadow.appendChild(style);
        //this.shadow.appendChild(this.container);
        this.container.style.height = '48px';
        this.prepend(this.container);
        this.bind();
    }

    select(name, skipevents) {
        let tab = this.querySelector(`[data-label=${name}]`);

        this.querySelectorAll('.tab-item').forEach(item => {
            item.classList.remove('active');
        });
        this.querySelectorAll('div[data-tab]').forEach(previous => {
            previous.style.display = 'none';
        });
        tab.classList.add('active');
        this.content = this.querySelector(`div[data-tab="${tab.dataset.label}"]`);
        this.content.style.display = 'block';

        if (this.content.dataset.event && !skipevents) {
            window.dispatchEvent(new Event(this.content.dataset.event));
        }
    }

    bind() {
        let tabs = this.querySelectorAll('.tab-item');
        ['mousedown', 'touchstart'].forEach(event => {
            tabs.forEach(tab => {
                tab.addEventListener(event, (e) => {
                    e.stopPropagation();
                    this.select(tab.dataset.label);
                    e.preventDefault();
                });
            })
        })
    }
}

customElements.define(TabSelect.tag, TabSelect);