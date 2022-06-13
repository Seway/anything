/*
 * @Description: 
 * @Version: 1.0
 * @Author: chengweihang
 * @Date: 2022-06-09 14:25:40
 * @LastEditors: chengweihang
 * @LastEditTime: 2022-06-13 10:45:22
 */

const pending = 'pending';
const fulfilled = 'fulfilled';
const rejected = 'rejected';
let count = 0;
class task {
    constructor({
        type
    }) {
        this.id = count++;
        this.type = type;
        this.connectTask = [{
            task: '', //指针
            actionName: ''
        }]; //连线后，将对应的任务识别信息加入

        //设想

        //展示
        this.color = 'red';
    }
    execute({
        data,
        actionName
    }) {
        // this.color = 'green';
        // let func = () => this.color = 'red';
        // func = func.bind(this);
        // setTimeout(func, 1000);
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
                result
            }); //在本任务结束后，将data作为参数托付给接下来的所有任务
            // nextTask.forEach((newTask) => newTask.execute({
            //     data: this.transformData(result),
            // actionName:newTask.actionName
            // }));
            nextTask.forEach((newTask) => newTask.task.execute({
                data: 1,
                actionName: newTask.actionName
            }));
        }
        return;
    }
    execute_inner({
        data
    }) {
        return data;
    }
    transformData(data) {
        return data;
    }
    filterNextTask() {
        return this.connectTask;
    }

    //视图层使用的工具函数

    addTask(newTask) {
        this.connectTask.push(newTask);
    }

}
class judgeTask extends task {
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

class filterTask extends task {
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

class actionTask extends task {
    constructor() {
        super({
            type: 'action'
        });
        this.action = {
            name: 'hide'
        };
    }
    execute_inner() {
        //$widgetManager.$emit(this.action.name, this.id)
        console.log(`通知任务中心 组件'${this.id}' 触发'${this.action.name}'事件 `);
    }
}

class enterTask extends task {
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
    // addTask({
    //     newTask,
    //     action
    // }) {
    //     this.connectTask.push({
    //         action: action,
    //         task: newTask
    //     });
    // }
    // filterNextTask({
    //     execute_result
    // }) {
    //     const arr = [];
    //     for (const item of this.connectTask) {
    //         if (item.action === execute_result) {
    //             arr.push(item);
    //         }
    //     }
    //     return arr;
    // }


}
class factory {
    constructor() {
        this.taskList = [];
    }
    createTask(type) {
        let newTask = null;
        switch (type) {
            case 'action':
                newTask = new actionTask();
                break;
            case 'enter':
                newTask = new enterTask();
                break;
        }
        // const newTask = new `${type}Task`();
        this.taskList.push(newTask);
    }
    deleteTask(id) {
        this.taskList = this.taskList.filter(item => item.id != id);
    }
}

export default factory;
export {
    actionTask,
    enterTask,
    judgeTask,
    filterTask
};


//如何实现链接？
//step
// 1.发起者 触发mouseDown事件,得到发起者指针
// 2.接受者 触发mouseUp事件，得到target，actionName 
// function connect(){

// }