import { Component, OnInit } from "@angular/core"

declare var monaco: any

@Component({
  selector: "app-theme-switch-example",
  templateUrl: "./theme-switch-example.component.html",
  styleUrls: ["./theme-switch-example.component.scss"]
})
export class ThemeSwitchExampleComponent implements OnInit {
  public options: any = {
    theme: "vs-dark",
    language: "json",
    minimap: {
      enabled: true
    }
  }
  public theme: "vs-dark" | "vs"
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
  }

  public onThemeChange(theme: "vs-dark" | "vs"): void {
    this.theme = theme

    this.options = {
      ...this.options,
      theme
    }
  }
}
