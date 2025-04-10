import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarchivosComponent } from './cargarchivos.component';

describe('CargarchivosComponent', () => {
  let component: CargarchivosComponent;
  let fixture: ComponentFixture<CargarchivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargarchivosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CargarchivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
