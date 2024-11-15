import { useState } from "react";
import { IFile } from "../interfaces";
import RightArrowIcon from "./SVG/Right";
import BottomArrowIcon from "./SVG/Bottom";
import RenderFileIcon from "./RenderFileIcon";
import { useDispatch, useSelector } from "react-redux";
import {  setClickedFileAction, setOpenedFilesAction } from "../app/features/fileTreeSlice";
import { RootState } from "../app/store";
import { doesFileObjectExist } from "../utils/functions";

interface IProps {
  fileTree: IFile;
}

const RecursiveComponent = ({ fileTree }: IProps) => {
  const {id ,name , content , isFolder, children} = fileTree;
  const dispatch = useDispatch()
  const { openedFiles } = useSelector((state: RootState) => state.fileTree)
  const [isOpen, setIsOpen] = useState<boolean>(true)

  // ** Handlers
  const toggle = () => setIsOpen(perv => !perv)
  const onFileClicked = () => {
    const exists = doesFileObjectExist(openedFiles, id )
    dispatch(setClickedFileAction({
      filename: name,
      fileContect: content,
      activeTapId: id
    }))
    if(!exists){
      return (
        dispatch(setOpenedFilesAction([...openedFiles, fileTree]))
      )
    }
  }

  return (

      <div className="mb-2 ml-2 cursor-pointer w-fit">
        <div className={`flex items-center mb-1.5`}>
          {
            isFolder ? (
            <div onClick={toggle} className={`flex items-center`}>
            <span className="mr-2">{isOpen ? <BottomArrowIcon /> : <RightArrowIcon />}</span>
            {/* <FolderIcon /> */}
            <RenderFileIcon filename={name} isFolder={true} isOpen={isOpen} />
            <span className="ml-2">{name}</span>
            </div>
            ) : (
              <div className="flex items-center mr-2" onClick={onFileClicked}>
            <RenderFileIcon filename={name} />
              <span className="ml-2">{name}</span>
            </div>
            )
          }

        </div>

        {isOpen && children &&
          children.map((file, idx) => (
            <RecursiveComponent fileTree={file} key={idx}  />
          ))}
      </div>

  );
};

export default RecursiveComponent;
