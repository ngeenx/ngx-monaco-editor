# ngx-monaco-editor

Angular implementation of [Monaco Editor](https://microsoft.github.io/monaco-editor/). Only supports Angular 17 and above versions.

> [!WARNING]
> This repository maintains a fork of the original [miki995/ngx-monaco-editor-v2](https://github.com/miki995/ngx-monaco-editor-v2) and [atularen/ngx-monaco-editor](https://github.com/atularen/ngx-monaco-editor) repos. This package has been modified to work in custom Angular projects. Also, this package is using directly [ngeenx/monaco-textmate-loader](https://github.com/ngeenx/monaco-textmate-loader) package instead [monaco-editor](https://github.com/microsoft/monaco-editor).


## [Edit on StackBlitz ⚡️](https://stackblitz.com/~/github.com/ngeenx/ngx-monaco-editor)


## 📦 Installation

#### Peer Dependencies

PNPM
```
pnpm i monaco-editor vscode-oniguruma @ngeenx/monaco-textmate-loader
```

NPM
```
npm i monaco-editor vscode-oniguruma @ngeenx/monaco-textmate-loader
```

#### Asessts

Add the glob to assets in `angular.json`

```json
{
  ...
  "projects": {
    "project-name": {
      ...
      "architect": {
        "build": {
          ...
          "options": {
            ...
            "assets": [
              ...
              {
                "glob": "**/*",
                "input": "node_modules/monaco-editor/min",
                "output": "./assets/monaco-editor/min"
              },
              {
                "glob": "**/*",
                "input": "node_modules/monaco-editor/min-maps",
                "output": "./assets/monaco-editor/min-maps"
              },
              {
                "glob": "**/*",
                "input": "node_modules/@ngeenx/monaco-textmate-loader/dist/grammars",
                "output": "./assets/monaco-textmate-loader/grammars"
              },
              {
                "glob": "**/*",
                "input": "node_modules/@ngeenx/monaco-textmate-loader/dist/configurations",
                "output": "./assets/monaco-textmate-loader/configurations"
              },
              {
                "glob": "**/*",
                "input": "node_modules/vscode-oniguruma/release",
                "output": "./assets/vscode-oniguruma/release"
              }
            ],
            ...
          }
        }
      }
    }
  
}
 ```

#### Import Module

Import `NgxMonacoEditorModule` in your `app.module.ts`

```typescript
import { NgxMonacoEditorModule } from '@ngeen/ngx-monaco-editor';
...

// define ngx monaco editor configs
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
    ...
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxMonacoEditorModule.forRoot(monacoConfig), // <-- import the module
    
    ...
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

## 🧩 Available Components

### [👉 EditorComponent](./projects/editor/src/lib/components/editor/editor.component.ts)

```html
<ngx-monaco-editor [options]="options" [(ngModel)]="code"></ngx-monaco-editor>
```

### [👉 DiffEditorComponent](./projects/editor/src/lib/components/diff-editor/diff-editor.component.ts)

```html
<ngx-monaco-diff-editor [options]="options" [(ngModel)]="code"><ngx-monaco-diff-editor>
```

## 🎨 Styling

By default, the editor component has fixed height of 200px. You can set the height of the editor by setting the height of the parent container.

```html
<div style="height: 500px">
  <ngx-monaco-editor style="height: 100%" [options]="options" [(ngModel)] ="code"></ngx-monaco-editor>
</div>
```

Set automaticLayout option to adjust editor size dynamically. Recommended when using in modal dialog or tabs where editor is not visible initially.

## 📌 Events

Output event (onInit) expose editor instance that can be used for performing custom operations on the editor.

```html
<ngx-monaco-editor [options]="options" [(ngModel)]="code" (onInit)="onInit($event)"></ngx-monaco-editor>
```

```typescript
export class AppComponent {
  public options = { theme: 'vs-dark', language: 'javascript' };
  publiğc code = 'function x() { console.log("Hello world!"); }';

  public onInit(editor: any): void {
    let line = editor.getPosition();
    
    console.log(line);
  }
}
```

## 📚 Additional Resources

[Monaco Editor](https://github.com/Microsoft/monaco-editor/)<br/>
[Monaco Editor Options](https://microsoft.github.io/monaco-editor/docs.html)
[monaco-textmate-loader](https://github.com/ngeenx/monaco-textmate-loader)
[vscode-oniguruma](https://github.com/microsoft/vscode-oniguruma)
[WASM](https://webassembly.org/)
