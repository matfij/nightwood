import { ContentChild, Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
  selector: '[tooltip]',
})
export class TooltipDirective {

  @Input() plantRef!: TemplateRef<any>;
  @ContentChild('tooltipTemplate') tooltipTemplateRef!: TemplateRef<Object>;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef,
  ) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const itemPosX = this.elementRef.nativeElement.getBoundingClientRect().x;
    const itemPosY = this.elementRef.nativeElement.getBoundingClientRect().y;
    let nodeStyle = ''

    const view = this.viewContainerRef.createEmbeddedView(this.tooltipTemplateRef);
    view.rootNodes.forEach(node => {
      this.renderer.appendChild(this.elementRef.nativeElement, node);

      if (itemPosX > winWidth / 2) nodeStyle = 'right: 11%;';
      else nodeStyle = 'left: 11%;';
      if (itemPosY > winHeight / 2) nodeStyle += 'bottom: 110%;';
      else nodeStyle += 'top: 110%;';

      node.setAttribute('style', nodeStyle);
    });
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.viewContainerRef) {
      this.viewContainerRef.clear();
    }
  }

}
