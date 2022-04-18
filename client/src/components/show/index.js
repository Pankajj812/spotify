import {
  Box,
  Grid,
  IconButton,
  Paper,
  styled,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { albumsSelector } from "../../store/Albums/selector";
import "./styles.css";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { fetchAlbums, playPauseSong } from "../../store/Albums/actions";
import InfiniteScroll from "react-infinite-scroll-component";
import queryString from "query-string";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  minHeight: "329px",
  color: theme.palette.text.secondary,
}));

function millisToMinutesAndSeconds(millis) {
  let minutes = Math.floor(millis / 60000);
  let seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function Show() {
  const albums = useSelector(albumsSelector);
  const dispatch = useDispatch();
  const [offset, setoffset] = useState(0);

  const handlePlayPauseSong = (track) => {
    console.log("Track", track);
    window.open(track?.external_urls?.spotify, "_blank");
  };

  useEffect(() => {
    const queryParams = queryString.parse(albums?.tracks?.next.split("?")[1]);
    console.log("Query", queryParams);
    setoffset(queryParams?.offset || 0);
  }, [albums?.tracks]);

  const fetchMore = () => {
    if (albums?.tracks?.items.length === 0) {
      return;
    }
    const queryParams = queryString.parse(albums?.tracks?.next.split("?")[1]);
    dispatch(fetchAlbums(queryParams));
  };

  console.log(offset);
  return (
    <Box
      style={{
        background: "black",
        height: "auto",
        padding: "4%",
        paddingTop: "3%",
      }}
    >
      <InfiniteScroll
        dataLength={offset + 20}
        next={fetchMore}
        hasMore={albums?.items?.length === 0 ? false : true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Grid container spacing={2}>
          {albums?.items?.map((track, index) => (
            <Grid key={index * 20} item xs={3}>
              <Item className="item">
                <img
                  src={track.album.images?.[0].url}
                  height={200}
                  width={250}
                />
                <Typography>Name: {track?.album?.name}</Typography>
                <Typography>
                  Song Duration: {millisToMinutesAndSeconds(track?.duration_ms)}
                </Typography>
                <IconButton onClick={() => handlePlayPauseSong(track)}>
                  Play on Spotify
                  <PlayCircleOutlineIcon />
                </IconButton>
                {/* <PauseCircleOutlineIcon /> */}
              </Item>
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </Box>
  );
}

export default Show;
