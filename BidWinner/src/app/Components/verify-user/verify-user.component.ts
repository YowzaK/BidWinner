import { DatabaseService } from 'src/app/Services/database.service';
import { AuthService } from './../Auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css'],
})
export class VerifyUserComponent implements OnInit {
  img: File[] = [];
  imgUrl: string = '';

  ngOnInit(): void {}

  constructor(
    private authService: AuthService,
    private databaseService: DatabaseService,
    private router: Router
  ) {}

  onSelect(event: any) {
    this.img.push(...event.addedFiles);
  }
  onRemove(event: any) {
    this.img.splice(this.img.indexOf(event), 1);
  }

  submitInformation() {
    if (this.img[0] != null) {
      const formData: FormData = new FormData();
      formData.append('foo', this.img[0]);
      const name = this.authService.getUserID() + '_face';
      const id =this.authService.getUserID();

      this.databaseService
        .uploadImage(formData, name)
        .then((response) => {
          this.imgUrl = this.databaseService.imageURL;
          console.log(this.imgUrl);
        })
        .then((response) => {
          this.databaseService.uploadFaceAndVerify(id).then(
            (response) => {
              alert('success');
              this.router.navigate(['/userProfile']);
            },
            (error) => {
              alert('error');
            }
          );
        });
    }
  }
}
