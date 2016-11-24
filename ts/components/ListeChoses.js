System.register(["@angular/core", "@NoyauFonctionnel/nf"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, nf_1;
    var htmlTemplate, msgBanco, msgNoBanco, mapSpeech, ListeChoses;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (nf_1_1) {
                nf_1 = nf_1_1;
            }],
        execute: function() {
            htmlTemplate = `
	<section class="todoapp">
		<header class="header">
			<h1>{{nbCheck}}/{{counter}}:{{titre}}</h1>
			<form (ngSubmit)="Ajouter(newTodo.value); newTodo.value='';">
				<input  class="new-todo" placeholder="Que faire?" 
				        type="text" name="newTodoText"
				        #newTodo
				        [(ngModel)] = "newTodoText"
				        autofocus>
			</form>
		</header>
		<section class="main">
			<input  class="toggle-all" 
			        type="checkbox"
			        [ngModel]="toutEstFait()"
			        (ngModelChange)="toutFaireOuDefaire()"
			        />
			<label for="toggle-all">Mark all as complete</label>
			<ul class="todo-list" *ngIf="nf">
			    <li *ngFor="let chose of getChoses()" 
			        [class.editing]     = "item.editing" 
			        [class.completed]   = "chose.fait"
			        >
			        <item-chose #item 
			                    [nf]        = "chose" 
			                    (on-banco)  = "Banco($event)"
			                    [counter]   = "chose.counterEmit"
			                    ></item-chose>
                </li>
            </ul>
		</section>
        <footer class="footer">
            <span class="todo-count"><strong>{{NbchosesAFaire()}}/{{Nbchoses()}}</strong> restantes</span>
            <ul class="filters">
                <li>
                    <a  [class.selected]="filtre === filtreTous" 
                        (click)="filtre = filtreTous" >Tous</a>
                </li>
                <li>
                    <a  [class.selected]="filtre === filtreNonFait"
                        (click)="filtre = filtreNonFait">Actifs</a>
                </li>
                <li>
                    <a  [class.selected]="filtre === filtreFait"
                        (click)="filtre = filtreFait"
                        >Complétés</a>
                </li>
            </ul>
            <button class="clear-completed"
                    (click)="disposeFait()"
                    >Supprimer cochées</button>
        </footer>
	</section>
	newTodoText: {{newTodoText}}
	<hr/>
`;
            msgBanco = new SpeechSynthesisUtterance();
            msgBanco.text = "Banco! on a réussit";
            msgBanco.lang = "fr-FR";
            msgNoBanco = new SpeechSynthesisUtterance();
            msgNoBanco.text = "Ho non !";
            msgNoBanco.lang = "fr-FR";
            mapSpeech = new Map();
            mapSpeech.set(true, msgBanco);
            mapSpeech.set(false, msgNoBanco);
            ListeChoses = class ListeChoses {
                constructor() {
                    this.nbCheck = 0;
                    this.newTodoText = "";
                    this.filtreTous = (c) => true;
                    this.filtreFait = (c) => c.fait;
                    this.filtreNonFait = (c) => !c.fait;
                    this.filtre = this.filtreTous;
                    this.choses = [];
                }
                ;
                Banco(val) {
                    console.log("banco", val, this);
                    speechSynthesis.speak(mapSpeech.get(val));
                    this.titre = val ? "Banco!!!" : this.originalTitre;
                }
                Ajouter(texte) { this.nf.Ajouter(texte); }
                Retirer(chose) { this.nf.Retirer(chose); }
                Nbchoses() {
                    return this.choses.length;
                }
                NbchosesAFaire() {
                    return this.choses.filter(c => !c.fait).length;
                }
                toutEstFait() {
                    return this.NbchosesAFaire() === 0;
                }
                toutFaireOuDefaire() {
                    let b = !this.toutEstFait();
                    this.choses.forEach(c => c.Fait(b));
                }
                getChoses() {
                    return this.choses.filter(this.filtre);
                }
                disposeFait() {
                    this.choses.filter(c => c.fait).forEach(c => c.dispose());
                }
                // ----------------- Moments du cycle de vie -----------------------------------------------------------------------
                ChoseChanged(c) {
                    console.log("Chose", c, "à changée");
                }
                ngDoCheck() {
                    this.nbCheck++;
                }
                ngOnInit() {
                    console.log("Init liste with", this.titre, this.nf);
                    this.choses = this.nf.choses;
                }
            };
            __decorate([
                core_1.Input(), 
                __metadata('design:type', String)
            ], ListeChoses.prototype, "titre", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', nf_1.ListeChoses)
            ], ListeChoses.prototype, "nf", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Number)
            ], ListeChoses.prototype, "counter", void 0);
            ListeChoses = __decorate([
                core_1.Component({
                    selector: "liste-choses",
                    template: htmlTemplate,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                }), 
                __metadata('design:paramtypes', [])
            ], ListeChoses);
            exports_1("ListeChoses", ListeChoses);
        }
    }
});
//# sourceMappingURL=ListeChoses.js.map