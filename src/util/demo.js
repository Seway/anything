import {
    Graph,
    Shape
} from '@antv/x6';

const LINE_HEIGHT = 24;
const NODE_WIDTH = 150;

export default (arr, connect) => {
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
                            {
                                tagName: 'text',
                                selector: 'portTypeLabel',
                            },
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
                            portTypeLabel: {
                                ref: 'portBody',
                                refX: 50,
                                refY: 0,
                                fontSize: 7,
                            },
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
                            {
                                tagName: 'text',
                                selector: 'portTypeLabel',
                            },
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
                            portTypeLabel: {
                                ref: 'portBody',
                                refX: 50,
                                refY: 0,
                                fontSize: 7,
                            },
                        },
                        position: 'erPortPosition',
                    },
                },
            },
        },
        true,
    );

    const graph = new Graph({
        container: document.getElementById('container'),
        connecting: {
            snap: true,
            allowBlank: false,
            allowLoop: false,
            highlight: true,
            connector: 'rounded',
            connectionPoint: 'boundary',

            router: {
                name: 'er',
                args: {
                    offset: 25,
                    direction: 'H',
                },
            },
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
            validateEdge({
                edge
            }) {
                const {
                    source,
                    target,
                    id,
                    shape,
                    zIndex
                } = edge.store.data;
                const newConnect = {
                    id: id,
                    shape: shape,
                    source: source,
                    target: target,
                    attrs: {
                        line: {
                            stroke: "#A2B1C3",
                            strokeWidth: 2,
                        },
                    },
                    zIndex: zIndex,
                };
                //存储链接信息
                connect.push(newConnect);
                console.log(JSON.stringify(connect));
                //触发model层链接
                return true;
            }
        },

    });

    setTimeout(() => {
        const cells = [];
        arr.forEach((item) => {
            cells.push(graph.createNode(item));
        });
        connect.forEach((item) => {
            console.log(item);
            cells.push(graph.createEdge(item));
        });
        graph.resetCells(cells);
        graph.zoomToFit({
            padding: 10,
            maxScale: 1
        });
    }, 0);
};