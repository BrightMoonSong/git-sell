// NodeField class

var NodeField = function (nodeText) {
    this.componets = [];

    this.node = document.createElement('li');
    this.node.className = 'node';
    this.node.appendChild(document.createTextNode(nodeText));

    this.element = document.createElement('ul');
    this.element.appendChild(this.node);

    this.LEFT_UNIT = '50px';

    this.click_handler = false;
    this.addEvents();
};

NodeField.prototype = {
    add: function (child) {
        this.componets.push(child);
        this.element.appendChild(child.getElement());
        child.getElement().style.marginLeft = this.LEFT_UNIT;
        console.log('-- add a node: ' + this.node.innerHTML);
    },
    remove: function (child) {

    },
    getChild: function (i) {
        return this.componets[i];
    },
    getElement: function () {
        return this.element;
    },
    show: function () {
        this.element.style.display = 'block';
        // showComponets();
    },
    showComponets: function () {
        for (var i = 0, len = this.componets.length; i < len; i++) {
            this.componets[i].show();
        }
    },
    hide: function () {
        this.element.style.display = 'none';
        // hideComponets();
    },
    hideComponets: function () {
        for (var i = 0, len = this.componets.length; i < len; i++) {
            this.componets[i].hide();
        }
    },
    addEvents: function () {
        var that = this;
        this.node.onclick = function () {
            if (that.click_handler) {
                that.showComponets();
                that.click_handler = false;
            } else {
                that.hideComponets();
                that.click_handler = true;
            };
        };
    }
};


// LeafField class

var LeafField = function (leafText) {
    this.element = document.createElement('div');
    this.element.className = 'leaf';
    this.element.appendChild(document.createTextNode(leafText));
};

LeafField.prototype = {
    add: function (child) { },
    remove: function (child) { },
    getChild: function (i) { },
    getElement:function(){
        return this.element;
    },
    show: function () {
        this.element.style.display = 'block';
    },
    showComponets: function () { },
    hide: function () {
        this.element.style.display = 'none';
    },
    hideComponets: function () { }
};


var Manager = {
    createTree: function (container) {
        var treeJSON = {
            "node1": {
                "node1": {
                    "leaf1": "叶",
                    "leaf2": "叶"
                },
                "node2": {
                    "leaf1": "叶",
                    "node2": {
                        "leaf1": "叶",
                        "leaf2": "叶"
                    }
                }
            },
            "node2": {
                "leaf1": "叶",
                "node2": {
                    "leaf1": "叶",
                    "leaf2": "叶",
                    "leaf3": "叶"
                }
            },
            "leaf3": "叶",
            "leaf4": "叶",
            "leaf5": "叶",
            "leaf6": "叶"
        };

        var node = new NodeField('Tree');
        Manager.getNode(node, treeJSON);
        container.appendChild(node.getElement());

    },
    getNode: function (node, json) {
        for (property in json) {
            if (typeof json[property] === 'object') {
                var child = new NodeField(property);
                node.add(child);
                Manager.getNode(child, json[property]);
                console.log('--- ' + property);
            } else {
                var child = new LeafField(property);
                node.add(child);
            }
        }
    }
};


window.onload = function () {
    Manager.createTree(document.getElementById('test-frame'));
};