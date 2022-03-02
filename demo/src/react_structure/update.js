
// * 更新队列
export type UpdateQueue<State> = {|
  baseState: State,
  firstBaseUpdate: Update<State> | null,
  lastBaseUpdate: Update<State> | null,
  shared: SharedQueue<State>,
  effects: Array<Update<State>> | null,
|};



export type SharedQueue<State> = {|
  pending: Update<State> | null,
  interleaved: Update<State> | null,
  lanes: Lanes,
|};


export type Update<State> = {|
  // TODO: Temporary field. Will remove this by storing a map of
  // transition -> event time on the root.
  eventTime: number,
  lane: Lane,

  // * tag
  // * export const UpdateState = 0;
  // * export const ReplaceState = 1;
  // * export const ForceUpdate = 2;
  // * export const CaptureUpdate = 3;
  tag: 0 | 1 | 2 | 3,
  
  // * payload
  // * {element: JSX} 
  payload: any,

  callback: (() => mixed) | null,

  // * 指向下一次更新
  // * 首次更新 创建循环列表 
  next: Update<State> | null,
|};