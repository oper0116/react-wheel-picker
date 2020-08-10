import React, { createRef, RefObject } from 'react';
import classNames from 'classnames';


interface itemTypes {
  value: number | string;
  display: string | HTMLElement;
}

interface PropsType {
  items: itemTypes[];
  selectedIndex: number;
  onChange?: (index: number) => void;
}

interface StateType {
  activeIndex: number
  translateY: number;
}

export default class WheelPicker extends React.Component<PropsType, StateType> {

  public static defaultProps = {
    selectedIndex: 0
  };

  private criticalPoints: { min: number; max: number; } =  { min: 0, max: 0 };

  private startTouchY: number =  0;

  private currentTanslateY: number = 0

  private isTouchStart: boolean  = false;

  private isMoving: boolean = true;

  private containerRef: RefObject<HTMLDivElement> = createRef();

  private itemRefs: RefObject<HTMLDivElement>[] = this.props.items.map(() => createRef());;

  public constructor(props: PropsType) {
    super(props);
    this.state = {
      activeIndex: 0,
      translateY: 0
    };
  }

  public componentDidMount() {
    this.onSelectedValue(this.props.selectedIndex, true);
  }

  public render() {
    return (
      <div className="picker-container">
        <div className="picker-wrapper" ref={this.containerRef}>
          <div
            className="picker-scroller"
            onTouchStart={this.onStart}
            onTouchMove={this.onMove}
            onTouchEnd={this.onEnd}
            onMouseDown={this.onStart}
            onMouseMove={this.onMove}
            onMouseLeave={this.onEnd}
            onMouseUp={this.onEnd}
            style={{
              transform: `translate3d(0, ${ this.state.translateY }px, 0)`,
              transitionDuration: this.isMoving ? '0ms' : ''
            }}
          >
            {
              this.props.items.map((item, index) => {
                return (
                  <div
                    key={index}
                    ref={this.itemRefs[index]}
                    className={classNames('picker-item', {'selected': this.state.activeIndex === index })}
                    data-index={index}
                    onClick={() => this.onClickItem(index)}
                  >
                    { React.createElement('div', { dangerouslySetInnerHTML: { __html: item.display } })}
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    );
  }

  private onSelectedValue(index: number, initilize: boolean) {
    const containerHeight = this.containerRef.current!.offsetHeight;
    const itemHeight = this.itemRefs.length > 0 ? this.itemRefs[0].current!.offsetHeight : 0;

    this.criticalPoints = {
      min: (containerHeight / 2) - (itemHeight * (this.props.items.length - 1)) + (itemHeight / 2),
      max: (containerHeight / 2) - (itemHeight / 2)
    }

    this.currentTanslateY = (containerHeight / 2) - (itemHeight / 2) - (index * itemHeight);
    this.setState({
      ...this.state,
      activeIndex: index,
      translateY: (containerHeight / 2) - (itemHeight / 2) - (index * itemHeight)
    });

    if (initilize) {
      return;
    }

    if (this.props.onChange) {
      this.props.onChange(index);
    }
  }

  private onStart = (event: any) => {
    if (!this.isTouchStart) {
      this.isTouchStart = true;
    }

    this.startTouchY = event.pageY || event.targetTouches[0].pageY;
  }

  private onMove = (event: any) => {
    if (!this.isTouchStart) {
      return;
    }

    if (!this.isMoving) {
      this.isMoving = true;
    }

    const touchY = event.pageY || event.targetTouches[0].pageY;
    let nextScrollerTranslate = (this.currentTanslateY + touchY) - this.startTouchY;

    if (nextScrollerTranslate < this.criticalPoints.min) {
      nextScrollerTranslate = this.criticalPoints.min - ((this.criticalPoints.min - nextScrollerTranslate) ** 0.8)
    } else if (nextScrollerTranslate > this.criticalPoints.max) {
      nextScrollerTranslate = this.criticalPoints.max + ((nextScrollerTranslate - this.criticalPoints.max) ** 0.8);
    }

    this.setState({
      ...this.state,
      translateY: nextScrollerTranslate
    });
  }

  private onEnd = () => {
    if (this.isTouchStart) {
      this.isTouchStart = false;
    }
      
    if (this.isMoving) {
      this.isMoving = false;
    }
    
    this.startTouchY = 0;

    let activeIndex;
    if (this.state.translateY > this.criticalPoints.max) {
      activeIndex = 0;
    } else if (this.state.translateY < this.criticalPoints.min) {
      activeIndex = (this.props.items.length - 1);
    } else {
      activeIndex = Math.round(Math.abs((this.state.translateY - this.criticalPoints.max) / this.itemRefs[0].current!.offsetHeight));
    }

    this.onSelectedValue(activeIndex, false);
  }

  private onClickItem(index: number) {
    this.onSelectedValue(index, false);
  }
}