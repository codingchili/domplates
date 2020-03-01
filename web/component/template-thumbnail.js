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
                .thumbnail:hover {
                    opacity: 0.64;
                    transition: opacity 0.4s;
                }
                .template-name {
                    background-color: var(--theme);
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
}

customElements.define("template-thumbnail", TemplateThumbnail);