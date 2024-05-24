import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilArtistComponent } from './perfil-artist.component';

describe('PerfilArtistComponent', () => {
  let component: PerfilArtistComponent;
  let fixture: ComponentFixture<PerfilArtistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilArtistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
