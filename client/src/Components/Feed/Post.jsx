import { MoreVert } from "@mui/icons-material";
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import ThumbDownAltRoundedIcon from '@mui/icons-material/ThumbDownAltRounded';
import SmsRoundedIcon from '@mui/icons-material/SmsRounded';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
const Post = () => {
  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            U
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title="User Name"
        subheader="September 14, 2023"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        If you’re interested in clothing and sales, you might consider starting an online reseller business. Although it takes time, dedication and an eye for fashion, you can start your business as a side hustle and turn it into a full-time resale business. You could start by using online store websites like Poshmark and Mercari to sell your unwanted clothing and items, then expand to your own resale website.

        Consider shopping estate sales and flea markets for hidden finds at a low cost and then listing them for a profit online. You may be able to collect a substantial inventory of items that are in good shape for very little overhead if you’re diligent enough and search the right places.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to like">
          <Checkbox padding="none"
            icon={<ThumbUpRoundedIcon />}
            checkedIcon={<ThumbUpRoundedIcon sx={{ color: "red" }} />}
          />
        </IconButton>
        <IconButton aria-label="add to unlike">
          <Checkbox
            icon={<ThumbDownAltRoundedIcon />}
            checkedIcon={<ThumbDownAltRoundedIcon sx={{ color: "red" }} />}
          />
        </IconButton>
        <IconButton aria-label="share">
          <SmsRoundedIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Post;
