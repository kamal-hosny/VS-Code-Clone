import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFile } from "../../interfaces";

interface IClickedFile {
    activeTapId: string | null;
  filename: string;
  fileContect: string | undefined;
}

interface IInitialState {
  openedFiles: IFile[];
  clickedFile: IClickedFile;
  tabIdToRemove: string | null
}

const initialState: IInitialState = {
  openedFiles: [],
  clickedFile: {
    activeTapId: null,
    filename: "",
    fileContect: "",
  },
  tabIdToRemove: null
};

export const fileTreeSlice = createSlice({
  name: "fileTree",
  initialState,
  reducers: {
    setOpenedFilesAction: (state, action: PayloadAction<IFile[]>) => {
      state.openedFiles = action.payload;
    },
    setClickedFileAction: (state, action: PayloadAction<IClickedFile>) => {
      state.clickedFile = action.payload;
    },
    setTabIdToRemoveAction: (state, action: PayloadAction<string | null>) => {
      state.tabIdToRemove = action.payload;
    }}
});

export const {
  setOpenedFilesAction,
  setClickedFileAction,
  setTabIdToRemoveAction
} = fileTreeSlice.actions;

export default fileTreeSlice.reducer;
