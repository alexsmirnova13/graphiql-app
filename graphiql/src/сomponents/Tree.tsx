import TreeView, { flattenTree } from 'react-accessible-treeview';
import getFields from './../utils/graphiApi';
const folder = await getFields();

const data = flattenTree(folder);
const Tree = () => {
  return (
    <TreeView
      data={data}
      className="basic"
      aria-label="basic example tree"
      nodeRenderer={({ element, getNodeProps, level, handleSelect }) => (
        <div {...getNodeProps()} style={{ paddingLeft: 20 * (level - 1) }}>
          {element.name}
        </div>
      )}
    />
  );
};

export default Tree;
