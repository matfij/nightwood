import { ContentChild, Directive, ElementRef, EmbeddedViewRef, HostListener, Renderer2, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
  selector: '[tooltip]',
})
export class TooltipDirective {

  basePositionX: number = 0;
  basePositionY: number = 0;
  baseSizeX: number = 0;
  baseSizeY: number = 0;
  xPositionDir: PositionDirection = 'left';
  xPositionFactor: number = 0;
  yPositionDir: PositionDirection = 'top';
  yPositionFactor: number = 0;
  view?: EmbeddedViewRef<Object>;
  @ContentChild('tooltipTemplate') tooltipTemplateRef!: TemplateRef<Object>;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef,
  ) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.baseSizeX = window.innerWidth;
    this.baseSizeY = window.innerHeight;
    this.basePositionX = this.elementRef.nativeElement.getBoundingClientRect().x;
    this.basePositionY = this.elementRef.nativeElement.getBoundingClientRect().y;

    this.view = this.viewContainerRef.createEmbeddedView(this.tooltipTemplateRef);
    this.view.rootNodes.forEach(node => {
      this.renderer.appendChild(this.elementRef.nativeElement, node);
      if (this.basePositionX > this.baseSizeX / 2) this.xPositionDir = 'right';
      else this.xPositionDir = 'left';
      if (this.basePositionY > this.baseSizeY / 2) this.yPositionDir = 'bottom';
      else this.yPositionDir = 'top';
    });
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const offsetX = this.elementRef.nativeElement.offsetWidth;
    const offsetY = this.elementRef.nativeElement.offsetHeight;

    this.view?.rootNodes.forEach(node => {
      if (this.xPositionDir === 'left') {
        this.xPositionFactor = event.clientX - this.basePositionX + 0.5*offsetX;
      } else {
        this.xPositionFactor = this.basePositionX - event.clientX + 1.5*offsetX;
      }
      if (this.yPositionDir === 'top') {
        this.yPositionFactor = event.clientY - this.basePositionY + 0.5*offsetY;
      } else {
        this.yPositionFactor = this.basePositionY - event.clientY + 1.5*offsetY;
      }
      this.setNodeStyle(node);
    });
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.viewContainerRef) {
      this.viewContainerRef.clear();
    }
  }

  private setNodeStyle(node: any) {
    const nodeStyle = `${this.xPositionDir}: ${this.xPositionFactor}px; ${this.yPositionDir}: ${this.yPositionFactor}px;`;
    node.setAttribute('style', nodeStyle);
  }
}

type PositionDirection = 'top' | 'bottom' | 'left' | 'right';
