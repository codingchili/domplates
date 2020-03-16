export class TemplateThumbnail extends HTMLElement {

    connectedCallback() {
        this.template = this.getAttribute('for');
        this.render();
    }

    render() {
        this.innerHTML = `
            <style>            
                .thumbnail {
                    margin: 16px;
                    width: 96px;
                    height: 96px;
                    cursor: pointer;
                    box-shadow: 2px 2px 4px 0px rgba(0,0,0,0.75);
                }
                .thumbnail:hover .template-name {
                    background-color: var(--accent); 
                }
                .template-name {
                    background-color: var(--theme);
                    transition: background-color var(--background-transition);
                    text-transform: uppercase;
                    opacity: 0.999;
                    text-align: center;
                    display: block;
                    margin-top: -31px;
                }
                .name-content {
                    opacity: 1;
                    color: #ffffff;
                }
                img {
                    width: 96px;
                    height: 96px;
                }
                .active {
                    color: var(--accent);
                }
            </style>

            <div class="thumbnail">
                <img src="img/template.png">
                <div class="template-name">
                    <span class="name-content">${this.template}</span>
                </div>
            </div>        
        `;
    }

    getTemplate() {
        return this.template;
    }

    setActive(active) {
        let name = this.querySelector('.template-name');
        if (active) {
            name.classList.add('active')
        } else {
            name.classList.remove('active');
        }
    }
}

customElements.define("template-thumbnail", TemplateThumbnail);