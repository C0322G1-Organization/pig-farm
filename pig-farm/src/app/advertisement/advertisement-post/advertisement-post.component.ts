import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Placement} from '../../model/placement';
import {Advertisement} from '../../model/advertisement';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AdvertisementService} from '../../service/advertisement.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-advertisement-post',
  templateUrl: './advertisement-post.component.html',
  styleUrls: ['./advertisement-post.component.css']
})
export class AdvertisementPostComponent implements OnInit {

  formAdvertisement: FormGroup;
  selectedImage: File = null;
  placementList: Placement[];
  advertisement: Advertisement[];
  checkImgSize = false;
  regexImageUrl = false;
  editImageState = false;
  checkImg: boolean;
  url: any;
  msg = '';

  constructor(private route: Router,
              private toast: ToastrService,
              private placementService: AdvertisementService,
              private storage: AngularFireStorage,
              private ads: AdvertisementService) {
  }

  ngOnInit(): void {
    this.placementService.getListPlacement().subscribe(next => {
      this.placementList = next;
      console.log(next);
    });
    this.formAdvertisement = new FormGroup({
      // tslint:disable-next-line:max-line-length
      title: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+')]),
      image: new FormControl('', Validators.required),
      // tslint:disable-next-line:max-line-length
      submittedDate: new FormControl('', [Validators.required]),
      timeExistence: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      placement: new FormControl('', Validators.required)
    });
  }
  checkDate(form: FormControl): any {
    for (const e of this.advertisement) {
      if (form.value.submittedDate === e.submittedDate) {
        return {duplicateDate: true};
      }
    }
    return null;
  }
  submit() {
    const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    const filePath = `advertisement/${nameImg}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.formAdvertisement.patchValue({image: url});
          console.log(url);
          console.log(this.formAdvertisement.value);
          this.placementService.save(this.formAdvertisement.value).subscribe(
            () => {
              this.route.navigateByUrl('/advertisement/page');
              this.toast.success('Đăng quảng cáo thành công');
            },
            error => {
              this.toast.error('Đăng quảng cáo thất bại');
            }
          );
        });
      })
    ).subscribe();
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
    this.formAdvertisement.patchValue({imageUrl: this.selectedImage.name});
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

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US');
  }

}
