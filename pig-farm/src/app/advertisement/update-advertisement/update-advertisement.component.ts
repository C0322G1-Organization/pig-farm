import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AdvertisementService} from '../service/advertisement.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {Placement} from "../model/placement";
import {Form, FormControl, FormGroup, Validators} from "@angular/forms";
import {finalize} from "rxjs/operators";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-update-advertisement',
  templateUrl: './update-advertisement.component.html',
  styleUrls: ['./update-advertisement.component.css']
})
export class UpdateAdvertisementComponent implements OnInit {
  placementList: Placement[];
  checkImgSize = false;
  formAdvertisement: FormGroup;
  advertisementId: number;
  selectedImage: File = null;
  constructor(private route: Router,
              private toast: ToastrService,
              private placementService: AdvertisementService,
              private storage: AngularFireStorage,
              private activatedRoute: ActivatedRoute) {
     this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
        this.advertisementId = +paramMap.get('id');
        console.log(this.advertisementId);
        this.getAdvertisement(this.advertisementId);
     });
  }

  ngOnInit(): void {
    this.placementService.getListPlacement().subscribe(next => {
      return this.placementList = next;
    });
    this.formAdvertisement = new FormGroup({
      // tslint:disable-next-line:max-line-length
      title: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+')]),
      image: new FormControl('', Validators.required),
      timeExistence: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      placement: new FormControl('', Validators.required)
    });
  }

   getAdvertisement(id: number) {
      this.placementService.findById(id).subscribe(ads => {
        this.formAdvertisement.patchValue(ads);
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
          this.placementService.update(this.advertisementId, this.formAdvertisement.value).subscribe(
            () => {
              this.route.navigateByUrl('/advertisement/list');
              this.toast.success('Sửa  quảng cáo thành công');
            },
            error => {
              this.toast.error('Sửa quảng cáo thất bại');
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
    // this.formAdvertisement.patchValue({image : this.selectedImage.name});
  }
  getCurrentDateTime(): string {
    return formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US');
  }
  compare(value, option): boolean{
    return value.id === option.id;
    console.log(value);
    console.log(option);
  }
}
