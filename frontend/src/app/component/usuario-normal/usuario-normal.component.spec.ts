import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioNormalComponent } from './usuario-normal.component';

describe('UsuarioNormalComponent', () => {
  let component: UsuarioNormalComponent;
  let fixture: ComponentFixture<UsuarioNormalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioNormalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsuarioNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
