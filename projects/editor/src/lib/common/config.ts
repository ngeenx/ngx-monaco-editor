import { InjectionToken } from "@angular/core"

export const NGX_MONACO_EDITOR_CONFIG = new InjectionToken("NGX_MONACO_EDITOR_CONFIG")

export interface NgxMonacoEditorConfig {
  /**
   * The base URL to monaco editor library assets via AMD (RequireJS).
   *
   * e.g., assets/monaco-editor/min
   */
  baseUrl?: string

  /**
   * Override the require config for monaco editor
   */
  requireConfig?: { [key: string]: any }

  /**
   * The default options for monaco editor
   */
  defaultOptions?: { [key: string]: any }

  /**
   * Monaco editor require function
   */
  monacoRequire?: Function

  /**
   * Called when monaco editor is loaded
   */
  onMonacoLoad?: Function
}
