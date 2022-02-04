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
    const view = this.viewContainerRef.createEmbeddedView(this.tooltipTemplateRef);
    view.rootNodes.forEach(node => {
      this.renderer.appendChild(this.elementRef.nativeElement, node);
    });
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.viewContainerRef) {
      this.viewContainerRef.clear();
    }
  }

}
