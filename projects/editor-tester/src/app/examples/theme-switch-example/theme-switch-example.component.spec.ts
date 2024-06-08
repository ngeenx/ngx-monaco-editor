/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser"
import { DebugElement } from "@angular/core"

import { ThemeSwitchExampleComponent } from "./theme-switch-example.component"

describe("ThemeSwitchExampleComponent", () => {
  let component: ThemeSwitchExampleComponent
  let fixture: ComponentFixture<ThemeSwitchExampleComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ThemeSwitchExampleComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeSwitchExampleComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
