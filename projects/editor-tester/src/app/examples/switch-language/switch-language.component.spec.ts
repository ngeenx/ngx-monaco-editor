/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser"
import { DebugElement } from "@angular/core"

import { SwitchLanguageComponent } from "./switch-language.component"

describe("SwitchLanguageComponent", () => {
  let component: SwitchLanguageComponent
  let fixture: ComponentFixture<SwitchLanguageComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SwitchLanguageComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchLanguageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
