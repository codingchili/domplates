export default class ExportDialog extends HTMLElement {

    static get tag() {
        return 'export-dialog';
    }

    connectedCallback() {
        this.shadow = this.attachShadow({mode: 'open'});
        this.render();
    }

    render() {
        this.shadow.innerHTML = this.template();
        this.bind();
    }

    template() {
        return `
<style>
    :host {
        z-index: 200;
    }
    .hide {
        display: none;
    }
    .container-overlay {
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        background-color: #32323248;
    }
    .container-content {
        transform: translate(-50%, -50%);
        top: 50%;
        position: absolute;
        width: 428px;
        height: 296px;
        background-color: #ffffff;
        border: 2px solid #000;
    }
    .export-formats {
        position: absolute;
        width: 100%;
        bottom: 0px;
    }
    .format {
        height: 48px;
        background-color: var(--accent);
        transition: background-color var(--background-transition);
        cursor: pointer;
        border: 1px solid #00000032;
    }
    .format:hover {
        background-color: var(--theme);
    }
    .format-text {
        text-align: center;
        text-transform: uppercase;
        color: #fff;
        display: block;
        width: 100%;
        top: 12px;
        position: relative;
    }
    .exporter-heading {
        display: block;
        margin-top: 16px;
        margin-left: 32px;
        font-size: 18px;
        text-transform: uppercase;
    }
    .exporter-subtitle {
        width: 80%;
        display: block;
        margin: auto;
        text-align: center;
        white-space: pre-line;
       
    }
</style>

    <div id="root">
        <div id="overlay" class="container-overlay"></div>
        <div class="container-content">
            <span class="exporter-heading">
                export            
            </span>
            <span class="exporter-subtitle">
                Select an output format for downloading. 
                The .pdf format is recommended for most users.            
            </span>
            <div class="export-formats">
                <div class="format" id="print">
                    <span class="format-text">Export to .pdf</span>
                </div>        
                <div class="format" id="html">
                    <span class="format-text">Export to .html</span>
                </div>
            </div>        
        </div>    
    </div>
        `;
    }

    bind() {
        this.root = this.shadowRoot.querySelector('#root');
        this.shadowRoot.querySelector('#print').addEventListener('click', this.print.bind(this));
        this.shadowRoot.querySelector('#html').addEventListener('click', this.html.bind(this));
        this.shadowRoot.querySelector('#overlay').addEventListener('click', () => {
            this.hide();
        });
        this.hide();
    }

     setRenderer(renderer) {
        this.renderer = renderer;
    }

    print() {
        console.log('pdf');
        this.hide();
        print();
    }

    html() {
        // download as html/file
        //console.log(renderer.html());
        let style = document.documentElement.style;
        let data = `
            <style>
                * {
                    --theme: ${style.getPropertyValue('--theme')};
                    --accent: ${style.getPropertyValue('--accent')};
                    --border-color: ${style.getPropertyValue('--border-color')};
                }
            </style>
            ${renderer.html()}
        `;
        console.log(data);
        this.hide();
        let blob = new Blob([data], {type: 'application/html'});
        window.location.href = window.URL.createObjectURL(blob);
    }

    show() {
        this.root.classList.remove('hide');
    }

    hide() {
        this.root.classList.add('hide');
    }
}
customElements.define(ExportDialog.tag, ExportDialog);