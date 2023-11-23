import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dynamicPipe' })
export class DynamicPipe implements PipeTransform {
    transform(value: any, pipeToken: string, pipeArgs?: any[]): any {
        if (pipeToken === 'arrayJoin' && Array.isArray(value)) {
            const separator = pipeArgs && pipeArgs.length > 0 ? pipeArgs[0] : ', ';
            return value.join(separator);
        }
    }
}