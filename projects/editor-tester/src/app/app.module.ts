import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { BrowserModule } from "@angular/platform-browser"

import { AppComponent } from "./app.component"
import { NgxMonacoEditorConfig } from "../../../editor/src/lib/common/config"
import { NgxMonacoEditorModule } from "../../../editor/src/lib/editor.module"
import { SwitchLanguageComponent } from "./examples/switch-language/switch-language.component"
import { DiffEditorComponent } from "./examples/diff-editor/diff-editor.component"

const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: "/assets",
  defaultOptions: {
    scrollBeyondLastLine: false,
    baseUrl: "/assets"
  }
}

@NgModule({
  declarations: [AppComponent, SwitchLanguageComponent, DiffEditorComponent],
  imports: [BrowserModule, FormsModule, NgxMonacoEditorModule.forRoot(monacoConfig)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
