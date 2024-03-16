import { Component, Inject, Input, NgZone } from "@angular/core"
import { fromEvent } from "rxjs"

import { BaseEditor } from "../../common/base-editor"
import { NGX_MONACO_EDITOR_CONFIG, NgxMonacoEditorConfig } from "../../common/config"
import { INgxDiffEditor } from "../../common/types"

declare var monaco: any

@Component({
  selector: "ngx-monaco-diff-editor",
  templateUrl: "./diff-editor.component.html",
  styleUrls: ["./diff-editor.component.scss", "../../shared/styles/editor.scss"]
})
export class DiffEditorComponent extends BaseEditor {
  @Input("options") public set options(options: any) {
    this._options = Object.assign({}, this.config.defaultOptions, options)

    if (this._editor) {
      this._editor.dispose()
      this.initMonaco(options, this.insideNg)
    }
  }

  public get options(): any {
    return this._options
  }

  @Input("originalModel") public set originalModel(model: INgxDiffEditor) {
    this._originalModel = model

    if (this._editor) {
      this._editor.dispose()
      this.initMonaco(this.options, this.insideNg)
    }
  }

  @Input("modifiedModel") public set modifiedModel(model: INgxDiffEditor) {
    this._modifiedModel = model

    if (this._editor) {
      this._editor.dispose()
      this.initMonaco(this.options, this.insideNg)
    }
  }

  private _originalModel: INgxDiffEditor
  private _modifiedModel: INgxDiffEditor

  constructor(
    private zone: NgZone,
    @Inject(NGX_MONACO_EDITOR_CONFIG) private editorConfig: NgxMonacoEditorConfig
  ) {
    super(editorConfig)
  }

  protected initMonaco(options: any, insideNg: boolean): void {
    if (!this._originalModel || !this._modifiedModel) {
      throw new Error("originalModel or modifiedModel not found for ngx-monaco-diff-editor")
    }

    this._originalModel.language = this._originalModel.language || options.language
    this._modifiedModel.language = this._modifiedModel.language || options.language

    let originalModel = monaco.editor.createModel(
      this._originalModel.code,
      this._originalModel.language
    )
    let modifiedModel = monaco.editor.createModel(
      this._modifiedModel.code,
      this._modifiedModel.language
    )

    this._editorContainer.nativeElement.innerHTML = ""
    const theme = options.theme

    if (insideNg) {
      this._editor = monaco.editor.createDiffEditor(this._editorContainer.nativeElement, options)
    } else {
      this.zone.runOutsideAngular(() => {
        this._editor = monaco.editor.createDiffEditor(this._editorContainer.nativeElement, options)
      })
    }

    options.theme = theme

    this._editor.setModel({
      original: originalModel,
      modified: modifiedModel
    })

    // refresh layout on resize event.
    if (this._windowResizeSubscription) {
      this._windowResizeSubscription.unsubscribe()
    }

    this._windowResizeSubscription = fromEvent(window, "resize").subscribe(() =>
      this._editor.layout()
    )

    this.onInit.emit(this._editor)
  }
}
