import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {
  Box,
  Divider,
  Card,
  Avatar,
  CardHeader,
  IconButton,
  Autocomplete,
  Checkbox,
  Stack,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import * as api from "../../utils/idieasApi";
import { useQuery } from "@tanstack/react-query";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function DialogSlide() {
  const { data: categoriesOptionsData, isFetching: isFetchingCategory } =
    useQuery(["categories"], () => api.getAllCategory());

  const [open, setOpen] = React.useState(false);

  const [contentInput, setContentInput] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [inputPublic, setInputPublic] = React.useState(options[0]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    console.log(contentInput);
    categories.forEach((category) => {
      console.log("category: " + category.categoryName);
    });
    console.log(inputPublic);
  };

  return (
    <div>
      <Button
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50% - 25px)", md: 30 },
        }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        CREATE NEW POST
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <Box sx={{ textAlign: "center", fontWeight: "semi-bold" }}>
            Create post
          </Box>
        </DialogTitle>
        <Divider variant="fullWidth" />
        <Card
          sx={{
            marginX: "24px",
            minWidth: "500px",
            boxShadow: "0",
            bgcolor: "transparent",
          }}
        >
          <CardHeader
            sx={{ bgcolor: "transparent" }}
            avatar={
              <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                R
              </Avatar>
            }
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
          />
        </Card>

        <DialogContent sx={{ paddingY: "0" }}>
          <TextField
            multiline
            fullWidth
            rows={8}
            value={contentInput}
            onChange={(e) => {
              setContentInput(e.target.value);
            }}
          />

          <Stack spacing={2}>
            <Autocomplete
              value={categories}
              onChange={(event, newValue) => {
                setCategories([...newValue]);
              }}
              flex={3}
              size="small"
              sx={{ marginTop: "20px" }}
              multiple
              id="checkboxes-tags-demo"
              options={
                isFetchingCategory ? categoriesOptions : categoriesOptionsData
              }
              disableCloseOnSelect
              getOptionLabel={(option) => option.categoryName}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.categoryName}
                </li>
              )}
              style={{ width: 500 }}
              renderInput={(params) => (
                <TextField {...params} label="Category" />
              )}
            />

            <Stack direction="row" spacing={4}>
              <Autocomplete
                flex={3}
                value={inputPublic}
                size="small"
                onChange={(event, newValue) => {
                  setInputPublic(newValue);
                }}
                inputValue={inputPublic}
                onInputChange={(event, newInputValue) => {
                  setInputPublic(newInputValue);
                }}
                options={options}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} />}
              />
              <Button
                flex={1}
                variant="outlined"
                color="primary"
                aria-label="upload picture"
                component="label"
                startIcon={<FileUploadIcon />}
              >
                Document
                <input hidden accept="image/*" type="file" />
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Next</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const options = ["Public", "Anonymouse"];
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const categoriesOptions = [
  {
    id: null,
    categoryName: null,
    description: null,
    active: null,
  },
];
