import useContextMenu from "./useContextMenu";

const Menu = (props) => {
    const { anchorPoint, show } = useContextMenu();
    const { removeItem } = props
    if (show) {
        return (
            
            <ul className="menu" style={{ top: anchorPoint.y, left: anchorPoint.x }}>
               
                <li onClick={() => { removeItem() }}>Delete</li>

            </ul>
            // <ul className="menu" style={{ top: anchorPoint.y, left: anchorPoint.x }}>
            //     <li>Share to..</li>
            //     <li onClick={() => { removeItem() }}>Cut</li>
            //     <li>Copy</li>
            //     <li>Paste</li>
            //     <hr />
            //     <li>Refresh</li>
            //     <li>Exit</li>
            // </ul>
        );
    }
    return <></>;
};

export default Menu;