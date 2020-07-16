class CardManager {
    constructor(container = "container") {
        this.container = document.getElementById(container);

        // Cards that are loaded and ready to be added
        this.loadedCards = {};
        // Cards that are currently active and onscreen
        this.cards = [];
    }

    preload(cards) {
        return Promise.all(cards.map((card) => this.load(card)));
    }

    load(cardName) {
        if (this.loadedCards[cardName]) return Promise.resolve();
        else return Promise.all(["index.html", "main.css"].map(fileName => this.loadFile(`/cards/${cardName}/${fileName}`))).then((files) => {
            // Only load html and css
            let card = {};

            files.forEach(({contents, type}) => {
                card[type] = contents;
            });

            this.loadedCards[cardName] = card;
        });
    }

    loadFile(path) {
        return fetch(path).then((req) => {
            if (req.ok) return req.text().then((contents) => {
                return {
                    contents,
                    type: path.match(/^.+\.(\w+)$/)[1]
                }
            });
            else throw new Error(`Problem loading file ${path}`);
        });
    }

    add(cardName, initObject = {}) {
        return this.load(cardName).then(() => {
            // Card has already been loaded
            let el = document.createElement("div");
            el.id = `card_${cardName}`;
    
            // Add the html
            el.innerHTML = this.loadedCards[cardName].html;
    
            // Add the css
            let style = document.createElement("style");
            style.type = "text/css";
            style.innerText = this.loadedCards[cardName].css;
            el.appendChild(style);
    
            // Load the JS and initialise the element with it
            return import(`/cards/${cardName}/main.js`).then(({init, update}) => {
                // Run the init function passing the element and the object
                if (init) init(el, initObject);
                else console.error(`No init function exported for card ${cardName}`);

                if (!update) console.error(`No update function exported for card ${cardName}`);
    
                this.cards.push({
                    type: cardName,
                    update,
                    el
                });

                this.container.appendChild(el);
            }).catch((e) => {
                console.error(`Card ${cardName} either doesn't export anything`);
                console.error(e);
            });
        });
    }

    clear() {
        this.cards.forEach((card) => {
            card.el.remove();
        });
        this.cards = [];
    }

    remove(identifier) {
        // TODO: Implement remove function to remove a card
    }
}

export {CardManager};