import _ from "lodash";
import { TreeNode } from "primereact/treenode";

export const NodeService = {
  getTreeNodes(): CustomTreeNode[] {
    return [
      {
        key: "0",
        data: {
          name: "Apps",
          size: 100,
          type: "Folder",
        },
        children: [
          {
            key: "0-0",
            data: { name: "React", size: 50, type: "Folder" },
            children: [
              {
                key: "0-0-0",
                data: { name: "react.app", size: 25, type: "File" },
              },
              {
                key: "0-0-1",
                data: { name: "native.app", size: 20, type: "File" },
              },
              {
                key: "0-0-2",
                data: { name: "style.css", size: 5, type: "File" },
              },
            ],
          },
          {
            key: "0-1",
            data: { name: "editor.app", size: 25, type: "File" },
          },
          {
            key: "0-2",
            data: { name: "setting", size: 25, type: "File" },
          },
        ],
      },
      {
        key: "1",
        data: { name: "Desktop", size: 150, type: "Folder" },
        children: [
          {
            key: "1-0",
            data: { name: "notes-meeting", size: 100, type: "File" },
          },
          {
            key: "1-1",
            data: { name: "notes", size: 50, type: "File" },
          },
        ],
      },
    ];
  },

  findNode(nodes: CustomTreeNode[], key: string) {
    let path = key.split("-");
    let node: CustomTreeNode | undefined = undefined;

    while (path.length) {
      const list: CustomTreeNode[] = node !== undefined ? node.children ?? [] : nodes;

      node = list[_.toNumber(path[0])];
      path.shift();
    }

    if (node == null) {
      throw new Error();
    }

    return node;
  },
};

export type CustomTreeNode = {
  [Prop in keyof TreeNode]: Prop extends "data"
    ? CustomNodeData
    : Prop extends "children"
    ? CustomTreeNode[]
    : TreeNode[Prop];
};

export type CustomNodeData = {
  //   id: number;
  name: string;
  size: number;
  type: FileType;
};

export type FileType = "Folder" | "File";
