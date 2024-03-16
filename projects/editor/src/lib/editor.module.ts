import { CommonModule } from "@angular/common"
import { ModuleWithProviders, NgModule } from "@angular/core"

import { NGX_MONACO_EDITOR_CONFIG, NgxMonacoEditorConfig } from "./common/config"
import { DiffEditorComponent } from "./components/diff-editor.component"
import { EditorComponent } from "./components/editor.component"

@NgModule({
  imports: [CommonModule],
  declarations: [EditorComponent, DiffEditorComponent],
  exports: [EditorComponent, DiffEditorComponent]
})
export class MonacoEditorModule {
  public static forRoot(
    config: NgxMonacoEditorConfig = {}
  ): ModuleWithProviders<MonacoEditorModule> {
    return {
      ngModule: MonacoEditorModule,
      providers: [{ provide: NGX_MONACO_EDITOR_CONFIG, useValue: config }]
    }
  }
}
