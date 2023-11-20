import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-generic-form',
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.scss']
})
export class GenericFormComponent implements OnInit {

  @Input() formConfig: any;
  @Input() formLevelValidators: ValidatorFn[] = [];
  @Input() title: string = '';
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();
  form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    const group: any = {};
    this.formConfig.forEach((control: any) => {
      group[control.name] = ['', this.getValidators(control.validators)];
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

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
      this.form.reset();
    }
  }

}
