import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {NotificationService} from '../../service/notification.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-notification-edit',
  templateUrl: './notification-edit.component.html',
  styleUrls: ['./notification-edit.component.css']
})
export class NotificationEditComponent implements OnInit {
  id: number;
  notificationForm: FormGroup;
  selectedImage: File = null;
  regexImageUrl = false;
  editImageState = false;
  checkImg: boolean;
  url: any;
  msg = '';
  checkImgSize: boolean;
  check = true;
  isExits = false;

  constructor(private notificationService: NotificationService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private storage: AngularFireStorage,
              private  toast: ToastrService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getNotification(this.id);
    });
  }

  ngOnInit(): void {
    this.notificationForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
      image: new FormControl('', [Validators.required]),
    });
  }

  getNotification(id: number) {
    return this.notificationService.findById(id).subscribe(notification => {
      this.notificationForm.patchValue(notification);
    });
  }

  updateNotification() {
    this.check = false;
    if (this.notificationForm.invalid) {
      this.toast.error('Nhập đầy đủ thông tin!');
      this.check = true;
      return;
    }
    const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    const filePath = `news/${nameImg}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(`news/${nameImg}`, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.notificationForm.patchValue({image: url});
          console.log(url);
          console.log(this.notificationForm.value);
          this.notificationService.update(this.id, this.notificationForm.value).subscribe(
            () => {
              this.toast.success('Cập nhật thành công');
              this.router.navigateByUrl('/notification');
            },
            error => {
              this.toast.error('Cập nhật thất bại, xin hãy thử lại');
            }
          );
        });
      })
    ).subscribe();
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US');
  }

  onFileSelected(event) {
    this.regexImageUrl = false;
    if (event.target.files[0].size > 9000000) {
      return;
    }
    this.selectedImage = event.target.files[0];
    if (!event.target.files[0].name.match('^.*\\.(jpg|JPG)$')) {
      this.regexImageUrl = true;
      return;
    }
    this.notificationForm.patchValue({imageUrl: this.selectedImage.name});
  }

  selectFile(event: any) {
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      return;
    }
    if (event.target.files[0].size > 9000000) {
      return;
    }
    if (!event.target.files[0].name.match('^.*\\.(jpg|JPG)$')) {
      return;
    }
    this.checkImgSize = false;
    this.checkImg = false;
    this.editImageState = true;

    const mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Chỉ có file ảnh được hỗ trợ';
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    // tslint:disable-next-line:variable-name
    reader.onload = (_event) => {
      this.msg = '';
      this.url = reader.result;
    };
  }

  // checkImage() {
  //   if (!this.selectedImage || this.selectedImage.name === '') {
  //     this.checkImg = true;
  //     return;
  //   }
  // }
  //
  // checkGameName($event: Event) {
  //   this.notificationService.checkNotification(String($event)).subscribe(
  //     value => {
  //       if (value) {
  //         this.isExits = true;
  //       } else {
  //         this.isExits = false;
  //       }
  //     }
  //   );
  //   if (String($event) === '') {
  //     this.isExits = false;
  //   }
  // }
}

