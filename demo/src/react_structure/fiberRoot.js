type BaseFiberRootProperties = {|
  // * 根类型 有 legacy, batched, concurrent
  tag: RootTag,

  // * 挂载的容器
  containerInfo: any,
  // ? 仅用于持久更新。 
  pendingChildren: any,
  // * 当前活动的FiberRoot。这是树的可变根。
  current: Fiber,

  pingCache: WeakMap<Wakeable, Set<mixed>> | Map<Wakeable, Set<mixed>> | null,

  // * 准备提交的已完成的正在进行的工作 HostRoot。 
  finishedWork: Fiber | null,

  // * 在任务被挂起的时候通过setTimeout设置的返回内容，
  // * 用来下一次如果有新的任务挂起时清理还没触发的timeout.
  timeoutHandle: TimeoutHandle | NoTimeout,
  // * 顶层上下文对象, 由 renderSubtreeIntoContainer 使用
  context: Object | null,
  pendingContext: Object | null,

  // * 用来确定第一次渲染的时候是否需要融合
  +hydrate: boolean,

  // Used by useMutableSource hook to avoid tearing during hydration.
  mutableSourceEagerHydrationData?: Array<
    MutableSource<any> | MutableSourceVersion,
  > | null,

  // * 由 Scheduler.scheduleCallback 返回的节点。代表下一次渲染根将处理的任务。
  callbackNode: *,
  callbackPriority: Lane,
  eventTimes: LaneMap<number>,
  expirationTimes: LaneMap<number>,

  pendingLanes: Lanes,
  suspendedLanes: Lanes,
  pingedLanes: Lanes,
  expiredLanes: Lanes,
  mutableReadLanes: Lanes,

  finishedLanes: Lanes,

  entangledLanes: Lanes,
  entanglements: LaneMap<Lanes>,

  pooledCache: Cache | null,
  pooledCacheLanes: Lanes,
|};