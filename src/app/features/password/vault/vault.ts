import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { MOCK_PASSWORDS } from '../../../store/mock-data';
import { PasswordEntry } from '../../../store/models';

@Component({
  selector: 'app-vault',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    TableModule,
    InputTextModule
  ],
  templateUrl: './vault.html',
  styleUrls: ['./vault.scss']
})
export class VaultComponent {
  passwords: PasswordEntry[] = MOCK_PASSWORDS;
  
  onAddPassword() {
    console.log('Add password clicked');
  }

  onEditPassword(password: PasswordEntry) {
    console.log('Edit password:', password);
  }

  onDeletePassword(password: PasswordEntry) {
    console.log('Delete password:', password);
  }

  onCopyPassword(password: string) {
    navigator.clipboard.writeText(password);
    console.log('Password copied to clipboard');
  }
}
