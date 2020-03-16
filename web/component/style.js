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
            :root {
                --background-transition: 0.32s;
            }
        
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
                color: var(--accent);
                text-decoration: none;
            }
            
            a:visited {
                color: var(--accent);
            }
            
            a:hover {
                color: var(--accent);
                opacity: 0.5;
            }
            
            a:active {
                var(--accent);
            }
            
            ::selection {
                background: var(--accent); /* WebKit/Blink Browsers */
                color: #ffffff;
            }
            
            ::-moz-selection {
                background: var(--accent);; /* Gecko Browsers */
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
                background: var(--accent);
            }
            
            /* Handle on hover */
            ::-webkit-scrollbar-thumb:hover {
                background: var(--accent);
                opacity: 0.5;
            }
            
            .button {
                color: #ffffff;
                height: 48px;
                padding: 4px;
                text-align: center;
                background-color: var(--theme);
                user-select: none;
                transition: background-color var(--background-transition);
                font-size: 12px;
            }
            
            .button:hover {
                background-color: var(--accent);
                color: #fff;
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
                transition: background-color var(--background-transition);
            }
            
            .tooltip {
                position: absolute;
                background-color: #000;
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
                background-color: var(--accent);
                transition: background-color var(--background-transition);
                border-radius: 12px;
            }
            </style>
        `;
    }
}
customElements.define('application-style', ApplicationStyle);