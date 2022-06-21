/*
 * @Description: 
 * @Version: 1.0
 * @Author: chengweihang
 * @Date: 2022-06-09 14:25:40
 * @LastEditors: chengweihang
 * @LastEditTime: 2022-06-20 17:16:19
 */

const pending = 'pending';
const fulfilled = 'fulfilled';
const rejected = 'rejected';

const getPortsData = (id, actionList, eventList) => {
    const ports = [];
    ports.push(...actionList.map(item => {
        return {
            id: id + `[${item}]`,
            group: "action",
            attrs: {
                portNameLabel: {
                    text: `${item}`,
                }
            },
        };
    }));
    ports.push(...eventList.map(item => {
        return {
            id: id + `[${item}]`,
            group: "event",
            attrs: {
                portNameLabel: {
                    text: `${item}`,
                }
            },
        };
    }));
    return ports;
};
const viewDataMap = new Map(
    [
        ['action', {
            actionList: ['显示', '隐藏'],
            eventList: ['数据请求完成', '单击', '初始化完成']
        }],
        ['judge', {
            actionList: ['判断'],
            eventList: ['是', '否']
        }]
    ]
);
const getViewData = ({
    id,
    type
}) => {
    const viewData = viewDataMap.get(type);
    return {
        id: id,
        shape: "er-rect",
        label: "组件" + id,
        width: 150,
        height: 24,
        position: {
            x: 24,
            y: 150,
        },
        ports: getPortsData(id, viewData.actionList, viewData.eventList)
    };
};


const nodeAnimation = (item) => {
    return new Promise((resolve) => {
        const graph = window._graph,
            target = graph.getNodes().find(node => node.id == item.id);
        //设置激活样式
        target.attr({
            rect: {
                strokeWidth: 1,
                stroke: '#5F95FF',
                fill: '#5F95FF',
            },
            label: {
                fontWeight: 'bold',
                fill: 'red',
                fontSize: 16,
            }
        });
        setTimeout(() => {
            //还原为默认样式
            target.attr({
                rect: {
                    strokeWidth: 1,
                    stroke: '#5F95FF',
                    fill: '#5F95FF',
                },
                label: {
                    fontWeight: 'bold',
                    fill: '#ffffff',
                    fontSize: 16,
                }
            });
            resolve();
        }, 1000);
    });
};
class Node {
    constructor({
        id = undefined,
        type = 'base',
        targetActionList = [
            //     {
            //     id: '', //指针
            //     actionName: ''
            // }
        ],

    }) {
        this.id = id === undefined ? new Date().getTime() : id;
        this.type = type;
        this.targetActionList = targetActionList;
        //连线后，将对应的任务识别信息加入

        //设想
        this.parentFind = null;

        //展示
    }
    execute({
        data, //传递的数据
        actionName //触发的动作
    }) {
        let state = pending,
            result = null;
        //执行任务
        try {
            result = this.execute_inner({
                data,
                actionName
            });
            //筛选接下来触发的任务
            const nextTask = this.filterNextTargetAction({
                data,
                actionName,
                result
            });
            //在本任务结束后，将data作为参数托付给接下来的所有任务
            nextTask.forEach((item) => {
                //动画效果
                if (window._graph) {
                    nodeAnimation(item).then(() => {
                        //激发下个节点
                        this.parentFind(item.id).execute({
                            data: this.transformData(result),
                            actionName: item.actionName
                        });
                    });
                }
                //动画效果 结束
                else {
                    this.parentFind(item.id).execute({
                        data: this.transformData(result),
                        actionName: item.actionName
                    });
                }
            });
            state = fulfilled;
        } catch (e) {
            state = rejected;
        } finally {
            return state;
        }

    }
    execute_inner({
        data,
        actionName
    }) {
        return {
            data,
            actionName
        };
    }
    transformData(
        result,
    ) {
        return result;
    }
    filterNextTargetAction({
        // data,
        // actionName,
        // result
    }) {
        return this.targetActionList;
    }

