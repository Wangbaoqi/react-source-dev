import { SyncLane } from "../../../react/packages/react-reconciler/src/ReactFiberLane.old";
import { unbatchedUpdates } from "../../../react/packages/react-reconciler/src/ReactFiberReconciler";
import { updateContainer } from "../../../react/packages/react-reconciler/src/ReactFiberReconciler.old";
import { createFiberRoot } from "../../../react/packages/react-reconciler/src/ReactFiberRoot.old";
import { requestUpdateLane } from "../../../react/packages/react-reconciler/src/ReactFiberWorkLoop.old";
import { createUpdate, enqueueUpdate, initializeUpdateQueue } from "../../../react/packages/react-reconciler/src/ReactUpdateQueue.old";



ReactDOM.render = (children: ReactNodeList, container, cb) => {

  return legacyRenderSubtreeIntoContainer(null, children, container, forceHydrate, null)
}

//****************** 初次mount *******************/

// 创建FiberRoot
// 创建RootFiber
// 两个通过current 和 stateNode 连接
// 初始化更新队列


function legacyRenderSubtreeIntoContainer(parentComponent, children, container, forceHydrate, cb) {

  let root = container._reactRootContainer;
  let fiberRoot: FiberRoot;

  // mount
  if(!root) {
    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(container, forceHydrate)
    fiberRoot = root._internalRoot;

    // 初次mount不是批量更新
    unbatchedUpdates(() => {
      updateContainer(children, fiberRoot, parentComponent, cb)
    })
  }else {

  }
  // 返回 fiberRoot 或者 
  return getPublicRootInstance(fiberRoot);
}


function legacyCreateRootFromDOMContainer(container, forceHydrate) {

  const shouldHydrate = forceHydrate

  // 第一次 mount 清除所有子节点
  if(!shouldHydrate) {
    let rootSibling;
    while((rootSibling = container.lastChild)) {
      container.removeChild(rootSibling)
    }
  }

  return new ReactDOMLegacyRoot(container, shouldHydrate
    ? {
        hydrate: true,
      }
    : undefined,)
}


function ReactDOMLegacyRoot(container, options) {

  // export type RootTag = 0 | 1;
  // export const LegacyRoot = 0;
  // export const ConcurrentRoot = 1;

  this._internalRoot = createRootImpl(container, LegacyRoot, options)
}
ReactDOMLegacyRoot.prototype.render = function() {}
ReactDOMLegacyRoot.prototype.unmount = function() {}


function createRootImpl(container, tag, options) {

  // 处理 hydrate
  // ...

  const root = createFiberRoot(container, tag, hydrate, hydrationCallbacks, strictModeLevelOverride)


  // 事件处理
  // ...

  return root
}


function createFiberRoot(container, tag, ...rest) {

  // 创建FiberRoot 和 RootFiber
  // 两者通过current 和 stateNode 连接
  const fiberRoot = new FiberRootNode(container, tag, hydrate)
  const rootFiber = createHostRootFiber(tag, strictModeLevelOverride)
  fiberRoot.current = rootFiber
  rootFiber.stateNode = fiberRoot

  // 初始化rootFiber 更新队列
  initializeUpdateQueue(rootFiber)

  return fiberRoot
}

function createHostRootFiber(tag, strictModeLevelOverride) {
  // NoMode = 0b000000 = 0
  // ConcurrentMode = 0b000001 = 1

  const mode = NoMode || ConcurrentMode

  // HostRoot = 3 
  // ReactWorkTag.js
  return createFiber(HostRoot, null, null, mode)
}

function initializeUpdateQueue(rootFiber) {
  const updateQueue = {
    baseState: {
      element: null
    },
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: {
      pending: null,
      interleaved: null,
      lanes: NoLanes
    },
    effects: null

  }
  rootFiber.updateQueue = updateQueue
}


function updateContainer(element, fiberRoot, parentComponent, cb) {

  // rootFiber
  const current = fiberRoot.current;

  // 创建更新 更新入rootFiber更新队列
  const eventTime = requestEventTime(); // get currentTime
  const lane = requestUpdateLane(current); 
  const update = createUpdate(eventTime, lane);
  update.payload = {element}

  enqueueUpdate(current, update, lane);

  // 开始调度
  const root = scheduleUpdateOnFiber(current, lane, eventTime)

  return lane
}


//******************  开始调度 scheduleUpdateOnFiber *******************/


function scheduleUpdateOnFiber(fiber, lane, eventTime) {

  // 标记从Fiber到根的更新通道
  const root = markUpdateLaneFromFiberToRoot(fiber, lane);

  // 标记根有一个挂起的更新
  markRootUpdated(root, lane, eventTime);


  // 同步Lane legacy更新模式
  if(lane === SyncLane) {

    // render阶段 起点
    performSyncWorkOnRoot(root)

  }else {
    // concurrent Mode 
    ensureRootIsScheduled(root, eventTime);

  }

}


