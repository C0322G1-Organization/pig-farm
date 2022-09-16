import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {NotificationService} from '../../service/notification.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-notification-create',
  templateUrl: './notification-create.component.html',
  styleUrls: ['./notification-create.component.css']
})
export class NotificationCreateComponent implements OnInit {
  selectedImage: File = null;
  notificationForm: FormGroup = new FormGroup({
    image: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    dateSubmitted: new FormControl(Date())
  });

  constructor(private notificationService: NotificationService,
              private router: Router,
              private storage: AngularFireStorage,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
  }

  submit() {
    console.log(this.notificationForm);
    const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    const filePath = `news/${nameImg}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(`news/${nameImg}`, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.notificationForm.patchValue({image: url});
          console.log(url);
          console.log(this.notificationForm.value);
          this.notificationService.save(this.notificationForm.value).subscribe(
            () => {
              this.toast.success('Huyền đã thêm mới thành công', 'MỪNG QUÁ');
              this.router.navigateByUrl('/notification');
            },
          );
        });
      })
    ).subscribe();
  }

  showImg(event: any) {
    console.log(event);
    this.selectedImage = event.target.files[0];
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US');
  }
}


