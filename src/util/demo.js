import {
    Graph,
    Shape
} from '@antv/x6';


import NodeEnvironment from './factory';

const LINE_HEIGHT = 24;
const NODE_WIDTH = 150;

const center = new NodeEnvironment(localStorage.getItem('center') ? JSON.parse(localStorage.getItem('center')) : []);

export default () => {
    //初始化数据
    const arr = localStorage.getItem('nodes') ? JSON.parse(localStorage.getItem('nodes')) : [],
        connect = localStorage.getItem('edges') ? JSON.parse(localStorage.getItem('edges')) : [];
    //挂载port的回调
    Graph.registerPortLayout(
        'erPortPosition',
        (portsPositionArgs) => {
            return portsPositionArgs.map((_, index) => {
                return {
                    position: {
                        x: 0,
                        y: (index + 1) * LINE_HEIGHT,
                    },
                    angle: 0,
                };
            });
        },
        true,
    );
    //挂载node的回调
    Graph.registerNode(
        'er-rect', {
            inherit: 'rect',
            markup: [{
                    tagName: 'rect',
                    selector: 'body',
                },
                {
                    tagName: 'text',
                    selector: 'label',
                },
            ],
            attrs: {
                rect: {
                    strokeWidth: 1,
                    stroke: '#5F95FF',
                    fill: '#5F95FF',
                },
                label: {
                    fontWeight: 'bold',
                    fill: '#ffffff',
                    fontSize: 16,
                },
            },
            ports: {
                groups: {
                    event: {
                        markup: [{
                                tagName: 'rect',
                                selector: 'portBody',
                            },
                            {
                                tagName: 'text',
                                selector: 'portNameLabel',
                            },
                            // {
                            //     tagName: 'text',
                            //     selector: 'portTypeLabel',
                            // },
                        ],
                        attrs: {
                            portBody: {
                                width: NODE_WIDTH / 2,
                                height: LINE_HEIGHT,
                                strokeWidth: 1,
                                stroke: '#5F95FF',
                                fill: '#EFF4FF',
                                magnet: true,
                                refX: NODE_WIDTH / 2,
                            },
                            portNameLabel: {
                                ref: 'portBody',
                                refX: 6,
                                refY: 6,
                                fontSize: 10,
                            },
                            // portTypeLabel: {
                            //     ref: 'portBody',
                            //     refX: 50,
                            //     refY: 0,
                            //     fontSize: 7,
                            // },
                        },
                        position: 'erPortPosition',
                    },
                    action: {
                        markup: [{
                                tagName: 'rect',
                                selector: 'portBody',
                            },
                            {
                                tagName: 'text',
                                selector: 'portNameLabel',
                            },
                            // {
                            //     tagName: 'text',
                            //     selector: 'portTypeLabel',
                            // },
                        ],
                        attrs: {
                            portBody: {
                                width: NODE_WIDTH / 2,
                                height: LINE_HEIGHT,
                                strokeWidth: 1,
                                stroke: '#5F95FF',
                                fill: '#EFF4FF',
                                magnet: 'passive',
                                refX: 0,
                            },
                            portNameLabel: {
                                ref: 'portBody',
                                refX: 6,
                                refY: 6,
                                fontSize: 10,
                            },
                            // portTypeLabel: {
                            //     ref: 'portBody',
                            //     refX: 50,
                            //     refY: 0,
                            //     fontSize: 7,
                            // },
                        },
                        position: 'erPortPosition',
                    },
                },
            },
        },
        true,
    );
    //配置画布
    const graph = new Graph({
        container: document.getElementById('container'),
        connecting: {
            snap: true,
            allowBlank: false,
            allowLoop: false,
            highlight: true,
            connector: 'rounded',
            // connectionPoint: 'boundary',

            router: {
                name: 'manhattan',
                args: {
                    startDirections: ['right'],
                    endDirections: ['left'],
                },
            },
            //创建边的工具
            createEdge() {
                return new Shape.Edge({
                    attrs: {
                        line: {
                            stroke: '#A2B1C3',
                            strokeWidth: 2,
                        },
                    },
                });
            },
            //创建链接线前的验证
            validateConnection({
                targetMagnet,
            }) {
                if (!targetMagnet) {
                    return false;
                }
                if (targetMagnet.parentNode.getAttribute('port-group') !== 'action') {
                    return false;
                }
                return true;
            },
            //创建链接线时的验证
            validateEdge({
                edge
            }) {
                const {
                    source,
                    target,
                } = edge.store.data;
                console.log(edge);
                const sourceNode = center.findNode(source.cell),
                    targetNode = center.findNode(target.cell);
                sourceNode.addTargetAction({
                    id: targetNode.id,
                    actionName: target.port,
                    eventName: source.port
                });
                return true;
            }


        },

    });
    //连接线动作 start
    graph.on('edge:mouseenter', ({
        edge
    }) => {
        edge.addTools([
            'source-arrowhead',
            'target-arrowhead',
            {
                name: 'button-remove',
                args: {
                    distance: 50,
                    onClick({
                        cell
                    }) {
                        const {
                            id,
                            store: {
                                data: {
                                    source,
                                    target
                                }

                            }
                        } = cell;

                        //删除模型连线
                        const curNode = center.findNode(source.cell);
                        curNode.deleteTargetAction({
                            id: target.cell,
                            actionName: target.port
                        });
                        //删除视图连线
                        const newEdge = graph.getEdges().filter(item => {
                            if (item.id != id) return true;
                        });
                        graph.resetCells([...graph.getNodes(), ...newEdge]);

                        return;
                    },
                },
            },
        ]);
    });

    graph.on('edge:mouseleave', ({
        edge
    }) => {
        edge.removeTools();
    });
    //连接线动作 end


    //点动作 start
    // 鼠标 Hover 时添加删除按钮
    graph.on('node:mouseenter', ({
        node
    }) => {
        node.addTools({
            name: 'button-remove',
            args: {
                x: 0,
                y: 0,
                offset: {
                    x: 10,
                    y: 10
                },
                onClick({
                    cell
                }) {
                    const {
                        id
                    } = cell;

                    //删除模型节点以及连线
                    center.deleteNode(id);
                    //删除视图节点以及连线
                    graph.removeCell(cell);
                    return;
                },

            },
        });

    });

    graph.on('node:mouseenter', ({
        node
    }) => {
        node.addTools({
            name: 'button',
            args: {
                x: '100%',
                y: '0%',
                offset: {
                    x: -18,
                    y: 18
                },
                markup: [{
                        tagName: 'circle',
                        selector: 'button',
                        attrs: {
                            r: 14,
                            stroke: '#fe854f',
                            strokeWidth: 2,
                            fill: 'white',
                            cursor: 'pointer',
                        },
                    },
                    {
                        tagName: 'text',
                        textContent: 'Btn',
                        selector: 'icon',
                        attrs: {
                            fill: '#fe854f',
                            fontSize: 10,
                            textAnchor: 'middle',
                            pointerEvents: 'none',
                            y: '0.3em',
                        },
                    },
                ],
                onClick({
                    cell
                }) {
                    //设置激活样式
                    cell.attr({
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
                        cell.attr({
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
                        //触发模型
                        let curNode = center.findNode(cell.id);
                        curNode.execute({
                            data: 1,
                            actionName: '单击'
                        });
                    }, 1000);

                },

            },
        });

    });
    // 鼠标移开时删除删除按钮
    graph.on('node:mouseleave', ({
        node
    }) => {
        node.removeTools();
    });
    //点动作 end


    //根据数据初始化时渲染 start
    const cells = [];
    arr.forEach((item) => {
        cells.push(graph.createNode(item));
    });
    connect.forEach((item) => {
        cells.push(graph.createEdge(item));
    });
    graph.resetCells(cells);
    graph.zoomToFit({
        padding: 10,
        maxScale: 1
    });
    //根据数据初始化时渲染 end

    //临时事件监听 start
    document.onkeydown = function (event) {
        if (event.ctrlKey && event.keyCode == 83) {
            console.log("按下了CTRL+S");
            localStorage.setItem('nodes', JSON.stringify(graph.getNodes()));
            localStorage.setItem('edges', JSON.stringify(graph.getEdges()));
            localStorage.setItem('center', JSON.stringify(center.nodeList));
            event.preventDefault();
        }
        if (event.ctrlKey & event.keyCode == 67) {
            console.log('新建 ctrl+c');
            const type = prompt("请输入类型"); //在页面上弹出提示对话框，将用户输入的结果赋给变量name
            console.log(type);
            //后台新建
            const newNode = center.createNode(type);
            //视图新建
            graph.resetCells([...graph.getNodes(), ...graph.getEdges(), graph.createNode(newNode.viewData)]);
            event.preventDefault();

        }
        if (event.ctrlKey & event.keyCode == 68) {
            console.log('清空 ctrl+d');
            localStorage.setItem('nodes', '');
            localStorage.setItem('edges', '');
            localStorage.setItem('center', '');
            event.preventDefault();

        }
        // event.preventDefault();
    };
    //临时事件监听 end
    window._graph = graph;
    return graph;
};
export {
    center
};