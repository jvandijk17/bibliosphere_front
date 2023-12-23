import { Component, EventEmitter, Input, Output, OnInit, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { apiDateToInputDate } from 'src/app/core/domain/utils/date-utils';

@Component({
  selector: 'app-generic-form',
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.scss']
})
export class GenericFormComponent implements OnInit {

  @Input() formConfig: any;
  @Input() context?: 'create' | 'edit';
  @Input() formLevelValidators: ValidatorFn[] = [];
  @Input() title = '';
  @Input() initialValue: any;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.buildForm();
    if (this.initialValue) {
      this.form.patchValue(this.initialValue);
    }
  }

  buildForm() {
    const group: any = {};

    this.formConfig.forEach((control: any) => {
      if (!control.excluded || !control.excluded.includes(this.context)) {
        group[control.name] = ['', this.getValidators(control.validators)];
      }
    });

    this.form = this.fb.group(group, { validators: this.formLevelValidators });
  }

  getValidators(validators: any) {
    const formValidators = [];
    if (validators) {
      if (validators.required) {
        formValidators.push(Validators.required);
      }
    }
    return formValidators;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialValue'] && !changes['initialValue'].firstChange) {
      const initialValue = { ...changes['initialValue'].currentValue };

      this.formConfig.forEach((control: any) => {
        if (control.type === 'date' && initialValue[control.name]) {
          initialValue[control.name] = apiDateToInputDate(initialValue[control.name]);
        }
      });

      this.form.patchValue(initialValue);
      this.cd.detectChanges();
    }
  }


  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
      this.form.reset();
    }
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

}
