import { BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, ElementRef, ViewChild, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-open-pdf',
  templateUrl: './app-open-pdf.component.html',
  styles: [
    `
      .big-model-dialog {
        width: 900px;
      }
    `,
  ],
  styleUrls: ['./app-open-pdf.component.css'],
})
export class OpenPdfComponent implements OnInit {
  public file: any;
  public modalConfig: any;
  @Input() private visualizar: string;
  @Input() private openPdf: EventEmitter<boolean>;
  @ViewChild('btnModal') private btnModal: ElementRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    this.modalConfig = {
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      size: 'lg',
      class: 'modal-lg',
    };

    if (this.openPdf) {
      this.openPdf.subscribe((_file: any) => {
        this.file = _file;
        this.mostrar();
      });
    }
  }

  mostrar() {
    switch (this.visualizar) {
      case 'modal':
        this.pdfModal();
        break;

      case 'download':
        this.pdfDownload();
        break;

      case 'tab':
        this.pdfTab();
        break;

      default:
        this.pdfModal();
        break;
    }
  }

  pdfModal() {
    const visor = document.getElementById('visorPDF');
    visor.querySelectorAll('*').forEach((n) => n.remove());

    const file = new Blob([this.file], { type: 'application/pdf' });

    const fileUrl = URL.createObjectURL(file);
    const elemento = document.createElement('object');

    elemento.data = fileUrl;
    elemento.type = 'application/pdf';
    elemento.style.cssText = 'width: 100%; height: 75vh';

    visor.appendChild(elemento);

    setTimeout(() => {
      this.btnModal.nativeElement.click();
    }, 300);
  }

  pdfDownload() {
    const file = new Blob([this.file], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);
    const link = document.createElement('a');
    setTimeout(() => {
      link.href = fileURL;
      link.download = 'documento.pdf';
      link.click();
    }, 300);
  }

  pdfTab() {
    const file = new Blob([this.file], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);
    setTimeout(() => {
      window.open(fileURL);
    }, 300);
  }
}
