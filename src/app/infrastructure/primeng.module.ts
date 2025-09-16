import { NgModule } from "@angular/core";
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
    imports: [
        ButtonModule,
        InputTextModule,
        PasswordModule,
        CardModule,
        ToastModule,
        MessageModule,
        ProgressSpinnerModule,
        CheckboxModule,
    ],
    exports: [
        ButtonModule,
        InputTextModule,
        PasswordModule,
        CardModule,
        ToastModule,
        MessageModule,
        ProgressSpinnerModule,
        CheckboxModule,
    ]
})
export class PrimengModule { }