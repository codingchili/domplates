export class TemplateList extends HTMLElement {

    constructor() {
        super();
        this.templates = ['basic', 'testing', 'rduda', 'jbloe2'];
    }

    connectedCallback() {
        this.current = localStorage.getItem('template');
        this.render();
        this.bind();
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
            return `<template-thumbnail for="${template}">
                    </template-thumbnail>
            `;
        }).join('')
        }
            </div>
        `;
    }

    bind() {
        let thumbnails = this.querySelectorAll('template-thumbnail');
        thumbnails.forEach(thumbnail => {

            if (thumbnail.attributes['for'].value === this.current) {
                thumbnail.setActive(true);
                setTemplate(thumbnail);
            }

            ['mousedown', 'touchstart'].forEach(event => {
                thumbnail.addEventListener(event, () => {
                    thumbnails.forEach(thumbnail => {
                        thumbnail.setActive(false);
                    });
                    thumbnail.setActive(true);
                    this._save(thumbnail.attributes['for'].value);
                    setTemplate(thumbnail);
                });
            })
        });
        if (!this.current) {
            this.current = thumbnails[0].attributes['for'].value;
            setTemplate(thumbnails[0]);
        }
    }

    _save(template) {
        this.current = template;
        localStorage.setItem('template', template)
    }
}

customElements.define('template-list', TemplateList);