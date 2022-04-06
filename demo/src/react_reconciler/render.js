



// 在Fiber上同步执行
function performSyncWorkOnRoot() {
  // render 阶段
  renderRootSync()
  // commit 阶段
  commitRoot(root);
}

function renderRootSync(root) {
  do {
    try {
      workLoopSync();
      break;
    } catch (thrownValue) {
      handleError(root, thrownValue);
    }
  } while (true);
}


function workLoopSync() {
  // Already timed out, so perform work without checking if we need to yield.
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
}


/////////////////////////////  






// 在Fiber上并发执行
function performConcurrentWorkOnRoot() {
  // render 阶段
  renderRootConcurrent();
  // commit 阶段
  commitRoot(root)

}

function renderRootConcurrent() {
  do {
    try {
      workLoopConcurrent();
      break;
    } catch (thrownValue) {
      handleError(root, thrownValue);
    }
  } while (true);
}

function workLoopConcurrent() {
  while (workInProgress !== null && !shouldYield()) {
    performUnitOfWork(workInProgress);
  }
}



/////////////////////////////////////////////


function handleError(root, thrownValue) {
  let erroredWork = workInProgress;

  do {
    try {
      completeWrok(erroredWork)
    } catch (error) {
      continue;
    }
  } while (true);
}