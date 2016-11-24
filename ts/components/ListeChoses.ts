import {Component, Input, ChangeDetectionStrategy, OnInit, DoCheck } from "@angular/core";
import {Chose, ListeChoses as ListeChosesNF} 	            from "@NoyauFonctionnel/nf";

const htmlTemplate = `
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

let msgBanco = new SpeechSynthesisUtterance();
msgBanco.text = "Banco! on a réussit";
msgBanco.lang = "fr-FR";
let msgNoBanco = new SpeechSynthesisUtterance();
msgNoBanco.text = "Ho non !";
msgNoBanco.lang = "fr-FR";

let mapSpeech = new Map<boolean, SpeechSynthesisUtterance>();
mapSpeech.set(true , msgBanco  );
mapSpeech.set(false, msgNoBanco);


type filterChose = (c : Chose) => boolean;
@Component({
  selector		: "liste-choses",
  template		: htmlTemplate,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListeChoses implements OnInit, DoCheck {
    @Input() titre	    : string;
    @Input()    nf      : ListeChosesNF;
    @Input() counter    : number;
    originalTitre       : string;
    filtre              : filterChose;
    choses              : Chose[];
    private nbCheck     : number = 0;
    newTodoText         : string = "";
    filtreTous          : filterChose = (c) => true;
    filtreFait          : filterChose = (c) => c.fait;
    filtreNonFait       : filterChose = (c) => !c.fait;
	constructor		() {
		this.filtre = this.filtreTous;
        this.choses = [];
	};
    Banco           (val: boolean) {
        console.log( "banco", val, this);
        speechSynthesis.speak( mapSpeech.get(val) );
        this.titre = val?"Banco!!!":this.originalTitre;
    }
	Ajouter			(texte: string) {this.nf.Ajouter(texte);}
	Retirer			(chose: Chose ) {this.nf.Retirer(chose);}
    Nbchoses() : number {
        return this.choses.length;
    }
	NbchosesAFaire() : number {
        return this.choses.filter( c => !c.fait ).length;
    }
	toutEstFait() : boolean {
        return this.NbchosesAFaire() === 0;
    }
    toutFaireOuDefaire() {
        let b = !this.toutEstFait();
        this.choses.forEach( c => c.Fait(b) );
    }
    getChoses() : Chose[] {
        return this.choses.filter( this.filtre );
    }
    disposeFait() {
        this.choses.filter( c => c.fait ).forEach( c => c.dispose() );
    }

    // ----------------- Moments du cycle de vie -----------------------------------------------------------------------
    ChoseChanged(c: Chose) {
        console.log( "Chose", c, "à changée" );
    }
    ngDoCheck() {
        this.nbCheck++;
    }
    ngOnInit(): void {
        console.log( "Init liste with", this.titre, this.nf);
        this.choses = this.nf.choses;
    }
}

