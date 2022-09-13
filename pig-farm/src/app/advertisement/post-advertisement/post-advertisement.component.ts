import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AdvertisementService} from '../service/advertisement.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Placement} from '../model/placement';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-post-advertisement',
  templateUrl: './post-advertisement.component.html',
  styleUrls: ['./post-advertisement.component.css']
})
export class PostAdvertisementComponent implements OnInit {
  formAdvertisement: FormGroup;
  selectedImage: File = null;
  placementList: Placement[];
  checkImgSize = false;
  constructor(private route: Router,
              private toast: ToastrService,
              private placementService: AdvertisementService,
              private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.placementService.getListPlacement().subscribe(next => {
      return this.placementList = next;
    });
    this.formAdvertisement = new FormGroup({
      // tslint:disable-next-line:max-line-length
      title: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+')]),
      image : new FormControl('', Validators.required),
      submittedDate : new FormControl('', Validators.required),
      timeExistence : new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      placement : new FormControl('', Validators.required)
    });
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
              this.route.navigateByUrl('/advertisement/list');
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

  showImg(event: any) {
    console.log(event);
    if (event.target.size > 9000000) {
      this.checkImgSize = false;
      return ;
    }
    if (event.target.name.match('^.*\\.(jpg|JPG)$')) {
       this.checkImgSize = true;
       return ;
    }
    this.selectedImage = event.target.files[0];
  }
  getCurrentDateTime(): string {
    return formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US');
  }

}
