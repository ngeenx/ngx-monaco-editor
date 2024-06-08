# ngx-monaco-editor

Angular implementation of [Monaco Editor](https://microsoft.github.io/monaco-editor/). Only supports Angular 17 and above versions.

- [ngx-monaco-editor](#ngx-monaco-editor)
  - [⚡️ Play on StackBlitz](#️-play-on-stackblitz)
  - [📦 Installation](#-installation)
      - [Compatible Versions](#compatible-versions)
      - [Peer Dependencies](#peer-dependencies)
      - [Install Package](#install-package)
      - [Asessts](#asessts)
      - [Import Module](#import-module)
  - [🧩 Available Components](#-available-components)
    - [👉 EditorComponent](#-editorcomponent)
    - [👉 DiffEditorComponent](#-diffeditorcomponent)
  - [🎨 Styling](#-styling)
  - [📌 Events](#-events)
  - [📚 Additional Resources](#-additional-resources)


> [!WARNING]
> This repository maintains a fork of the original [miki995/ngx-monaco-editor-v2](https://github.com/miki995/ngx-monaco-editor-v2) and [atularen/ngx-monaco-editor](https://github.com/atularen/ngx-monaco-editor) repos. This package has been modified to work in custom Angular projects. Also, this package is using directly [ngeenx/monaco-textmate-loader](https://github.com/ngeenx/monaco-textmate-loader) package instead [monaco-editor](https://github.com/microsoft/monaco-editor).


## [⚡️ Play on StackBlitz](https://stackblitz.com/~/github.com/ngeenx/ngx-monaco-editor)


## 📦 Installation

#### Compatible Versions

| Package Version | Angular Version |
|---------|---------|
| 17.x.x | 17.x.x |
| 18.x.x | 18.x.x |

#### Peer Dependencies

All of the following peer dependencies must be installed in your project. If you are using PNPM to install the package, you need to add `pnpm-workspace.yaml` file to the root of your project and add the following lines to it (*see [example file](./pnpm-workspace.yaml)*). Because these packages coming with custom assets, you need to add them to the assets in `angular.json` file.

PNPM
```
pnpm i monaco-editor vscode-oniguruma @ngeenx/monaco-textmate-loader --workspace-root
```

NPM
```
npm i monaco-editor vscode-oniguruma @ngeenx/monaco-textmate-loader
```

#### Install Package

This package is contains the Angular components for the Monaco Editor. You can install it via NPM or PNPM.

PNPM
```
pnpm i @ngeenx/ngx-monaco-editor
```

NPM
```
npm i @ngeenx/ngx-monaco-editor
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
import { NgxMonacoEditorModule, NgxMonacoEditorConfig } from "@ngeenx/ngx-monaco-editor"
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

[Monaco Editor](https://github.com/Microsoft/monaco-editor/)
[Monaco Editor Options](https://microsoft.github.io/monaco-editor/docs.html)
[monaco-textmate-loader](https://github.com/ngeenx/monaco-textmate-loader)
[vscode-oniguruma](https://github.com/microsoft/vscode-oniguruma)
[WASM](https://webassembly.org/)
