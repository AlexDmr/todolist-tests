import { Component, Input, Output, EventEmitter, ViewChild, ElementRef,
    OnInit, OnDestroy, DoCheck,
    ChangeDetectionStrategy
} from "@angular/core";
import {Chose} from "@NoyauFonctionnel/nf";

const htmlTemplate = `
	<div class="view">
		<input 	class			= "toggle" 
				type			= "checkbox" 
				name			= "fait"
				[ngModel]		= "nf.fait" 
				(ngModelChange)	= "setFait($event)"/>
		<label 	class="texte"
				(dblclick)="edit();"
				>{{nbCheck}} : {{nf.texte}}</label>
		<button class="destroy" (click)="dispose()"></button>
	</div>
	<form (ngSubmit)="setText(newText.value)" *ngIf="editing">
		<input 	class		= "edit"
				(blur)		= "editing = false;"
				name		= "newTextValue"
				[ngModel]	= "newTextValue"
				#newText
				/>
	</form>
`;

@Component({
  selector		: "item-chose",
  template		: htmlTemplate,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemChose implements OnInit, OnDestroy, DoCheck {
    @Input ("nf" ) nf   : Chose;
    @Input() counter    : number;
	@Output("on-banco" ) onBanco : EventEmitter<boolean> = new EventEmitter<boolean>();
	@ViewChild("newText") newTextInput : ElementRef;
	editing			    : boolean = false;
	newTextValue	    : string = "";
    private modeBanco   : boolean = false;
    private nbCheck     : number = 0;
	//constructor() {}
	dispose	() {
		this.nf.dispose();
	}
	edit() {
		this.editing 		= true;
		this.newTextValue	= this.nf.texte;
		requestAnimationFrame( () => {this.newTextInput.nativeElement.focus();} );
	}
	setText( texte: string ) {
		this.editing 	= false;
		this.nf.Texte( texte );
	}
	setFait( fait: boolean ) {
		this.nf.Fait( fait );
	}
	// ----------------- Moments du cycle de vie -----------------------------------------------------------------------
    ngOnInit(): void {
        console.log( "ngOnInit", this.nf.texte );
        this.nf.on("update", () => {
            let newModeBanco = this.nf.texte === "banco";
            if(this.modeBanco !== newModeBanco) {
                this.modeBanco = newModeBanco;
                this.onBanco.emit( newModeBanco );
            }
        });
    }
    ngDoCheck() {
        this.nbCheck++;
    }
    ngOnDestroy(): void {
        console.log( "ngOnDestroy", this.nf.texte );
    }
}

