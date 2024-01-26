import { useCallback, useEffect } from "react";

export const DialogUtils = (props = {}) => {
    const { callback } = props;
    const useOutsideDetection = useCallback((ref) => {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target) && event.target.tagName.toLowerCase() !== "a") {
                    callback();
                }
            }

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    });

    return {
        useOutsideDetection
    }
}
