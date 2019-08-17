import { Injectable } from '@angular/core';

interface Scripts {
  name: string;
  src: string;
}
export const ScriptStore: Scripts[] = [
  { name: 'displayselect', src: '../assets/js/loadselect.js' },
  { name: 'dashboard-pro', src: '../assets/js/material-dashboard-pro.js' },
  {name:'navvar',src:'../assets/js/loadsidenav.js'},
  {name:'general',src:'../assets/js/general.js'}
];

declare var document: any;
@Injectable({
  providedIn: 'root'
})
export class DynamicScriptLoaderService {

  private scripts: any = {};

  constructor() {
    ScriptStore.forEach((script: any) => {
      //console.log('ScriptStore',script);
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }

  load(...scripts: string[]) {
    const promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script,'head')));
    return Promise.all(promises);
  }
  loadOnBody(...scripts: string[]){
    const promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script,'body')));
    return Promise.all(promises);
  }

  loadScript(name: string,section:string) {
    return new Promise((resolve, reject) => {
      if (!this.scripts[name].loaded) {
        //load script
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        if (script.readyState) {  //IE
          script.onreadystatechange = () => {
            if (script.readyState === "loaded" || script.readyState === "complete") {
              script.onreadystatechange = null;
              this.scripts[name].loaded = true;
              resolve({script: name, loaded: true, status: 'Loaded'});
            }
          };
        } else {  //Others
          script.onload = () => {
            this.scripts[name].loaded = true;
            resolve({script: name, loaded: true, status: 'Loaded'});
          };
        }
        script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
        document.getElementsByTagName(section)[0].appendChild(script);
      } else {
        console.log('scriptname','Already Loaded');
        resolve({script: name, loaded: true, status: 'Already Loaded'});
      }
    });
  }

}
