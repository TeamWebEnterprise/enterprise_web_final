import { format } from "date-fns";

const formatDate = (time) => {
  if (!time) {
    return;
  }
  try {
    return format(new Date(time), "Pp");
  } catch (error) {
    console.error(error);
  }
  return time;
};

export default formatDate;
