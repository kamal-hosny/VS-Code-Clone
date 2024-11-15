import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import FileSyntaxHighlighter from "./FileSyntaxHighlighter"
import OpenFileBar from "./OpenFileBar";

const Preview = () => {
    const { clickedFile } = useSelector((state: RootState) => state.fileTree);
  
  return (
    <>
      <OpenFileBar />
      <FileSyntaxHighlighter content={clickedFile.fileContect} />
    </>
  )
}

export default Preview