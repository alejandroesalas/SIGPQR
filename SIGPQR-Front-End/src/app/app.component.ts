import {Component, OnInit} from '@angular/core';
import {DynamicScriptLoaderService} from "./services/dynamic-script-loader.service";
declare var load;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'SIGPQR';
constructor(private dynamicScriptLoader: DynamicScriptLoaderService){

}
  ngOnInit() {
  load();
    //this.loadScript('../assets/js/loadselect.js');
    //this.loadScript('../assets/js/material-dashboard-pro.js');
    //this.loadScripts();
  }
  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.loadOnBody('general').then(data => {
      // Script Loaded Successfully
    }).catch(error => console.log(error));
  }
  //
  //"node_modules/material-dashboard/assets/js/material-dashboard-pro.js",
  //"node_modules/jquery/dist/loadselect.js"
  public loadScript(url:string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
}





