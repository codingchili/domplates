import DataSet from "./dataset.js";

export default class DatasetSelector extends HTMLElement {

    constructor() {
        super();
        if (!DatasetSelector.store) {
            DatasetSelector.store = new DataSet();
            DatasetSelector.callbacks = [];
        }
    }

    static get persistence() {
        return DatasetSelector.store;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
                <style>
                    #dataset-selector {
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                    }
                    .dataset-item {
                        color: #ffffff;
                        width: 104px;
                        height: 24px;
                        padding: 4px;
                        margin: 2px;
                        text-align: center;
                        background-color: var(--theme);
                        user-select: none;
                        transition: background-color 0.2s;
                    }
                    .selected {
                        background-color: var(--accent);
                    }
                    .icon {
                        width: 32px;
                        height: 32px;
                        cursor: pointer;
                    }
                    .icon-set {
                        display: flex;
                        flex-direction: row;
                        margin-right: 4px;
                    }
                    #flex-container {
                        margin-left: 32px;
                        margin-right: 32px;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        min-height: 42px;
                        border-bottom: 1px solid #00000064;
                    }
                    #remove-store {
                        /*margin-top: 4px;*/
                    }
                    #add-box, #remove-box {
                        position: relative;
                        margin-top: 2px;
                    }
                    #add-box:hover .tooltip {
                        opacity: 1.0;
                        visibility: visible;
                    }
                    #remove-box:hover .tooltip {
                        opacity: 1.0;
                        visibility: visible;
                    }
                </style>
                
                <div id="flex-container">
                    <div id="dataset-selector">
                            ${DatasetSelector.store.list().map(store => {
            return `<div class="${DatasetSelector.store.current() === store ? 'selected' : ''} dataset-item" data-id="${store}">
                                            ${store}
                                        </div>`;
        }).join('')
        }
                    </div>
                    <div class="icon-set">
                        <div id="remove-box">
                            <img class="icon" style="display: ${DatasetSelector.store.current() === 'default' ? 'none' : 'block'}" src="icon/delete.svg" id="remove-store">
                            <div class="tooltip">
                                Remove current data set                           
                            </div>
                        </div>
                        <div id="add-box">
                            <img class="icon" src="icon/add.svg" id="add-store">
                            <div class="tooltip">
                                Add a new data set                           
                            </div>
                        </div>
                    </div>
                </div>
        `;
        for (let element of this.querySelectorAll('[data-id]')) {
            ['mousedown', 'touchstart'].forEach(event => {
                element.addEventListener(event, () => {
                    this._select(element.dataset.id);
                });
            });
        }
        this.querySelector('#add-store').addEventListener('click', () => {
            let value = prompt('Name of new dataset');
            if (value) {
                this._select(value);
                this.render();
            }
        });
        this.querySelector('#remove-store').addEventListener('click', () => {
            if (DatasetSelector.store.current() !== 'default') {
                let store = DatasetSelector.store.current()
                DatasetSelector.store.remove(store);
                this._select('default');
                this.querySelector(`div[data-id="${store}"]`).remove();
            }
        });
    }

    _select(store) {
        if (store === 'default') {
            this.querySelector('#remove-store').style.display = 'none';
        } else {
            this.querySelector('#remove-store').style.display = 'block';
        }

        for (let callback of DatasetSelector.callbacks) {
            callback(store);
        }
    }

    onStoreChanged(callback) {
        DatasetSelector.callbacks = [callback];
    }

    setStore(datastore) {
        DatasetSelector.store = datastore;

        for (let item of this.querySelectorAll('.dataset-item')) {
            if (item.dataset.id !== datastore.metadata.selected) {
                item.classList.remove('selected');
            } else {
                item.classList.add('selected');
            }
        }
    }

}
customElements.define('dataset-selector', DatasetSelector);