export type Fiber = {|
  

  // * Tag 组件（Fiber）的类型 
  // * 类似 FunctionComponent = 0;
  tag: WorkTag,

  // * 这个Fiber的唯一标识符。
  key: null | string,

  // * 元素类型
  elementType: any,

  // * 与此Fiber关联的已解析函数/类/
  type: any,

  // * Fiber本地状态 真实的DOM节点
  stateNode: any,


  // ? Fiber 架构数据结构
  // * return 指向该节点的父节点
  return: Fiber | null,
  // * child 指向该节点的子节点
  child: Fiber | null,
  // * sibling 指向该节点的兄弟节点
  sibling: Fiber | null,
  index: number,

  // The ref last used to attach this node.
  // I'll avoid adding an owner field for prod and model that as functions.
  ref:
    | null
    | (((handle: mixed) => void) & {_stringRef: ?string, ...})
    | RefObject,

  // ? 组件更新带来的变化
  // * 新的变动带来的新的props
  pendingProps: any, 
  // * 上一次渲染完成之后的props
  memoizedProps: any, 
  // * 该Fiber对应的组件产生的Update会存放在这个队列里面
  updateQueue: mixed,
  // * 上一次渲染的时候的state
  memoizedState: any,
  dependencies: Dependencies | null,

  mode: TypeOfMode,

  // ? Effect 相关
  flags: Flags,
  subtreeFlags: Flags,
  deletions: Array<Fiber> | null,
  // * 单链表快速路径到具有副作用的下一个光纤。
  nextEffect: Fiber | null,
  // * 此子树中具有副作用的第一个和最后一个Fiber。
  // * 这允许当我们重用链表中完成的工作时，我们重用链表的一部分这个纤维。 
  firstEffect: Fiber | null,
  lastEffect: Fiber | null,

  // ? 泳道 优先级相关的属性
  lanes: Lanes,
  childLanes: Lanes,

  // ? current和workInProgress的指针 Fiber双缓存
  // * 这是 Fiber 的池化版本。每一个更新的Fiber都会最终有一对。
  // * 有些情况下我们可以清理对以保存内存，如果我们需要。 
  alternate: Fiber | null,

  // Time spent rendering this Fiber and its descendants for the current update.
  // This tells us how well the tree makes use of sCU for memoization.
  // It is reset to 0 each time we render and only updated when we don't bailout.
  // This field is only set when the enableProfilerTimer flag is enabled.
  actualDuration?: number,

  // If the Fiber is currently active in the "render" phase,
  // This marks the time at which the work began.
  // This field is only set when the enableProfilerTimer flag is enabled.
  actualStartTime?: number,

  // Duration of the most recent render time for this Fiber.
  // This value is not updated when we bailout for memoization purposes.
  // This field is only set when the enableProfilerTimer flag is enabled.
  selfBaseDuration?: number,

  // Sum of base times for all descendants of this Fiber.
  // This value bubbles up during the "complete" phase.
  // This field is only set when the enableProfilerTimer flag is enabled.
  treeBaseDuration?: number,

|};