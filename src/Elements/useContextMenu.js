import { useEffect, useCallback, useState } from "react";

//returns "anchorPoint" and "show"
const useContextMenu = () => {
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);

  //use callback used when passing a function down through multiple components? used for performance?
  const handleContextMenu = useCallback(
    (event) => {
      event.preventDefault();
      setAnchorPoint({ x: event.pageX, y: event.pageY }); 
      setShow(true);
      // document.getElementById().addEventListener( )
    },
    [setShow, setAnchorPoint]
  );

  const handleClick = useCallback(() => (show ? setShow(false) : null), [show]);

  useEffect((event) => {
    document.addEventListener("click", handleClick);

    document.addEventListener("contextmenu", handleContextMenu);
    //run before component is removed from ui
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  });
  return { anchorPoint, show };
};

export default useContextMenu;