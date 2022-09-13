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
  }

  getNotification(id: number) {
    return this.notificationService.findById(id).subscribe(notification => {
      this.notificationForm = new FormGroup({
        id: new FormControl(notification.id),
        title: new FormControl(notification.title, [Validators.required]),
        content: new FormControl(notification.content, [Validators.required, Validators.maxLength(1000)]),
        image: new FormControl(notification.image, [Validators.required]),
      });
    });
  }

  updateNotification() {
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
              this.toast.success('Huyền đã sửa thành công', 'MỪNG QUÁ');
              this.router.navigateByUrl('/notification');
            },
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
}

