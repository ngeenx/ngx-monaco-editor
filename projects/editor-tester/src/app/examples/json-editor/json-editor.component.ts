import { Component, OnInit } from "@angular/core"

declare var monaco: any

@Component({
  selector: "app-json-editor",
  templateUrl: "./json-editor.component.html",
  styleUrls: ["./json-editor.component.scss"]
})
export class JsonEditorComponent implements OnInit {
  public options: any = {
    theme: "vs-dark",
    language: "json",
    minimap: {
      enabled: true
    }
  }
  public code: string | null = `
{
	"comments": {
		"lineComment": "//",
		"blockComment": ["/*", "*/"]
	},
	"brackets": [
		["{", "}"],
		["[", "]"],
		["(", ")"]
	],
	"autoClosingPairs": [
		{ "open": "[", "close": "]" },
		{ "open": "{", "close": "}" },
		{ "open": "(", "close": ")" },
		{ "open": "'", "close": "'", "notIn": ["string", "comment"] },
		{ "open": "\"", "close": "\"", "notIn": ["string", "comment"] }
	],
	"surroundingPairs": [
		["{", "}"],
		["[", "]"],
		["(", ")"],
		["<", ">"],
		["'", "'"],
		["\"", "\""]
	],
	"folding": {
		"markers": {
			"start": "^\\s*#region\\b",
			"end": "^\\s*#endregion\\b"
		}
	}
}`

  private editor: any = null

  constructor() {}

  public ngOnInit(): void {}

  public onEditorInit(event: any): void {
    this.editor = event

    console.log(monaco.languages.getLanguages())
  }
}
