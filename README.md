# ngx-monaco-editor

Angular implementation of [Monaco Editor](https://microsoft.github.io/monaco-editor/). Only supports Angular 17 and above versions.

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

## Configurations
`forRoot()` method of NgxMonacoEditorModule accepts config of type `NgxMonacoEditorConfig`.
```typescript
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { NgxMonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';
import { AppComponent } from './app.component';

const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: 'app-name/assets', // configure base path for monaco editor. Starting with version 8.0.0 it defaults to './assets'. Previous releases default to '/assets'
  defaultOptions: { scrollBeyondLastLine: false }, // pass default options to be used
  onMonacoLoad: () => { console.log((<any>window).monaco); } // here monaco object will be available as window.monaco use this function to extend monaco editor functionalities.
  requireConfig: { preferScriptTags: true } // allows to oweride configuration passed to monacos loader
  monacoRequire: (<any>window).monacoRequire // pass here monacos require function if you loaded monacos loader (loader.js) yourself 
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxMonacoEditorModule.forRoot(monacoConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

### Configure JSON Defaults
`onMonacoLoad` property of `NgxMonacoEditorConfig` can be used to configure JSON default.
```typescript
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { NgxMonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';
import { AppComponent } from './app.component';

export function onMonacoLoad() {

  console.log((window as any).monaco);

  const uri = monaco.Uri.parse('a://b/foo.json');
  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: true,
    schemas: [{
      uri: 'http://myserver/foo-schema.json',
      fileMatch: [uri.toString()],
      schema: {
        type: 'object',
        properties: {
          p1: {
            enum: ['v1', 'v2']
          },
          p2: {
            $ref: 'http://myserver/bar-schema.json'
          }
        }
      }
    }, {
      uri: 'http://myserver/bar-schema.json',
      fileMatch: [uri.toString()],
      schema: {
        type: 'object',
        properties: {
          q1: {
            enum: ['x1', 'x2']
          }
        }
      }
    }]
  });

}

const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: 'assets',
  defaultOptions: { scrollBeyondLastLine: false },
  onMonacoLoad
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxMonacoEditorModule.forRoot(monacoConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Now pass model config of type `INgxEditor` to Editor Component
```typescript
@Component({
  selector: 'app-root',
  template: `<ngx-monaco-editor [options]="options" [model]="model"></ngx-monaco-editor>`,
  styles: []
})
export class AppComponent {
  options = {
    theme: 'vs-dark'
  };
  
  jsonCode = [
    '{',
    '    "p1": "v3",',
    '    "p2": false',
    '}'
  ].join('\n');

  model: INgxEditor = {
    value: this.jsonCode,
    language: 'json',
    uri: monaco.Uri.parse('a://b/foo.json')
  };
}
```

### Configuration for Electron
If you expose node's `require` in your render process, monaco will try to use its `NodeScriptLoader` and fail to load its files. To presuade it to use its `BrowserScriptLoader` instead it is necessery to set `preferScriptTags` to true.
```typescript
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { NgxMonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';
import { AppComponent } from './app.component';

const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: 'assets', 
  requireConfig: { preferScriptTags: true }
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxMonacoEditorModule.forRoot(monacoConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```
If for some reason you want to load monaco yourself. 
```html
<!doctype html>
<html>

<head>
  <meta charset="utf-8">
  <title>Angular Electron</title>
  <base href="./">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="assets/icons/favicon.ico">
</head>

<body>
  <app-root></app-root>
  <script>
    // Monaco uses a custom amd loader that over-rides node's require.
    // Keep a reference to node's require so we can restore it after executing the amd loader file.
    var nodeRequire = require;
  </script>
  <script src="assets/monaco/min/vs/loader.js"></script>
  <script type="text/javascript">
    // Save Monaco's amd require and restore Node's require
    var monacoRequire = require;
    require = nodeRequire;
    require.nodeRequire = require;
  </script>
</body>

</html>
```
You just need to save monaco `require` function defined in `loader.js` somewhere and pass it to `monacoRequire` in configuration.
```typescript
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { NgxMonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';
import { AppComponent } from './app.component';

const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: 'assets', 
  requireConfig: { preferScriptTags: true },
  monacoRequire: (window as any).monacoRequire
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxMonacoEditorModule.forRoot(monacoConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

## Links
[Monaco Editor](https://github.com/Microsoft/monaco-editor/)<br/>
[Monaco Editor Options](https://microsoft.github.io/monaco-editor/docs.html)
