import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-deposit-resource',
    templateUrl: './deposit-resource.component.html',
    styleUrls: ['./deposit-resource.component.scss'],
})
export class DepositResourceComponent {
    @Input() resourceType!: ResourceType;
}

export enum ResourceType {
    Gold,
    Eter,
}
