import React from 'react';
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
    activeIndex: number;
    translateY: number;
}
export default class WheelPicker extends React.Component<PropsType, StateType> {
    static defaultProps: {
        selectedIndex: number;
    };
    private criticalPoints;
    private startTouchY;
    private currentTanslateY;
    private isTouchStart;
    private isMoving;
    private containerRef;
    private itemRefs;
    constructor(props: PropsType);
    componentDidMount(): void;
    render(): JSX.Element;
    private onSelectedValue;
    private onStart;
    private onMove;
    private onEnd;
    private onClickItem;
}
export {};
