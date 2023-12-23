import React, { useState } from "react";
import { TreeTable } from "primereact/treetable";
import { Column, ColumnEditorOptions } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { CustomNodeData, CustomTreeNode, FileType, NodeService } from "./api/service";
import _ from "lodash";

export default function EditDemo() {
  const [nodes, setNodes] = useState<CustomTreeNode[]>(() => NodeService.getTreeNodes());

  const onEditorValueChange = (options: ColumnEditorOptions, value: unknown) => {
    let newNodes = JSON.parse(JSON.stringify(nodes));
    let editedNode = NodeService.findNode(newNodes, options.node.key);

    if (editedNode.data) {
      switch (options.field as keyof CustomNodeData) {
        case "size":
          editedNode.data.size = _.toNumber(value);
          break;
        case "type":
          editedNode.data.type = value as FileType;
          break;
      }
    }

    setNodes(newNodes);
  };

  const inputTextEditor = (options: ColumnEditorOptions) => {
    return (
      <InputText
        type="text"
        value={options.rowData[options.field]}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onEditorValueChange(options, e.target.value)
        }
      />
    );
  };

  return (
    <div className="card">
      <TreeTable value={nodes} tableStyle={{ minWidth: "50rem" }}>
        <Column field="name" header="Name" expander style={{ height: "3.5rem" }}></Column>
        <Column
          field="size"
          header="Size"
          editor={inputTextEditor}
          style={{ height: "3.5rem" }}
        ></Column>
        <Column
          field="type"
          header="Type"
          editor={inputTextEditor}
          style={{ height: "3.5rem" }}
        ></Column>
      </TreeTable>
    </div>
  );
}
