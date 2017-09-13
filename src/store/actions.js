/**
 * Created by xiaobxia on 2017/9/13.
 */
import * as types from './actionTypes'
//TODO 可类比vue中的action

export const changeCount = (number) => {
  //返回的就是reducer中的action
  return {
    type: types.CHANGE_COUNT,
    number
  }
};


// export const increment = (nodeId) => ({
//   type: types.INCREMENT,
//   nodeId
// })
//
// let nextId = 0
// export const createNode = () => ({
//   type: types.CREATE_NODE,
//   nodeId: `new_${nextId++}`
// })
//
// export const deleteNode = (nodeId) => ({
//   type: types.DELETE_NODE,
//   nodeId
// })
//
// export const addChild = (nodeId, childId) => ({
//   type: types.ADD_CHILD,
//   nodeId,
//   childId
// })
//
// export const removeChild = (nodeId, childId) => ({
//   type: types.REMOVE_CHILD,
//   nodeId,
//   childId
// })
