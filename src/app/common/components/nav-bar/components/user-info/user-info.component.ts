import { Component, Input } from '@angular/core';
import { UserInfo } from '../../type/menu.type';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
})
export class UserInfoComponent {
  @Input({ required: true }) userInfo!: UserInfo;
}
