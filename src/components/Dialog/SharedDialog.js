import React, { PropsWithChildren, useState, useRef, useEffect } from "react";
import { shape, string, bool } from 'prop-types';
import { X as IconClose } from 'react-feather';
import Icon from '@magento/venia-ui/lib/components/Icon/index.js';
import "../../styles/dialog.scss";
import { DialogUtils } from "./DialogUtils";

const SharedDialog = (props) => {
    const {children, title = "Dialog Title", open, onCloseDialog} = props;
    const [isOpen, setIsOpen] = useState(open);
    const dialogRef = useRef(null);

    const closeDialog = () => {
        setIsOpen(false);
        onCloseDialog();
    };

    useEffect(() => {
        setIsOpen(open);
    },[open]);

    const { useOutsideDetection } = DialogUtils({callback: closeDialog});
    useOutsideDetection(dialogRef);

    return (
        <div dropdown-panel="true" className={`bn-dialog bn-dialog--confirm ${isOpen ? "show" : ""}`}>
            <div ref={dialogRef} className="bn-dialog-container">
                <div dropdown-panel-container="">
                    <div className="bn-dialog__header">
                        <div className="bn-dialog__title">{title}</div>
                        <button className="close-btn svg-close btn-transparent" aria-label="Close">
                            <Icon
                                className="svg-icon-close"
                                src={IconClose}
                                size={30}
                                onClick={() => closeDialog()}
                            />
                        </button>
                    </div>
                    <div className="bn-dialog__body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

SharedDialog.propTypes = {
    classes: shape({
        children: HTMLElement,
        title: string,
        open: bool,
        onCloseDialog: bool
    })
};

export default SharedDialog;