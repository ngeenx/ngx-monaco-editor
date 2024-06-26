/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser"
import { DebugElement } from "@angular/core"

import { DiffEditorComponent } from "./diff-editor.component"

describe("DiffEditorComponent", () => {
  let component: DiffEditorComponent
  let fixture: ComponentFixture<DiffEditorComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DiffEditorComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DiffEditorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
