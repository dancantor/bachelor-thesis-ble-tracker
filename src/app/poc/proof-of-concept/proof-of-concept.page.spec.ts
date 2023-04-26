import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProofOfConceptPage } from './proof-of-concept.page';

describe('ProofOfConceptPage', () => {
  let component: ProofOfConceptPage;
  let fixture: ComponentFixture<ProofOfConceptPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProofOfConceptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
