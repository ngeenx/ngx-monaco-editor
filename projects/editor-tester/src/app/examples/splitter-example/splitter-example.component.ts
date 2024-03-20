import { Component, OnInit } from "@angular/core"
import { timer } from "rxjs"

declare var monaco: any

@Component({
  selector: "app-splitter-example",
  templateUrl: "./splitter-example.component.html",
  styleUrls: ["./splitter-example.component.scss"]
})
export class SplitterExampleComponent implements OnInit {
  public options: any = {
    theme: "vs-dark",
    language: "html",
    minimap: {
      enabled: true
    }
  }
  public code: string | null = `<!DOCTYPE html>
<html lang="en">
<body>
    <header>
        <h1>Welcome to My Website</h1>
        <nav>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section>
            <h2>About Us</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquam mauris eu mauris mollis, sit amet vestibulum urna sodales. Fusce eleifend nisi vel risus fermentum, ac aliquet elit pulvinar.</p>
        </section>
        <section>
            <h2>Our Services</h2>
            <ul>
                <li>Web Design</li>
                <li>Graphic Design</li>
                <li>SEO Optimization</li>
            </ul>
        </section>
    </main>
    <footer>
        <p>&copy; 2024 My Website. All rights reserved.</p>
    </footer>
</body>
</html>
`
  public splitterDirection: "horizontal" | "vertical" = "horizontal"

  private editor: any = null

  constructor() {}

  public ngOnInit(): void {}

  public onEditorInit(event: any): void {
    this.editor = event

    this.editor.onDidChangeModelContent(() => {
      console.log(this.editor.getValue())
    })
  }

  public onSplitterDragEnd(): void {
    this.editor.layout() // update editor layout and sizes
  }

  public toggleSplitterDirection(): void {
    this.splitterDirection = this.splitterDirection === "horizontal" ? "vertical" : "horizontal"

    timer(0).subscribe(() => {
      this.editor.layout() // update editor layout and sizes
    })
  }
}
