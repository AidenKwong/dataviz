export class Node {
  constructor(itm) {
    this.name = itm.name;
    this.value = itm.value;
    this.children = [];
  }
}

export class Tree {
  constructor() {
    this.root = [];
  }

  insert(itm) {
    var newNode = new Node(itm);

    if (this.root === null) this.root = newNode;
    else this.insertNode(this.root, newNode);
  }

  insertNode(node, newNode) {
    if (newNode.name !== node.name) {
      node.children[node.name] = newNode;
    }
  }
}
