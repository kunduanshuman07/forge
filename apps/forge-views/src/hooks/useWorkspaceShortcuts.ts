import { useEffect } from "react";

export function useWorkspaceShortcuts(
    onSave: () => void
) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const isSave =
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "s";

            if (isSave) {
                event.preventDefault();

                onSave();
            }
        };

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [onSave]);
}