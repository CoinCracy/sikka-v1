import React, { useState } from 'react';
import  "../CSS/TabControls.scss"

const TabControls = ({
    menuItems,
    selectedItem,
    onMenuItemClick,
}) => {
    const tabContainerRef = React.useRef();
    const [fixHeader, setHeaderFixed] = useState(0);

    return (
        <div className="container containerClassName" >
            <div
                ref={tabContainerRef}
                className={`wrapper subContainerClassName `}
            >
                {
                    menuItems.map(item => {
                        const isSelected = selectedItem.key === item.key;
                        const handleMenuItemClick = () => {
                            onMenuItemClick(item);
                            if (!isSelected) setHeaderFixed(false);
                        };
                        return (
                            <div
                                className={`menuItem ${isSelected ? "selectedItem" : ""}`}
                                onClick={handleMenuItemClick}
                                key={item.label}
                            >
                                {item.label || item}
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default TabControls;
