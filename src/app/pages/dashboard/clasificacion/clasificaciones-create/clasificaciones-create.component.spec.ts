import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SgsstCoreService } from 'src/app/services/sgsst/sgsst-core/sgsst-core.service';
import { FormsModule } from '@angular/forms';
import { ClasificacionesCreateComponent } from './clasificaciones-create.component';
import { from } from 'rxjs';
import { TipoResponsable } from 'src/app/interfaces/tipo_responsable.interface';
import { TipoEvaluacion } from 'src/app/interfaces/tipo_evaluacion.interface';

describe('ClasificacionesCreateComponent', () => {
  let component: ClasificacionesCreateComponent;
  let fixture: ComponentFixture<ClasificacionesCreateComponent>;

  const tiposResponsableFake: TipoResponsable[] = [
    { id: 0, tipo: 'Vigia SST' },
    { id: 1, tipo: 'Técnico SST' },
    { id: 2, tipo: 'Tecnólogo SST' },
    { id: 3, tipo: 'Profesional SST' },
  ];
  const tiposEvaluacionFake: TipoEvaluacion[] = [
    {
      id: 0,
      tipo: 'Evaluacion tipo 1',
      cita: '',
      descripcion: '',
      responsable: '',
    },
    {
      id: 1,
      tipo: 'Evaluacion tipo 2',
      cita: '',
      descripcion: '',
      responsable: '',
    },
    {
      id: 2,
      tipo: 'Evaluacion tipo 3',
      cita: '',
      descripcion: '',
      responsable: '',
    },
  ];

  beforeEach(() => {
    const toastrServiceStub = () => ({
      error: (message: string, title: string, config: object) => ({}),
      warning: (message: string, title: string, config: object) => ({}),
    });

    const sgsstCoreServiceStub = () => ({
      getTiposResponsable: () => ({ subscribe: (resp: any) => resp({}) }),
      getTiposEvaluacion: () => ({ subscribe: (resp: any) => resp({}) }),
    });

    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ClasificacionesCreateComponent],
      providers: [
        { provide: ToastrService, useFactory: toastrServiceStub },
        { provide: SgsstCoreService, useFactory: sgsstCoreServiceStub },
      ],
    });

    fixture = TestBed.createComponent(ClasificacionesCreateComponent);
    component = fixture.componentInstance;
  });

  describe('Calcular los estándares mínimos', () => {
    it('Menos de 10 empleados, Nivel de riesgo I, II o III', () => {
      // Se injecta el stub del servicio
      const sgsstCoreServiceStub: SgsstCoreService =
        fixture.debugElement.injector.get(SgsstCoreService);
      // Se crea un espía para simular los datos de la BD
      spyOn(sgsstCoreServiceStub, 'getTiposResponsable').and.callFake(() =>
        from([
          {
            ok: true,
            data: tiposResponsableFake,
            error: '',
          },
        ])
      );
      spyOn(sgsstCoreServiceStub, 'getTiposEvaluacion').and.callFake(() =>
        from([
          {
            ok: true,
            data: tiposEvaluacionFake,
            error: '',
          },
        ])
      );
      component.ngOnInit();

      component.nivelRiesgo = 1;
      component.numEmpleados = 8;

      component.calcularEstandaresMinimos();

      expect(component.tipoResponsable).toBe(tiposResponsableFake[1].tipo);
      expect(component.numItemsEvaluar).toBe(11);
    });

    it('Menos de 10 empleados, Nivel de riesgo IV, V', () => {
      // Se injecta el stub del servicio
      const sgsstCoreServiceStub: SgsstCoreService =
        fixture.debugElement.injector.get(SgsstCoreService);
      // Se crea un espía para simular los datos de la BD
      spyOn(sgsstCoreServiceStub, 'getTiposResponsable').and.callFake(() =>
        from([
          {
            ok: true,
            data: tiposResponsableFake,
            error: '',
          },
        ])
      );
      spyOn(sgsstCoreServiceStub, 'getTiposEvaluacion').and.callFake(() =>
        from([
          {
            ok: true,
            data: tiposEvaluacionFake,
            error: '',
          },
        ])
      );
      component.ngOnInit();

      component.nivelRiesgo = 4;
      component.numEmpleados = 2;

      component.calcularEstandaresMinimos();

      expect(component.tipoResponsable).toBe(tiposResponsableFake[3].tipo);
      expect(component.numItemsEvaluar).toBe(62);
    });


    it('Entre 11 y 50 empleados, Nivel de riesgo I, II o III', () => {
      // Se injecta el stub del servicio
      const sgsstCoreServiceStub: SgsstCoreService =
        fixture.debugElement.injector.get(SgsstCoreService);
      // Se crea un espía para simular los datos de la BD
      spyOn(sgsstCoreServiceStub, 'getTiposResponsable').and.callFake(() =>
        from([
          {
            ok: true,
            data: tiposResponsableFake,
            error: '',
          },
        ])
      );
      spyOn(sgsstCoreServiceStub, 'getTiposEvaluacion').and.callFake(() =>
        from([
          {
            ok: true,
            data: tiposEvaluacionFake,
            error: '',
          },
        ])
      );
      component.ngOnInit();

      component.nivelRiesgo = 3;
      component.numEmpleados = 15;

      component.calcularEstandaresMinimos();

      expect(component.tipoResponsable).toBe(tiposResponsableFake[2].tipo);
      expect(component.numItemsEvaluar).toBe(25);
    });

    it('Entre 11 y 50 empleados, Nivel de riesgo IV o V', () => {
      // Se injecta el stub del servicio
      const sgsstCoreServiceStub: SgsstCoreService =
        fixture.debugElement.injector.get(SgsstCoreService);
      // Se crea un espía para simular los datos de la BD
      spyOn(sgsstCoreServiceStub, 'getTiposResponsable').and.callFake(() =>
        from([
          {
            ok: true,
            data: tiposResponsableFake,
            error: '',
          },
        ])
      );
      spyOn(sgsstCoreServiceStub, 'getTiposEvaluacion').and.callFake(() =>
        from([
          {
            ok: true,
            data: tiposEvaluacionFake,
            error: '',
          },
        ])
      );
      component.ngOnInit();

      component.nivelRiesgo = 5;
      component.numEmpleados = 25;

      component.calcularEstandaresMinimos();

      expect(component.tipoResponsable).toBe(tiposResponsableFake[3].tipo);
      expect(component.numItemsEvaluar).toBe(62);
    });

    it('Más de 50 empleados, Nivel de riesgo I, II o III', () => {
      // Se injecta el stub del servicio
      const sgsstCoreServiceStub: SgsstCoreService =
        fixture.debugElement.injector.get(SgsstCoreService);
      // Se crea un espía para simular los datos de la BD
      spyOn(sgsstCoreServiceStub, 'getTiposResponsable').and.callFake(() =>
        from([
          {
            ok: true,
            data: tiposResponsableFake,
            error: '',
          },
        ])
      );
      spyOn(sgsstCoreServiceStub, 'getTiposEvaluacion').and.callFake(() =>
        from([
          {
            ok: true,
            data: tiposEvaluacionFake,
            error: '',
          },
        ])
      );
      component.ngOnInit();

      component.nivelRiesgo = 3;
      component.numEmpleados = 80;

      component.calcularEstandaresMinimos();

      expect(component.tipoResponsable).toBe(tiposResponsableFake[3].tipo);
      expect(component.numItemsEvaluar).toBe(62);
    });
  });

  // describe('Método de Guardar Clasificación', () => {
  //   it('Intenta guardar sin agregar un número de empleados', () => {
  //     let ngFormStub: NgForm = <NgForm>{
  //       value: { numEmpleados: 0 },
  //       valid: true,
  //     };
  //     const toastrServiceStub: ToastrService =
  //       fixture.debugElement.injector.get(ToastrService);

  //     spyOn(toastrServiceStub, 'error').and.callThrough();
  //     spyOn(toastrServiceStub, 'warning').and.callThrough();
  //     component.guardar(ngFormStub);
  //     expect(toastrServiceStub.error).toHaveBeenCalled();
  //   });
  // });
});
