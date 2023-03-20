import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import "./FileDownload.css";
import DownloadIcon from "@mui/icons-material/Download";

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const getName = (s, n) => {
  return String(s).substring(0, Number(n));
};
const getType = (s) => {
  const indexDash = String(s).indexOf("-");
  const index = String(s).indexOf(".");
  return String(s).substring(index + 1, indexDash);
};

const FilesDisplay = ({ files }) => {
  return (
    <>
      <Box
        sx={{
          margin: "20px",
          display: "grid",
          borderTop: "0.5px dashed #CFCFCF",
        }}
        gridTemplateColumns={{
          xl: "repeat(8, 1fr)",
          lg: "repeat(6, 1fr)",
          md: "repeat(3, 1fr)",
          xs: "repeat(3, 1fr)",
        }}
      >
        {files.map((file) => (
          <Item
            key={file.id}
            sx={{
              margin: "5px 5px",
              display: "flex",
              position: "relative",
              border: "0.5px solid #CFCFCF",
              width: "100px",
              height: "70px",
              padding: "10px",
            }}
            className="download-file-box"
          >
            <Box
              sx={{
                height: "25px",
                background: "#1E90FF",
                color: "white",
                textAlign: "center",
                justifyContent: "center",
                display: "flex",
                padding: "2px 5px",
                borderRadius: "3px",
                textTransform: "uppercase",
              }}
            >
              <Typography>{getType(file.key)}</Typography>
            </Box>

            <Box
              sx={{
                position: "absolute",
                border: "0.5px solid #CFCFCF",
                width: "100px",
                height: "103%",
                bottom: "-1px",
                right: "-1px",
                background: "#F5F5F5",
                padding: "2px 5px",
                zIndex: "1",
              }}
              hover
              display={"none"}
              className="download-file"
            >
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  marginTop: "5px",
                  color: "#363636",
                }}
              >
                {getName(file.key, 8)}
              </Typography>
              <Button href={file.url}>
                <DownloadIcon sx={{ color: "primary" }} />
              </Button>
            </Box>

            <Box
              sx={{
                position: "absolute",
                border: "0.5px solid #CFCFCF",
                width: "100px",
                height: "24px",
                bottom: "-1px",
                right: "-1px",
                background: "#F5F5F5",
                fontSize: "12px",
                fontWeight: "bold",
                padding: "2px 0 2px 10px",
                textAlign: "left",
                color: "#363636",
              }}
            >
              {getName(file.key, 10)}
            </Box>
            <Box
              sx={{
                width: "15px",
                height: "15px",
                position: "absolute",
                bottom: "-1px",
                right: "-1px",
                background: "rgb(83, 134, 207)",
                zIndex: "2",
              }}
            ></Box>
            <Box
              sx={{
                width: "0px",
                height: "0px",
                borderBottom: "15px solid white",
                borderLeft: "15px solid transparent ",
                position: "absolute",
                bottom: "-1px",
                right: "-1px",
                zIndex: "2",
              }}
            ></Box>
            <Box
              sx={{
                width: "0px",
                height: "0px",
                borderBottom: "15px solid #CFCFCF",
                borderLeft: "15px solid transparent ",
                position: "absolute",
                bottom: "-1px",
                right: "14px",
                zIndex: "2",
              }}
            ></Box>
          </Item>
        ))}
      </Box>
    </>
  );
};

export default FilesDisplay;
