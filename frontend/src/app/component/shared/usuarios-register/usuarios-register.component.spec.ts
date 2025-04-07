import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosRegisterComponent } from './usuarios-register.component';

describe('UsuariosRegisterComponent', () => {
  let component: UsuariosRegisterComponent;
  let fixture: ComponentFixture<UsuariosRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsuariosRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
