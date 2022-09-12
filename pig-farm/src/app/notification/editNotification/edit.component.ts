import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NotificationService} from '../service/notification.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: number;
  notificationForm: FormGroup;

  constructor(private notificationService: NotificationService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = + paramMap.get('id');
      this.getNotification(this.id);
    });
  }

  ngOnInit(): void {
  }

  getNotification(id: number) {
    return this.notificationService.findById(id).subscribe(notification => {
      this.notificationForm = new FormGroup({
        id: new FormControl(notification.id),
        title: new FormControl(notification.title),
        content: new FormControl(notification.content),
        image: new FormControl(notification.image),
      });
    });
  }

  updateNotification(id: number) {
    const notification = this.notificationForm.value;
    this.notificationService.update(id, notification).subscribe(() => {
        alert('Cập nhật thành công');
        this.router.navigate(['']);
      }
    );
  }
}
