// import { Directive, ElementRef, forwardRef, HostListener, Renderer2 } from '@angular/core';
// import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// @Directive({
//     selector: '[onlyNumber]',
//     providers: [{
//         provide: NG_VALUE_ACCESSOR,
//         useExisting: forwardRef(() => OnlyNumberDirective),
//         multi: true
//     }]
// })
// export class OnlyNumberDirective implements ControlValueAccessor {
//     private onChange!: (val: string) => void;
//     private onTouched!: () => void;
//     private value!: string;

//     constructor(
//         private elementRef: ElementRef,
//         private renderer: Renderer2
//     ) {
//     }

//     @HostListener('input', ['$event.target.value'])
//     onInputChange(value: string) {
//         const filteredValue: string = filterValue(value);
//         this.updateTextInput(filteredValue, this.value !== filteredValue);
//     }

//     @HostListener('blur')
//     onBlur() {
//         this.onTouched();
//     }

//     private updateTextInput(value: string, propagateChange: boolean) {
//         this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
//         if (propagateChange) {
//             this.onChange(value);
//         }
//         this.value = value;
//     }

//     // ControlValueAccessor Interface
//     registerOnChange(fn: any): void {
//         this.onChange = fn;
//     }

//     registerOnTouched(fn: any): void {
//         this.onTouched = fn;
//     }

//     setDisabledState(isDisabled: boolean): void {
//         this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
//     }

//     writeValue(value: any): void {
//         value = value ? String(value) : '';
//         this.updateTextInput(value, false);
//     }
// }

// function filterValue(value:any): string {
//     return value.replace(/[^0-9]*/g, '');
// }

import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, Validator, ValidationErrors, ValidatorFn } from '@angular/forms';

export function onlyNumber(): ValidatorFn {

  const OnlyNumber_REGEXP = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/i;

  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = OnlyNumber_REGEXP.test(control.value);

    if (isValid) {
      return null;
    } else {
      return {
        onlyNumber: {
          valid: false,
        },
      };
    }
  };

}

@Directive({
  selector: '[apponlyNumberValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: OnlyNumberDirective,
    multi: true,
  }],
})
export class OnlyNumberDirective implements Validator {

  constructor() {
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    return onlyNumber()(control);
  }

}
