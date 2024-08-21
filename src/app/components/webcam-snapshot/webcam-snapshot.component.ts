import { AfterViewInit, Component, ElementRef, EventEmitter, Output, viewChild, ViewChild } from "@angular/core";

@Component({
  selector: 'app-webcam-snapshot',
  templateUrl: './webcam-snapshot.component.html',
  styleUrls: ['./webcam-snapshot.component.css']
})
// export class WebcamSnapshotComponent implements AfterViewInit {
//   WIDTH = 248;
//   HEIGHT = 186;

//   @ViewChild("video")
//   public video!: HTMLVideoElement;

//   @ViewChild("canvas")
//   public canvas!: ElementRef;

//   captures: string[] = [];
//   capturedImage: string='' // Variable to store the captured image
//   error='';
//   isCaptured= false;
//   private stream: MediaStream | null = null;

//   async ngAfterViewInit() {
//     await this.setupDevices();
//   }

//   async setupDevices() {
//     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true
//         }).then((stream: MediaStream) => {
//           if (this.video) {
//             if (stream) {
//               this.video.srcObject = stream;
//               this.stream = stream;
//               this.video.play();
//               this.error = '';
//             } else {
//               this.error = "You have no output video device";
//             }

//           }
//         });

//       } catch (e) {
//         this.error = JSON.stringify(e);
//       }
//     }
//   }

//   capture() {
//     this.drawImageToCanvas(this.video);
//     this.capturedImage = this.canvas.nativeElement.toDataURL("image/png"); // Store captured image
//     this.captures.push(this.capturedImage);
//     this.isCaptured = true;
//   }

//   removeCurrent() {
//     this.isCaptured = false;
//     this.capturedImage = ''; // Reset captured image
//   }

//   drawImageToCanvas(image: any) {
//     this.canvas.nativeElement
//       .getContext("2d")
//       .drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);
//   }
// }

export class WebcamSnapshotComponent {
  isCaptured: boolean = false;
  private stream: MediaStream | null = null;
  @ViewChild('video', { static: true })
  videoElement!: ElementRef<HTMLVideoElement>;
  @Output() onImageCaptured = new EventEmitter();
  capturedImage: string = ""
  ngOnInit(): void {
    // this.initializeWebcam();
    console.log('test');
  }

  capture() {
    console.log("call")
    this.isCaptured = false
    this.initializeWebcam()
  }
  async removeCurrent() {
    await this.markAttendance()
  }

  ngOnDestroy(): void {
    this.stopWebcam();
  }


  async markAttendance(): Promise<void> {
    const video: HTMLVideoElement = this.videoElement.nativeElement;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      const imageBlob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/jpeg')
      );

      if (imageBlob) {
        this.stopWebcam()
        this.isCaptured = true
        const reader = new FileReader();
        reader.onloadend = () => {
          this.capturedImage = reader.result as string;
          this.onImageCaptured.emit(this.capturedImage)
        };
        reader.readAsDataURL(imageBlob);
      }
    }
  }



  initializeWebcam(): void {
    const video: HTMLVideoElement | null = document.getElementById(
      'video'
    ) as HTMLVideoElement;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream: MediaStream) => {
          if (video) {
            video.srcObject = stream;
            this.stream = stream;
          }
        })
        .catch((error: any) => {
          console.error('Error accessing webcam: ', error);
        });
    } else {
      console.error('getUserMedia not supported in this browser.');
    }
  }
  stopWebcam(): void {
    if (this.stream) {
      const tracks = this.stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  }
}
