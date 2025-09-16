import { NgModule } from "@angular/core";
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
    imports: [
        ButtonModule,
        InputTextModule,
        PasswordModule,
        CardModule,
        ToastModule,
        MessageModule,
        ProgressSpinnerModule
    ],
    exports: [
        ButtonModule,
        InputTextModule,
        PasswordModule,
        CardModule,
        ToastModule,
        MessageModule,
        ProgressSpinnerModule
    ]
})
export class PrimengModule { }