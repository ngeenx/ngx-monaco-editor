import { Component, OnInit } from "@angular/core"
import { INgxDiffEditor, INgxEditor } from "../../../editor/src/lib/common/types"

declare var monaco: any

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  codeInput = "Sample Code"
  editor: any
  diffEditor: any
  showMultiple = false
  toggleLanguage = true
  options = {
    theme: "vs-dark"
  }
  code: string
  cssCode = `.my-class {
  color: red;
}`
  jsCode = `function hello() {
	 alert('Hello world!');
}`

  originalModel: INgxDiffEditor = {
    code: "heLLo world!",
    language: "text/plain"
  }

  modifiedModel: INgxDiffEditor = {
    code: "hello orlando!",
    language: "text/plain"
  }

  jsonCode = ["{", '    "p1": "v3",', '    "p2": false', "}"].join("\n")

  model: INgxEditor = {
    value: this.jsonCode,
    language: "json"
  }

  ngOnInit() {
    this.updateOptions()
  }

  updateOptions() {
    this.toggleLanguage = !this.toggleLanguage

    if (this.toggleLanguage) {
      this.code = this.cssCode
      this.options = Object.assign({}, this.options, { language: "java" })
    } else {
      this.code = this.jsCode
      this.options = Object.assign({}, this.options, { language: "javascript" })
    }
  }

  updateDiffModel() {
    this.originalModel = Object.assign({}, this.originalModel, { code: "abcd" })
    this.modifiedModel = Object.assign({}, this.originalModel, { code: "ABCD ef" })
  }

  onInit(editor) {
    this.editor = editor

    this.model = {
      value: this.jsonCode,
      language: "json",
      uri: monaco.Uri.parse("a://b/foo.json")
    }

    // let line = editor.getPosition();
    // let range = new monaco.Range(line.lineNumber, 1, line.lineNumber, 1);
    // let id = { major: 1, minor: 1 };
    // let text = 'FOO';
    // let op = { identifier: id, range: range, text: text, forceMoveMarkers: true };
    // editor.executeEdits("my-source", [op]);
  }

  onInitDiffEditor(editor) {
    this.diffEditor = editor
    console.log(editor)
  }
}
