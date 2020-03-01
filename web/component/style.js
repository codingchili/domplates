export default class ApplicationStyle extends HTMLElement {

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = ApplicationStyle.template;
    }

    static get template() {
        return `
        <style>
            body, html {
                overflow-x: hidden;
                background-color: var(--theme);
            }
            
            h1[md],h2[md],h3[md],h4[md],h5[md],h6[md],hr {
               margin-bottom: -16px;
            }
            
            input[type="color"] {
                -webkit-appearance: none;
                border: none;
                width: 32px;
                height: 32px;
            }
            
            input[type="color"]:focus {
                outline: none;
            }
            
            input[type="color"]::-webkit-color-swatch-wrapper {
                padding: 0;
            }
            
            input[type="color"]::-webkit-color-swatch {
                border: none;
            }
            
            a:link {
                color: #00798a;
                text-decoration: none;
            }
            
            a:visited {
                color: #00798a;
            }
            
            a:hover {
                color: #005263;
            }
            
            a:active {
                color: #00798a;
            }
            
            ::selection {
                background: #00798a; /* WebKit/Blink Browsers */
                color: #ffffff;
            }
            
            ::-moz-selection {
                background: #00798a; /* Gecko Browsers */
                color: #ffffff;
            }
            
            /* width */
            ::-webkit-scrollbar {
                width: 4px;
            }
            
            /* Track */
            ::-webkit-scrollbar-track {
                /*background: rgba(0, 0, 0, 0.3);*/
            }
            
            /* Handle */
            ::-webkit-scrollbar-thumb {
                background: #00798a;
            }
            
            /* Handle on hover */
            ::-webkit-scrollbar-thumb:hover {
                background: #00c7cb;
            }
            
            textarea {
                min-height: unset;
            }
            
            #resume {
                width: 90%;
                max-width: 800px;
                min-width: 800px;
                background: #ffffff;
                margin: 28px auto;
                margin-bottom: 48px; /* compensate for application bar */
                margin-top: 48px;
                padding-bottom: 8px;
                position: relative;
                font-family: 'Rokkitt', Helvetica, Arial, sans-serif;
                border: 2px solid #000000;
                font-size: 16px;
                min-height: 28.4cm;
            }
            
            @media print {
                #resume {
                    width: 100%;
                    border: none;
                    margin-bottom: 0px;
                }
            }
            
            p, p[data-id], span[data-id], li[data-id], div[data-id], img[data-id] {
                cursor: pointer;
                border-radius: 3px;
                padding-right: 2px;
                padding-left: 2px;
            }
            
            p[data-id]:hover, span[data-id]:hover, li[data-id]:hover, div[data-id]:hover, img[data-id]:hover {
                background-color: var(--accent);
                color: #f5f5f5 !important;
                transition: background-color 0.4s;
            }
            
            .tooltip {
                position: absolute;
                background-color: #005263;
                color: #ffffffff;
                padding: 6px;
                border-radius: 4px;
                width: max-content;
                user-select: none;
                opacity: 0.0;
                transition: opacity 0.2s;
                border: 2px solid #32323272;
                top: -5px;
                left: 105%;
                visibility: hidden;
                z-index: 100;
            }
            
            p:hover h1 {
                color: white !important;
            }
            
            p:hover h2 {
                color: white !important;
            }
            
            p:hover h3 {
                color: white !important;
            }
            
            p:hover h4 {
                color: white !important;
            }
            
            p:hover h5 {
                color: white !important;
            }
            
            p:hover h6 {
                color: white !important;
            }
            
            code {
                background-color: #00000010;
                padding-left: 2px;
                padding-right: 2px;
                font-size: 13px !important;
                font-family: Menlo,Monaco,Consolas,"Courier New",monospace !important;
            }
            
            code > * {
                font-size: 13px !important;
                font-family: Menlo,Monaco,Consolas,"Courier New",monospace !important;            
            }

            .block {
                width: 100%;
                display: block;
                line-height: 12px;
                padding: 4px;
                white-space: pre;
                border-radius: 4px;
            }
            
            .keyword {
                font-weight: bold;
                color: darkorange;
            }
            
            .symbol {
                font-weight: bold;
            }
            
            .string {
                color: darkgreen;
            }
            
            .comment {
                color: gray; 
            }
            
            .number {
                color: orangered;
            }
            
            .annotation {
                color: #004d5f;
                font-family: Consolas, monaco, monospace;
                font-size: 13px; 
                font-weight: bold;
            }
            
            .icon {
                width: 32px;
                height: 32px;
            }
            
            .icon:hover {
                cursor: pointer;
                background-color: rgba(0, 121, 138, 0.15);
                transition: background-color 0.4s;
                border-radius: 12px;
            }
            </style>
        `;
    }
}
customElements.define('application-style', ApplicationStyle);