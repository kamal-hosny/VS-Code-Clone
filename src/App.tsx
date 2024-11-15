import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import RecursiveComponent from "./components/RecursiveComponent";
import { fileTree } from "./data/fileTree";
import OpenFileBar from "./components/OpenFileBar";
import ResizablePanel from "./components/ResizablePanel";
import Preview from "./components/Preview";
import WelcomeTab from "./components/WelcomeTab";
import { ContextMenu } from "./components/ui/ContextMenu";

const App = () => {
  const { openedFiles } = useSelector(({ fileTree }: RootState) => fileTree);
  return (
    <div>
      <div className="flex h-screen">
        <ResizablePanel
          showLeftPanel
          leftPanel={
            <div className="w-64 p-2 ">
              <RecursiveComponent fileTree={fileTree} />

            </div>
          }
          rightPanel={openedFiles.length ? <Preview /> : <WelcomeTab />}
        />
      </div>
    </div>
  );
};

export default App;
