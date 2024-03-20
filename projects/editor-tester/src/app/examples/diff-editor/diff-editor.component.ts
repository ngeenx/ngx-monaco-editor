import { Component, OnInit } from "@angular/core"
import { INgxDiffEditor } from "projects/editor/src/public-api"

declare var monaco: any

@Component({
  selector: "app-diff-editor",
  templateUrl: "./diff-editor.component.html",
  styleUrls: ["./diff-editor.component.scss"]
})
export class DiffEditorComponent implements OnInit {
  public options: any = {
    theme: "vs-dark",
    language: "javascript"
  }
  public originalCode: INgxDiffEditor = {
    code: "heLLo world!",
    language: "text/plain"
  }
  public modifiedCode: INgxDiffEditor = {
    code: "hello istanbul!",
    language: "text/plain"
  }

  private editor: any = null

  constructor() {}

  ngOnInit() {}

  public onEditorInit(event: any): void {
    this.editor = event

    console.log(monaco.languages.getLanguages())
  }
}
