/*
 * @Description: 
 * @Version: 1.0
 * @Author: chengweihang
 * @Date: 2022-06-09 14:25:40
 * @LastEditors: chengweihang
 * @LastEditTime: 2022-06-15 15:27:11
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
        this.viewData = {
            id: this.id,
            shape: "er-rect",
            label: "入口" + this.id,
            width: 150,
            height: 24,
            position: {
                x: 24,
                y: 150,
            },
            ports: getPortsData(this.id, ['显示', '隐藏'], ['数据请求完成', '单击', '初始化完成'])
        };
        //设想
        this.parentFind = null;

        //展示
    }
    execute({
        data,
        actionName
    }) {
        let state = pending,
            result = null;
        //执行任务
        try {
            result = this.execute_inner({
                data,
                actionName
            });
            state = fulfilled;
        } catch (e) {
            state = rejected;
        }
        //筛选接下来触发的任务
        if (state === fulfilled) {
            const nextTask = this.filterNextTask({
                result,
                data,
                actionName
            });

            //在本任务结束后，将data作为参数托付给接下来的所有任务
            // nextTask.forEach((newTask) => newTask.execute({
            //     data: this.transformData(result),
            // actionName:newTask.actionName
            // }));
            nextTask.forEach((item) => {
                //动画效果
                if (window._graph) {
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
                        //激发下个节点
                        this.parentFind(item.id).execute({
                            data: this.transformData(result),
                            actionName: item.actionName
                        });
                    }, 1000);
                }
                //动画效果
                else {
                    this.parentFind(item.id).execute({
                        data: this.transformData(result),
                        actionName: item.actionName
                    });
                }

            });
        }
        return;
    }
    execute_inner({
        data
    }) {
        return data;
    }
    transformData(
        data,
    ) {
        return data;
    }
    filterNextTask() {
        return this.targetActionList;
    }

    //视图层使用的工具函数

    addTask(newTask) {
        this.targetActionList.push(newTask);
    }
    deleteTask(oldTask) {
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
    execute_inner({actionName}) {
        //$widgetManager.$emit(this.action.name, this.id)
        console.log(`通知任务中心 组件'${this.id}' 触发'${actionName}'事件 `);
    }
    filterNextTask({
        actionName
    }) {
        const reg = /\[\]]$/;
        console.log(reg.exec(actionName));
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
        console.log(`通知任务中心 组件'${this.id}' 触发'${this.action.name}'事件 `);
        return actionName;
    }
}

class NodeEnvironment {
    constructor(list = []) {
        this.nodeList = [];
        list.forEach(item => {
            this.createNode(item.type, item);
        });
    }
    createNode(type, data = undefined) {
        let newNode = null;
        switch (type) {
            case 'action':
                if (data === undefined)
                    newNode = new ActionNode();
                else
                    newNode = new ActionNode(data);

                break;
            case 'enter':
                if (data === undefined)
                    newNode = new EnterTask();
                else
                    newNode = new EnterTask(data);
                break;
        }
        newNode.parentFind = this.findNode.bind(this);
        this.nodeList.push(newNode);
        return newNode;
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
    judgeTask,
    filterTask
};


//如何实现链接？
//step
// 1.发起者 触发mouseDown事件,得到发起者指针
// 2.接受者 触发mouseUp事件，得到target，actionName 
// function connect(){

// }














class judgeTask extends Node {
    constructor() {
        super({
            type: 'judge'
        });
        this.fulTask = [];
        this.rejTask = [];
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
    filterNextTask({
        execute_result
    }) {
        if (execute_result.result)
            return this.fulTask;
        return this.rejTask;
    }
}

class filterTask extends Node {
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