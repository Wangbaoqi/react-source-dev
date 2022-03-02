



// * 单个节点对比

// 有下列几种场景

// ** 1. key相同并且元素type相同 可以复用节点

// ** a. 复用节点: 同一个Fiber，更新其 pendingProps（即将更新的props）
// ** b. 标记该节点的兄弟节点 删除

// 2. key相同并且元素type不同 标记该节点以及兄弟节点 删除

// ** 创建新Fiber节点

// 3. key不同 直接标记该节点删除

// ** 创建新Fiber节点



// Test Case

// 1. key 相同 type 相同 

const a = <div key='a'>1</div>
const b = <div key='a'>4</div>

// 2. key 相同 type 不同

const a = <div key='a'>1</div>
const b = <p key='a'>4</p>

// 3. key 不同 type 不同

const a = <div key='a'>1</div>
const b = <p key='b'>4</p>



function reconcileSingleElement(
  returnFiber: Fiber,
  currentFirstChild: Fiber | null,
  element: ReactElement,
  lanes: Lanes,
): Fiber {
  const key = element.key;
  let child = currentFirstChild;

  while (child !== null) {

    // * 对比key 
    if (child.key === key) {
      const elementType = element.type;

      if (child.elementType === elementType) {

        // ?TODO 这种单节点的兄弟节点标记删除 ？
        deleteRemainingChildren(returnFiber, child.sibling);
        
        //* 复用节点 
        const existing = useFiber(child, element.props);
        existing.ref = coerceRef(returnFiber, child, element);
        existing.return = returnFiber;
        return existing;
      }

      // * key 相同 type不同 标记该节点以及其兄弟节点 删除
      deleteRemainingChildren(returnFiber, child);

      break;
    } else {
      // * key 不同 直接标记删掉该节点
      deleteChild(returnFiber, child);
    }

    // ?TODO 这种单节点的兄弟节点场景 ？
    child = child.sibling;
  }

  // 创建新Fiber
  const created = createFiberFromElement(element, returnFiber.mode, lanes);
  created.ref = coerceRef(returnFiber, currentFirstChild, element);
  created.return = returnFiber;
  return created;
}



