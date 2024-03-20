import { MonacoTextmateLoader } from "@ngeenx/monaco-textmate-loader"
import { Component, forwardRef, Inject, Input, NgZone } from "@angular/core"
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms"
import { fromEvent } from "rxjs"
import { BaseEditor } from "../../common/base-editor"
import { NGX_MONACO_EDITOR_CONFIG, NgxMonacoEditorConfig } from "../../common/config"
import { INgxEditor } from "../../common/types"

declare var monaco: any

@Component({
  selector: "ngx-monaco-editor",
  templateUrl: "./editor.component.html",
  styleUrls: ["./editor.component.scss", "../../shared/styles/editor.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditorComponent),
      multi: true
    }
  ]
})
export class EditorComponent extends BaseEditor implements ControlValueAccessor {
  private _value: string = ""

  propagateChange = (_: any) => {}
  onTouched = () => {}

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

  @Input("model") public set model(model: INgxEditor) {
    this.options.model = model

    if (this._editor) {
      this._editor.dispose()

      this.initMonaco(this.options, this.insideNg)
    }
  }

  constructor(
    private zone: NgZone,
    @Inject(NGX_MONACO_EDITOR_CONFIG) private editorConfig: NgxMonacoEditorConfig
  ) {
    super(editorConfig)
  }

  public writeValue(value: any): void {
    this._value = value || ""
    // Fix for value change while dispose in process.
    setTimeout(() => {
      if (this._editor && !this.options.model) {
        this._editor.setValue(this._value)
      }
    })
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  protected async initMonaco(options: any, insideNg: boolean): Promise<void> {
    const hasModel = !!options.model

    if (hasModel) {
      const model = monaco.editor.getModel(options.model.uri || "")

      if (model) {
        options.model = model
        options.model.setValue(this._value)
      } else {
        options.model = monaco.editor.createModel(
          options.model.value,
          options.model.language,
          options.model.uri
        )
      }
    }

    if (insideNg) {
      this._editor = await MonacoTextmateLoader.create(this._editorContainer.nativeElement, options)
    } else {
      await this.zone.runOutsideAngular(async () => {
        this._editor = await MonacoTextmateLoader.create(
          this._editorContainer.nativeElement,
          options
        )
      })
    }

    console.log("editor", this._editor)

    if (!hasModel) {
      this._editor.setValue(this._value)
    }

    this._editor.onDidChangeModelContent((e: any) => {
      const value = this._editor.getValue()

      // value is not propagated to parent when executing outside zone.
      this.zone.run(() => {
        this.propagateChange(value)
        this._value = value
      })
    })

    this._editor.onDidBlurEditorWidget(() => {
      this.onTouched()
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
