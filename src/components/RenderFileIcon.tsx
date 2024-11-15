import { extensionIconPaths } from "../constant";
import IconImg from "./IconImg";

interface IProps {
  filename: string;
  isFolder?: boolean;
  isOpen?: boolean;
}



const RenderFileIcon = ({ filename, isFolder, isOpen }: IProps) => {
  const extension = filename.split(".").pop();

  if (
    extension &&
    Object.prototype.hasOwnProperty.call(extensionIconPaths, extension)
  ) {
    const iconPath = isFolder
      ? isOpen
        ? `${extensionIconPaths[extension]}-open.svg`
        : `${extensionIconPaths[extension]}.svg`
      : `${extensionIconPaths[extension]}.svg`;

      return <IconImg src={iconPath} />
  }

  if (isFolder && isOpen) <IconImg src={`/icons/folder-default-open.svg`} />;
  if (isFolder && !isOpen) <IconImg src={`/icons/folder-default.svg`} />;

  return <IconImg src={`/icons/${extension}.svg`} />;
};

export default RenderFileIcon;
