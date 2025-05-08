import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  HostListener,
} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'img[imgFallback]',
  standalone: true,
})
export class FallbackImageDirective {
  @Input() fallbackImage = '/images/placeholder-image.svg';

  constructor(private el: ElementRef, private renderer: Renderer2) {
    console.log('Image failed to load, loading fallback image');
  }

  @HostListener('error')
  loadFallbackImage() {
    this.renderer.setAttribute(
      this.el.nativeElement,
      'src',
      this.fallbackImage
    );
  }
}
