export class TemplateList extends HTMLElement {

    constructor() {
        super();
        this.templates = ['basic', 'testing', 'rduda', 'jbloe2'];
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <style>
            #templates-list {
                display: flex;
                flex-direction: row;
                justify-content: center;
                flex-wrap: wrap;
            }
            
            @media print {
                #templates {
                    display: none;
                }       
            }
            </style>
            <div id="templates-list">
                ${this.templates.map(template => {
            return `<template-thumbnail for="${template}" onmousedown="setTemplate(this)" ontouchstart="setTemplate(this)"></template-thumbnail>`;
        }).join('')
        }
            </div>
        `;
    }
}

customElements.define('template-list', TemplateList);