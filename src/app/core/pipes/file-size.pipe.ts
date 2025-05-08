import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize',
  standalone: true,
})
export class FileSizePipe implements PipeTransform {
  transform(sizeInBytes: number, useBinary = true): string {
    if (isNaN(sizeInBytes) || sizeInBytes < 0) return 'Invalid size';

    const binaryUnits = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const decimalUnits = ['Bytes', 'kB', 'MB', 'GB', 'TB', 'PB'];

    const units = useBinary ? binaryUnits : decimalUnits;
    const base = useBinary ? 1024 : 1000;

    let fSize = sizeInBytes;
    let i = 0;

    while (fSize >= base && i < units.length - 1) {
      fSize /= base;
      i++;
    }

    return `${fSize.toFixed(2)} ${units[i]}`;
  }
}
