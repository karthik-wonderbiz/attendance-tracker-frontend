import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";

@Component({
  selector: 'app-webcam-snapshot',
  templateUrl: './webcam-snapshot.component.html',
  styleUrls: ['./webcam-snapshot.component.css']
})
export class WebcamSnapshotComponent implements AfterViewInit {
  WIDTH = 200;
  HEIGHT = 150;

  @ViewChild("video")
  public video!: ElementRef;

  @ViewChild("canvas")
  public canvas!: ElementRef;

  captures: string[] = [];
  capturedImage: string='' // Variable to store the captured image
  error: any;
  isCaptured!: boolean;

  async ngAfterViewInit() {
    await this.setupDevices();
  }

  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        if (stream) {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
          this.error = null;
        } else {
          this.error = "You have no output video device";
        }
      } catch (e) {
        this.error = e;
      }
    }
  }

  capture() {
    this.drawImageToCanvas(this.video.nativeElement);
    this.capturedImage = this.canvas.nativeElement.toDataURL("image/png"); // Store captured image
    this.captures.push(this.capturedImage);
    this.isCaptured = true;
  }

  removeCurrent() {
    this.isCaptured = false;
    this.capturedImage = ''; // Reset captured image
  }

  drawImageToCanvas(image: any) {
    this.canvas.nativeElement
      .getContext("2d")
      .drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);
  }
}
