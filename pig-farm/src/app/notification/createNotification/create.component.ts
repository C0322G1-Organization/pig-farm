import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../service/notification.service';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  selectedImage: File = null;
  notificationForm: FormGroup = new FormGroup({
    image: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    title: new FormControl('', [Validators.required]),
    dateSubmitted: new FormControl(Date())
  });

  constructor(private notificationService: NotificationService,
              private router: Router,
              private storage: AngularFireStorage) {
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
              alert('Thêm mới thành công');
              this.router.navigateByUrl('');
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

