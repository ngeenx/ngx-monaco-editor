/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser"
import { DebugElement } from "@angular/core"

import { SplitterExampleComponent } from "./splitter-example.component"

describe("SplitterExampleComponent", () => {
  let component: SplitterExampleComponent
  let fixture: ComponentFixture<SplitterExampleComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SplitterExampleComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitterExampleComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
