import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Messages } from '../../../texts/messages';

@Component({
  selector: 'hw-image-drop-zone',
  templateUrl: './image-drop-zone.component.html',
  styleUrl: './image-drop-zone.component.css'
})
export class ImageDropZoneComponent {
  Messages = Messages;
  @Input() existingImages: string[] = [];
  @Output() save = new EventEmitter<(File | string)[]>();

  newFiles: File[] = [];

  ngOnInit() { }

  get allImages() {
    return [...this.existingImages, ...this.newFiles.map(f => URL.createObjectURL(f))];
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      this.addFiles(event.dataTransfer.files);
    }
  }

  onFileInput(event: any) {
    this.addFiles(event.target.files);
  }

  addFiles(fileList: FileList) {
    for (let i = 0; i < fileList.length; i++) {
      this.newFiles.push(fileList[i]);
    }
  }

  removeImage(index: number, isExisting: boolean) {
    if (isExisting) {
      this.existingImages.splice(index, 1);
    } else {
      this.newFiles.splice(index - this.existingImages.length, 1);
    }
  }

  onSave() {
    this.save.emit([...this.existingImages, ...this.newFiles]);
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }
}
