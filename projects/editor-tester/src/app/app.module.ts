import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { BrowserModule } from "@angular/platform-browser"

import { AppComponent } from "./app.component"
import { NgxMonacoEditorConfig } from "../../../editor/src/lib/common/config"
import { NgxMonacoEditorModule } from "../../../editor/src/lib/editor.module"

import { AngularSplitModule } from "angular-split"

// example components
import { SwitchLanguageComponent } from "./examples/switch-language/switch-language.component"
import { DiffEditorComponent } from "./examples/diff-editor/diff-editor.component"
import { JsonEditorComponent } from "./examples/json-editor/json-editor.component"
import { SplitterExampleComponent } from "./examples/splitter-example/splitter-example.component"

const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: "/assets",
  defaultOptions: {
    scrollBeyondLastLine: false,
    baseUrl: "/assets"
  }
}

@NgModule({
  declarations: [
    AppComponent,
    SwitchLanguageComponent,
    DiffEditorComponent,
    JsonEditorComponent,
    SplitterExampleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxMonacoEditorModule.forRoot(monacoConfig),
    AngularSplitModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
