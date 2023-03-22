import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import {
  Box,
  Divider,
  Autocomplete,
  Checkbox,
  Stack,
  CircularProgress,
  Typography,
} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import * as api from "../../utils/idieasApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateAxiosNoDispatch } from "../../createInstance";
import { useSelector } from "react-redux";
import PermMediaIcon from "@mui/icons-material/PermMedia";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function DialogSlide() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const axiosJWT = CreateAxiosNoDispatch(user);
  const accessToken = user?.accessToken;
  const queryClient = useQueryClient();

  const [open, setOpen] = React.useState(false);
  const [openTerms, setOpenTerms] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenTerms(false);
  };

  const handleNext = () => {
    setOpenTerms(true);
  };

  const handlePrev = () => {
    setOpenTerms(false);
  };

  const { data: categoriesOptionsData, isFetching: isFetchingCategory } =
    useQuery(["categories"], () => api.getAllCategory());
  const [categories, setCategories] = React.useState([]);
  const [contentInput, setContentInput] = React.useState("");
  const [inputPublic, setInputPublic] = React.useState(options[0]);

  const [selectedFile, setSelectedFile] = React.useState();
  const [isFilePicked, setIsFilePicked] = React.useState(false);
  const inputFileHandle = (event) => {
    setSelectedFile(event.target.files);
    setIsFilePicked(true);
  };
  const { mutate, isLoading: creatingIdiea } = useMutation(
    ({ content, anonymous, idCategory, files }) =>
      api.createIdiea(
        axiosJWT,
        accessToken,
        content,
        anonymous,
        idCategory,
        files
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["idieas"]);
        setOpen(false);
        setContentInput("");
        setCategories([]);
        setInputPublic(options[0]);
        setSelectedFile([]);
        setOpenTerms(false);
        setAgree(false);
      },
    }
  );

  const [agree, setAgree] = useState(false);

  const handleSubmit = async () => {
    var idCategories = [];
    await categories.forEach((category) => {
      idCategories.push(category.id);
    });

    var anonymous = false;
    if (inputPublic === "Anonymouse") {
      anonymous = true;
    }

    await mutate({
      content: contentInput,
      anonymous: String(anonymous),
      idCategory: idCategories,
      files: selectedFile,
    });
  };

  return (
    <div>
      <Button
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50% - 88px)", md: 30 },
          fontWeight: "bold",
        }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        CREATE NEW IDIEA
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
                component="label"
                startIcon={<FileUploadIcon />}
              >
                Document
                <input hidden multiple type="file" onChange={inputFileHandle} />
              </Button>
              {isFilePicked ? (
                <Box>
                  <PermMediaIcon />
                </Box>
              ) : (
                <></>
              )}
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions
          sx={{
            width: "100%",
            display: "flex",
          }}
        >
          <Button sx={{ flex: 1 }} onClick={handleClose}>
            CLOSE
          </Button>
          <Button sx={{ flex: 1 }} onClick={handleNext}>
            NEXT
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openTerms}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <Box sx={{ textAlign: "center", fontWeight: "semi-bold" }}>
            Term and conditions
          </Box>
        </DialogTitle>
        <Box sx={{ padding: "10px" }}>
          <DialogContent>
            <Typography
              sx={{ padding: "10px", maxWidth: "500px", height: "300px" }}
            >
              An Intellectual Property clause will inform users that the
              contents, logo and other visual media you created is your property
              and is protected by copyright laws. A Termination clause will
              inform users that any accounts on your website and mobile app, or
              users' access to your website and app, can be terminated in case
              of abuses or at your sole discretion. A Governing Law clause will
              inform users which laws govern the agreement. These laws should
              come from the country in which your company is headquartered or
              the country from which you operate your website and mobile app. A
              Links to Other Websites clause will inform users that you are not
              responsible for any third party websites that you link to. This
              kind of clause will generally inform users that they are
              responsible for reading and agreeing (or disagreeing) with the
              Terms and Conditions or Privacy Policies of these third parties.
              If your website or mobile app allows users to create content and
              make that content public to other users, a Content clause will
              inform users that they own the rights to the content they have
              created. This clause usually mentions that users must give you
              (the website or mobile app developer/owner) a license so that you
              can share this content on your website/mobile app and to make it
              available to other users. Because the content created by users is
              public to other users, a DMCA notice clause (or Copyright
              Infringement ) section is helpful to inform users and copyright
              authors that, if any content is found to be a copyright
              infringement, you will respond to any DMCA takedown notices
              received and you will take down the content. A Limit What Users
              Can Do clause can inform users that by agreeing to use your
              service, they're also agreeing to not do certain things. This can
              be part of a very long and thorough list in your Terms and
              Conditions agreement so as to encompass the most amount of
              negative uses.
            </Typography>
          </DialogContent>

          <FormGroup
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "flex-end",
              padding: "20px",
            }}
          >
            <FormControlLabel
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              control={<Checkbox defaultChecked />}
              label="Agree with terms and conditions"
            />
          </FormGroup>
          <DialogActions
            sx={{
              width: "100%",
              display: "flex",
            }}
          >
            <Button sx={{ flex: 1 }} onClick={handlePrev}>
              PREV
            </Button>
            {agree == true ? (
              <Button sx={{ flex: 1 }} onClick={handleSubmit}>
                SUBMIT
              </Button>
            ) : (
              <Button disabled sx={{ flex: 1 }} onClick={handleSubmit}>
                SUBMIT
              </Button>
            )}
          </DialogActions>
          {creatingIdiea ? (
            <CircularProgress
              sx={{
                position: "fixed",
                top: "50%",
                right: "50%",
                translate: "20px -40px",
                zIndex: "200",
              }}
            />
          ) : (
            <></>
          )}
        </Box>
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
