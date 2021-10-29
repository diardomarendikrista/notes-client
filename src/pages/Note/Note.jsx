import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Wrapper } from "./styles";
import { Helmet } from "react-helmet-async";
import { BsFillPlusSquareFill, BsSearch } from "react-icons/bs";
import Loader from "components/Loader/Loader";
import CardNote from "components/CardNote";
import { fetchNotes, searchNoteAsync } from "store/actions/note";
import { fetchProfile } from "store/actions/user";

export default function Note() {
  const { profile } = useSelector((state) => state.user);
  const { loadingGlobal } = useSelector((state) => state.global);
  const { notes, loadingNote } = useSelector((state) => state.note);

  const [search, setSearch] = useState("");
  const [isSearchMode, setIsSearchMode] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search) {
      setIsSearchMode(true);
      dispatch(searchNoteAsync(search));
    } else {
      dispatch(fetchNotes());
    }
  };

  const addNote = () => {
    history.push("/notes/add");
  };

  const noNote = () => {
    return (
      <div className="div-no-note">
        <h3>No notes yet</h3>
        <p>tap on the +New Note to create new note</p>
      </div>
    );
  };

  const noSearch = () => {
    return (
      <div className="div-no-note">
        <h3>No notes with that keyword</h3>
        <p>Clear the searchbox or search another keyword</p>
      </div>
    );
  };

  useEffect(() => {
    // check local storage
    if (!localStorage.getItem("access_token")) {
      history.push("/");
    } else {
      // load notes
      if (!notes) dispatch(fetchNotes());
      if (!profile) dispatch(fetchProfile());
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSearchMode && !search) {
      dispatch(fetchNotes());
      setIsSearchMode(false);
    }
    // eslint-disable-next-line
  }, [search]);

  window.addEventListener("scroll", (event) => {
    let targetSticky = document.getElementById("search-box");
    let limitStickyTop = document.getElementById("search-box-limit-top");
    let stickyTop = limitStickyTop && limitStickyTop.offsetTop;

    if (targetSticky) {
      // console.log(window.pageYOffset - 100, "offset");
      // console.log(stickyTop, "sticky");
      if (window.pageYOffset - 100 >= stickyTop) {
        targetSticky.classList.add("sticky");
      } else {
        targetSticky.classList.remove("sticky");
      }
    }
  });

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Note - Petek Note App</title>
        <link rel="Note app" href="" />
      </Helmet>

      {!loadingGlobal ? (
        <Wrapper>
          <div className="d-lg-flex justify-content-center mt-3">
            <div>
              <h3>{profile.name}'s note</h3>
            </div>
            <div id="search-box-limit-top">
              <button
                onClick={() => addNote()}
                className="btn btn-primary ms-lg-2 ms-sm-1 w-100"
              >
                <BsFillPlusSquareFill /> new note
              </button>
            </div>
          </div>
          <form onSubmit={(e) => handleSearch(e)} id="search-box">
            <div className="d-flex my-2">
              <input
                type="search"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit" className="btn btn-info pt-0">
                <BsSearch />
              </button>
            </div>
          </form>
          <div className="d-flex flex-wrap justify-content-center">
            {!loadingNote ? (
              notes.length < 1 ? (
                isSearchMode ? (
                  noSearch()
                ) : (
                  noNote()
                )
              ) : (
                notes &&
                notes.map((note) => <CardNote note={note} key={note.id} />)
              )
            ) : (
              <Loader />
            )}
          </div>
        </Wrapper>
      ) : (
        <Loader />
      )}
    </div>
  );
}
