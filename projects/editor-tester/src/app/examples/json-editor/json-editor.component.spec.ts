/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser"
import { DebugElement } from "@angular/core"

import { JsonEditorComponent } from "./json-editor.component"

describe("JsonEditorComponent", () => {
  let component: JsonEditorComponent
  let fixture: ComponentFixture<JsonEditorComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JsonEditorComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonEditorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
