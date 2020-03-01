import measure from "./performance.js";

const METADATA_NAME = 'datasets.metadata';
const DEFAULT_NAME = 'default';

export default class DataSet {

    constructor() {
        measure('initialize datasets', () => {
            this.metadata = this._load(METADATA_NAME, {
                partitions: [DEFAULT_NAME],
                selected: DEFAULT_NAME
            });
            this.selected = this._load(this.metadata.selected, {
                partition: DEFAULT_NAME
            });
        });
    }

    _load(storeName, defaultValue) {
        let loaded = localStorage.getItem(storeName);
        if (loaded) {
            loaded = JSON.parse(loaded);
        } else {
            loaded = defaultValue;
            localStorage.setItem(storeName, JSON.stringify(loaded));
        }
        return loaded;
    }

    set(key, value) {
        this.selected[key] = value;
        this._save();
    }

    get(key) {
        if (key) {
            return this.selected[key] || "";
        } else {
            return "";
        }
    }

    current() {
        return this.selected.partition;
    }

    remove(store) {
        let partitions = this.metadata.partitions;

        // remove datastore from metadata.
        let index = partitions.indexOf(store);
        this.metadata.partitions.splice(index, 1);

        // remove sensitive stored information.
        localStorage.removeItem(this.selected.partition);

        this._saveMetadata();
    }

    open(partition) {
        for (let store of this.metadata.partitions) {
            if (store === partition) {
                this.selected = JSON.parse(localStorage.getItem(partition));
                this._updateMetadata(this.selected);
                return;
            }
        }
        let created = {partition: partition};
        this.selected = created;
        this._updateMetadata(created, true);
        this._save();
    }

    _updateMetadata(current, created) {
        if (created) {
            this.metadata.partitions.push(current.partition);
            this.metadata.partitions.sort();
        }
        this.metadata.selected = current.partition;
        this._saveMetadata();
    }

    _saveMetadata() {
        setTimeout(() => {
            localStorage.setItem(METADATA_NAME, JSON.stringify(this.metadata));
        }, 64);
    }

    _save() {
        setTimeout(() => {
            // split stores into store list + store data to avoid serializing ALL stores on save
            localStorage.setItem(this.selected.partition, JSON.stringify(this.selected));
        }, 32);
    }

    list() {
        return this.metadata.partitions;
    }
}