    //视图层使用的工具函数

    addTargetAction(newTask) {
        console.log(newTask);
        this.targetActionList.push(newTask);
    }
    deleteTargetAction(oldTask) {
        this.targetActionList = this.targetActionList.filter(item => {
            if (item.id == oldTask.id && item.actionName == oldTask.actionName) return false;
            return true;
        });
    }

}
class ActionNode extends Node {
    constructor(data) {
        super({
            type: 'action',
            ...data
        });
    }
    execute_inner({
        // actionName
    }) {
        //$widgetManager.$emit(this.action.name, this.id)
        // console.log(`通知任务中心 组件'${this.id}' 触发'${actionName}'事件 `);
    }
    filterNextTargetAction({
        actionName
    }) {
        const reg = /\[.*\]$/,
            name = actionName.match(reg);
        if (name != null) console.log(name[0].slice(1, name[0].length - 1));
        return this.targetActionList.filter(item => item.eventName.includes('单击'));
    }
}

class EnterTask extends Node {
    constructor() {
        super({
            type: 'enter'
        });
        this.action = {
            name: 'enter'
        };
    }
    execute_inner(actionName) {
        // console.log(`通知任务中心 组件'${this.id}' 触发'${this.action.name}'事件 `);
        return actionName;
    }
}

class JudgeTask extends Node {
    constructor(data) {
        super({
            type: 'judge',
            ...data
        });
    }
    execute_inner({
        data
    }) {
        const result = Math.random() > 0.5;
        return {
            data,
            result
        };
    }
    filterNextTargetAction({
        result
    }) {
        // console.log(result);
        if (result.result)
            return this.targetActionList.filter(item => item.eventName.includes('是'));
        return this.targetActionList.filter(item => item.eventName.includes('否'));
    }
}

class FilterTask extends Node {
    constructor() {
        super({
            type: 'filter'
        });
    }
    execute_inner({
        data
    }) {
        const result = new Function('return data')(data);
        return result;
    }
}

const nodeMap = new Map([
    ['action', ActionNode],
    ['enter', EnterTask],
    ['judge', JudgeTask],
    ['filter', FilterTask],
]);
class NodeEnvironment {
    constructor(list = []) {
        this.nodeList = [];

        this.dndNode = null;
        list.forEach(item => {
            this.createNode(item.type, item);
        });
    }
    createNode(type, data = undefined) {
        let newNode = null;
        const func = nodeMap.get(type);
        if (data === undefined) newNode = new func();
        else newNode = new func(data);
        newNode.parentFind = this.findNode.bind(this);
        this.nodeList.push(newNode);
        if (newNode.viewData === undefined)
            return {
                ...newNode,
                viewData: getViewData({
                    id: newNode.id,
                    type: newNode.type
                })
            };
        //允许部分Node运行态自定义view层样式
        else return newNode;
    }
    //创建拖拽时存在的节点
    createDndNode(type) {
        let newNode = null;
        const func = nodeMap.get(type);
        newNode = new func();
        newNode.parentFind = this.findNode.bind(this);

        this.dndNode = newNode;

        if (newNode.viewData === undefined)
            return {
                ...newNode,
                viewData: getViewData({
                    id: newNode.id,
                    type: newNode.type
                })
            };
        //允许部分Node运行态自定义view层样式
        else return newNode;
    }
    //拖拽节点放置后,回调
    setDndNode() {
        this.nodeList.push(this.dndNode);
        this.dndNode = null;
    }
    findNode(id) {
        return this.nodeList.find((item) => item.id == id);
    }
    deleteNode(id) {
        this.nodeList.forEach(cur => {
            cur.targetActionList = cur.targetActionList.filter(item => item.id != id);
        });
        this.nodeList = this.nodeList.filter(item => item.id != id);
    }
}

export default NodeEnvironment;
export {
    ActionNode,
    EnterTask,
    JudgeTask,
    FilterTask
};