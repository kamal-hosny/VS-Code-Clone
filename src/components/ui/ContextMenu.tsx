import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpenedFilesAction } from "../../app/features/fileTreeSlice";
import { RootState } from "../../app/store";

interface IProps {
  setShowMenu: (val: boolean) => void;
  positions: {
    x: number;
    y: number;
  };
}

export const ContextMenu = ({ positions, setShowMenu }: IProps) => {
  const dispatch = useDispatch();
  const menuRef = useRef<HTMLDivElement>(null);


  const { openedFiles, tabIdToRemove } = useSelector(
    (state: RootState) => state.fileTree
  );

  //handlers

  const onClose = () => {
    const filtered = openedFiles.filter(file => file.id !== tabIdToRemove)
    dispatch(setOpenedFilesAction(filtered))
    setShowMenu(false);
};

  const onCloseAll = () => {
    dispatch(setOpenedFilesAction([]))
    setShowMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [setShowMenu]);

  return (
    <div ref={menuRef}>
      <ul
        className="z-10 w-32 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-2"
        style={{
          position: "absolute",
          left: positions.x,
          top: positions.y,
        }}
      >
        <li onClick={onClose}    className="text-gray-400 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-700 duration-300 rounded-sm">Close </li>
        <li onClick={onCloseAll}    className="text-gray-400 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-700 duration-300 rounded-sm">Close all</li>
      </ul>
    </div>
  );
};
