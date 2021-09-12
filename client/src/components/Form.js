import { Button, makeStyles, TextField } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
require("dotenv").config();

const REACT_APP_API_SERVER_URL =
  process.env.REACT_APP_API_SERVER_URL || "http://localhost:5000";

const useStyles = makeStyles((theme) => ({
  blueButton: {
    color: "white",
    backgroundColor: "#3880ff",
    marginLeft: theme.spacing(2),
    height: "55px",
    "&:hover": {
      background: "grey",
    },
    fontSize: "15px",
    textTransform: "none",
  },
  spacing: {
    marginBottom: theme.spacing(3),
  },
  message: {
    fontWeight: "bold",
    fontSize: "20px",
    margin: theme.spacing(2),
  },
}));

const Form = () => {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [urlError, setUrlError] = useState("");

  const createUrl = () => {
    axios
      .post(`${REACT_APP_API_SERVER_URL}/url`, { originalUrl: url })
      .then((res) => {
        if (res.status === 200) {
          setUrlError("");
          setShortenedUrl(res.data.url);
        }
      })
      .catch((err) => {
        setUrlError("Invalid URL");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createUrl();
  };

  const classes = useStyles();

  return (
    <div className="container mt-4">
      <h1 className="display-5 text-center mb-4">URL Shortener</h1>
      <form onSubmit={handleSubmit} className={classes.spacing}>
        <TextField
          onChange={(e) => setUrl(e.target.value)}
          required
          id="filled-required"
          label="Original URL"
          defaultValue=""
          variant="filled"
          helperText={urlError}
          error={urlError}
        />

        <Button
          variant="secondary"
          className={classes.blueButton}
          type="submit"
        >
          Shorten
        </Button>
      </form>
      {!urlError && shortenedUrl && (
        <div className={classes.message}>
          Shortened URL:{" "}
          <a href={shortenedUrl} target="_blank" rel="noreferrer">
            {shortenedUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default Form;
