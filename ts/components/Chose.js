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
    var htmlTemplate, ItemChose;
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
            ItemChose = class ItemChose {
                constructor() {
                    this.onBanco = new core_1.EventEmitter();
                    this.editing = false;
                    this.newTextValue = "";
                    this.modeBanco = false;
                    this.nbCheck = 0;
                }
                //constructor() {}
                dispose() {
                    this.nf.dispose();
                }
                edit() {
                    this.editing = true;
                    this.newTextValue = this.nf.texte;
                    requestAnimationFrame(() => { this.newTextInput.nativeElement.focus(); });
                }
                setText(texte) {
                    this.editing = false;
                    this.nf.Texte(texte);
                }
                setFait(fait) {
                    this.nf.Fait(fait);
                }
                // ----------------- Moments du cycle de vie -----------------------------------------------------------------------
                ngOnInit() {
                    console.log("ngOnInit", this.nf.texte);
                    this.nf.on("update", () => {
                        let newModeBanco = this.nf.texte === "banco";
                        if (this.modeBanco !== newModeBanco) {
                            this.modeBanco = newModeBanco;
                            this.onBanco.emit(newModeBanco);
                        }
                    });
                }
                ngDoCheck() {
                    this.nbCheck++;
                }
                ngOnDestroy() {
                    console.log("ngOnDestroy", this.nf.texte);
                }
            };
            __decorate([
                core_1.Input("nf"), 
                __metadata('design:type', nf_1.Chose)
            ], ItemChose.prototype, "nf", void 0);
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Number)
            ], ItemChose.prototype, "counter", void 0);
            __decorate([
                core_1.Output("on-banco"), 
                __metadata('design:type', core_1.EventEmitter)
            ], ItemChose.prototype, "onBanco", void 0);
            __decorate([
                core_1.ViewChild("newText"), 
                __metadata('design:type', core_1.ElementRef)
            ], ItemChose.prototype, "newTextInput", void 0);
            ItemChose = __decorate([
                core_1.Component({
                    selector: "item-chose",
                    template: htmlTemplate,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                }), 
                __metadata('design:paramtypes', [])
            ], ItemChose);
            exports_1("ItemChose", ItemChose);
        }
    }
});
//# sourceMappingURL=Chose.js.map