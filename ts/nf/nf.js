System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var NF, Chose, ListeChoses;
    return {
        setters:[],
        execute: function() {
            NF = class NF {
                constructor() {
                    this.counterEmit = 0;
                    this.cbList = new Map();
                }
                emit(eventName, value) {
                    this.counterEmit++;
                    if (this.cbList.has(eventName)) {
                        let array = this.cbList.get(eventName);
                        array.forEach(cb => cb(this, eventName, value));
                    }
                    return this;
                }
                on(eventName, cb) {
                    if (this.cbList.has(eventName)) {
                        let array = this.cbList.get(eventName);
                        array.push(cb);
                    }
                    else {
                        this.cbList.set(eventName, [cb]);
                    }
                    return this;
                }
                off(eventName, cb) {
                    if (this.cbList.has(eventName)) {
                        let array = this.cbList.get(eventName);
                        array.splice(array.indexOf(cb), 1);
                    }
                    return this;
                }
            };
            Chose = class Chose extends NF {
                constructor(texte, liste, fait = false, date = null) {
                    super();
                    this.texte = texte;
                    this.date = date || new Date(Date.now());
                    this.fait = fait || false;
                    this.liste = liste;
                }
                dispose() {
                    this.liste.Retirer(this);
                }
                Texte(texte) {
                    this.texte = texte;
                    this.emit("update", { texte: texte });
                    return this;
                }
                Fait(fait) {
                    this.fait = fait;
                    this.emit("update", { fait: fait });
                    return this;
                }
                emit(eventName, data) {
                    if (this.liste) {
                        this.liste.counterEmit++;
                    }
                    return super.emit(eventName, data);
                }
            };
            exports_1("Chose", Chose);
            ListeChoses = class ListeChoses extends NF {
                constructor() {
                    super();
                    this.choses = [];
                }
                Ajouter(texte, fait = false, date = null) {
                    let chose = new Chose(texte, this, fait, date);
                    this.choses.push(chose);
                    this.emit("update", { append: chose });
                    return this;
                }
                Retirer(chose) {
                    this.choses.splice(this.choses.indexOf(chose), 1);
                    this.emit("update", { remove: chose });
                    return this;
                }
            };
            exports_1("ListeChoses", ListeChoses);
        }
    }
});
//# sourceMappingURL=nf.js.map