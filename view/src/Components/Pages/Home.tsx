import { useState } from "react";
import { Resizable, ResizableBox, ResizeCallbackData } from "react-resizable";
import "react-resizable/css/styles.css";

type TContainerKeys = "sidebar" | "main" | "footer";

const ResizableComponent: React.FC<{
  id: TContainerKeys;
  children: React.ReactNode;
  height: number;
  width: number;
  onResize: (id: TContainerKeys, data: ResizeCallbackData) => void;
  className?: string;
}> = (props) => {
  return (
    <ResizableBox
      height={props.height}
      width={props.width}
      onResize={(event, data) => {
        props.onResize(props.id, data);
      }}
      draggableOpts={{ enableUserSelectHack: false }}
      resizeHandles={["s", "n", "e", "w"]}
      className={`${props.className || ""} resize-container`}
    >
      {props.children}
    </ResizableBox>
  );
};

const Home = () => {
  const [heightWidthState, setHeightWidthState] = useState({
    sidebar: {
      height: 600,
      width: 200,
    },
    main: {
      height: 600,
      width: 500,
    },
    footer: {
      height: 200,
      width: 1000,
    },
  });

  const onResize = (id: TContainerKeys, data: ResizeCallbackData) => {
    console.log(data.size);

    setHeightWidthState((old) => {
      old[id] = data.size;

      return { ...old };
    });
  };

  return (
    <div id="home">
      <ResizableComponent
        {...heightWidthState["sidebar"]}
        className="sidebar"
        onResize={onResize}
        id={"sidebar"}
      >
        <p>Side bar</p>
      </ResizableComponent>

      <ResizableComponent
        {...heightWidthState["main"]}
        className="main"
        onResize={onResize}
        id={"main"}
      >
        <div className="children">Container 1</div>
        <div className="children">Container 2</div>
      </ResizableComponent>

      <ResizableComponent
        {...heightWidthState["footer"]}
        className="footer"
        onResize={onResize}
        id={"footer"}
      >
        <p>Footer</p>
      </ResizableComponent>
    </div>
  );
};

export default Home;
