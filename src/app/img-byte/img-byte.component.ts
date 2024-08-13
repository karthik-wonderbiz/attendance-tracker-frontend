import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-img-byte',
  templateUrl: './img-byte.component.html',
  styleUrls: ['./img-byte.component.css']
})
export class ImgByteComponent {
  name = 'Test display image';
  thumbnail: SafeUrl | undefined;
  imageId: number | undefined;

  constructor(private sanitizer: DomSanitizer, private http: HttpClient) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        this.saveImageToDatabase(base64String);
        const objectURL = 'data:image/jpeg;base64,' + base64String;
        this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      };

      reader.readAsDataURL(file);
    }
  }

  saveImageToDatabase(base64String: string): void {
    const imageData = { imageData: base64String };

    this.http.post('http://localhost:5029/api/images', imageData)
      .subscribe(response => {
        console.log('Image saved successfully', response);
      }, error => {
        console.error('Error saving image', error);
      });
  }

  getImageFromDatabase(imageId: number | undefined): void {
    if (imageId !== undefined) {
      this.http.get(`http://localhost:5029/api/images/${imageId}`, { responseType: 'blob' })
        .subscribe(blob => {
          const objectURL = URL.createObjectURL(blob);
          this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        }, error => {
          console.error('Error fetching image', error);
        });
    }
  }
}
