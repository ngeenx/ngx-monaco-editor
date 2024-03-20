import { Component, OnInit } from "@angular/core"

declare var monaco: any

@Component({
  selector: "app-switch-language",
  templateUrl: "./switch-language.component.html",
  styleUrls: ["./switch-language.component.scss"]
})
export class SwitchLanguageComponent implements OnInit {
  public options: any = {
    theme: "vs-dark",
    language: "javascript"
  }
  public code: string | null = null

  private editor: any = null

  constructor() {}

  public ngOnInit(): void {
    this.changeLanguage()
  }

  public changeLanguage(): void {
    if (this.options.language === "php") {
      this.code = `// JS Code

function selectRandomWord(words: string[]): void {
    const randomIndex = Math.floor(Math.random() * words.length);
    console.log("Randomly selected word:", words[randomIndex]);
}

const words: string[] = ["apple", "banana", "orange", "grape", "pineapple"];
selectRandomWord(words);
`
      this.options = Object.assign({}, this.options, { language: "javascript" })
    } else {
      this.code = `<?php
// PHP Code

function selectRandomWord($words) {
    $randomIndex = rand(0, count($words) - 1);
    echo "Randomly selected word: " . $words[$randomIndex];
}

$words = ["apple", "banana", "orange", "grape", "pineapple"];
selectRandomWord($words);

?>`
      this.options = Object.assign({}, this.options, { language: "php" })
    }
  }

  public onEditorInit(event: any): void {
    this.editor = event

    console.log(monaco.languages.getLanguages())
  }
}
