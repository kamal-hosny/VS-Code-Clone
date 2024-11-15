import { IFile } from "../interfaces";
import RenderFileIcon from "./RenderFileIcon";
import CloseIcon from "./SVG/CloseIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  setClickedFileAction,
  setOpenedFilesAction,
  setTabIdToRemoveAction,
} from "../app/features/fileTreeSlice";
import { RootState } from "../app/store";


interface IProps {
  file: IFile;
}

const OpenedFilesBarTab = ({ file }: IProps) => {
  const dispatch = useDispatch();

  const { openedFiles, clickedFile } = useSelector(
    (state: RootState) => state.fileTree
  );

  // ** Handlers
  const onClick = () => {
    dispatch(
      setClickedFileAction({
        filename: file.name,
        fileContect: file.content,
        activeTapId: file.id,
      })
    );
  };
  const onRemove = (id: string) => {
    const filtered = openedFiles.filter((file) => file.id !== id);
    const lastTab = filtered[filtered.length - 1];

    if (!lastTab) {
      dispatch(
        setClickedFileAction({
          activeTapId: null,
          fileContect: "",
          filename: "",
        })
      );
      dispatch(setOpenedFilesAction([]));

      return;
    }
    dispatch(setOpenedFilesAction(filtered));
    dispatch(
      setClickedFileAction({
        activeTapId: lastTab.id,
        fileContect: lastTab.content,
        filename: lastTab.name,
      })
    );
  };

  return (
    <div
      className={`max-w-screen-md flex items-center p-2 border-t-2 ${
        file.id === clickedFile.activeTapId
          ? "border-[#cf6ccf]"
          : "border-transparent"
      }`}
      onClick={onClick}
      onContextMenu={e => {
        e.preventDefault()
        dispatch(setTabIdToRemoveAction(file.id))
      }}
    >
      <RenderFileIcon filename={file.name} />
      <span className="cursor-pointer duration-300 flex justify-center items-center w-fit mx-2 p-1 rounded-md">
        {file.name}
      </span>
      <span
        className="cursor-pointer hover:bg-[#64646473] duration-300 flex justify-center items-center w-fit mr-2 p-1 rounded-md"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(file.id);
        }}
      >
        <CloseIcon />
      </span>
      
    </div>
  );
};

export default OpenedFilesBarTab;
