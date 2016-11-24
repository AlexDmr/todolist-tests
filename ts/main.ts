import { Component, NgModule }      from "@angular/core";
import { BrowserModule }            from "@angular/platform-browser";
import { ListeChosesModule }        from "./components/ListeChosesModule";
import { platformBrowserDynamic }   from "@angular/platform-browser-dynamic";
import { ListeChosesIHM     } from "./sansFramework/listeChoses_IHM";
import { ListeChosesService } from "@NoyauFonctionnel/service";
import { ListeChoses as ListeChosesNF} 	from "@NoyauFonctionnel/nf";


let PromesseDocumentPret = new Promise( (resolve) => {
    if(document.readyState === "complete") {
        resolve();
    } else {
        document.body.onload = () => resolve();
    }
});


@Component({
    selector		: "demo-m2m",
    template		: `<liste-choses *ngIf="liste" 
                                      titre="L3 liste" 
                                      [nf]="liste" 
                                      [counter]="liste.counterEmit"
                                      ></liste-choses>                        `
})
class CompDemoM2M {
    liste   : ListeChosesNF;
    ngOnInit(): void {
        ListeChosesService.getData().then( (liste) => {
            this.liste = liste;
            console.log( "Liste = ", liste);
        });
    }
}

@NgModule({
    imports:      [ BrowserModule, ListeChosesModule ],
    declarations: [ CompDemoM2M ],
    bootstrap:    [ CompDemoM2M ]
})
export class AppModule {
    constructor() {
        // Juste pour bien lier la version sans framework
        let Pall = Promise.all([ListeChosesService.getData(), PromesseDocumentPret]);
        Pall.then( ([nf]) => {
            new ListeChosesIHM(nf, "#sansFramework");
        });
    }
}

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
