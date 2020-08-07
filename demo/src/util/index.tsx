export function isUndefined(value?: any): boolean {
  return typeof value === 'undefined';
}

export function whichTransitionEvent(){
  const el: {
    [key: string]: any;
  } = document.createElement('fakeelement');
  const transitions: {
    [key: string]: any;
  } = {
    'transition'      : 'transitionend',
    'OTransition'     : 'oTransitionEnd',
    'MozTransition'   : 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd'
  };

  for (const t in transitions) {
    if (el.style[t] !== undefined){
      return transitions[t];
    }
  }
}

export function easyInOutQuad(t: number, b: number, c: number, d: number) {
  t /= d / 2;
  if (t < 1) {
    return c/2*t*t + b;
  }
  t--;
  return -c/2 * (t*(t-2) - 1) + b;
}
  