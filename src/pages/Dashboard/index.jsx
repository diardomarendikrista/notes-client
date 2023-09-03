import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Wrapper, TitleWrapper, ButtonWrapper, SelectWrapper } from "./styles";
import { Helmet } from "react-helmet-async";
import { BsFillPlusSquareFill, BsSearch, BsGrid } from "react-icons/bs";
import Loader from "components/Loader/Loader";
import MainCard from "components/MainCard";
import { fetchNotes, searchNoteAsync } from "store/actions/note";
import { fetchProfile } from "store/actions/user";

export default function Note() {
  const { profile } = useSelector((state) => state.user);
  const { loadingGlobal } = useSelector((state) => state.global);
  const { notes, loadingNote } = useSelector((state) => state.note);

  const [search, setSearch] = useState("");
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [settingView, setSettingView] = useState(
    localStorage.getItem("setting_view") ?? "1"
  );

  const navigate = useNavigate();
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
    navigate("notes/add");
  };

  const addTodo = () => {
    navigate("todo/add");
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

  // check local storage
  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/");
    } else {
      // load notes
      if (!notes) dispatch(fetchNotes());
      if (!profile) dispatch(fetchProfile());
    }

    if (localStorage.getItem("setting_view")) {
      setSettingView(localStorage.getItem("setting_view"));
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

  window.addEventListener("scroll", () => {
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
          <TitleWrapper>
            <div>
              <h3>{profile.name}`s note</h3>
            </div>
            <ButtonWrapper>
              <button
                onClick={() => addNote()}
                className="btn btn-primary w-100"
              >
                <BsFillPlusSquareFill /> new note
              </button>
            </ButtonWrapper>
            <ButtonWrapper>
              <button
                onClick={() => addTodo()}
                className="btn btn-warning w-100"
              >
                <BsFillPlusSquareFill /> new todo
              </button>
            </ButtonWrapper>
          </TitleWrapper>
          <form onSubmit={(e) => handleSearch(e)} id="search-box">
            <div className="d-flex my-2">
              <input
                type="search"
                className="form-control search-input"
                id="exampleInputEmail1"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit" className="btn btn-info pt-0 search-button">
                <BsSearch />
              </button>
            </div>
          </form>
          <div className="d-flex justify-content-end">
            <SelectWrapper className="mb-2">
              <div className="grid">
                <BsGrid />
              </div>
              <select
                className="form-select"
                id="inputGroupSelect01"
                value={settingView}
                onChange={(e) => {
                  setSettingView(e.target.value);
                  localStorage.setItem("setting_view", e.target.value);
                }}
              >
                <option value="3">3 lines</option>
                <option value="2">2 lines</option>
                <option value="1">1 line</option>
              </select>
            </SelectWrapper>
          </div>
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
                notes.map((note, i) => (
                  <MainCard note={note} key={i} view={settingView} />
                ))
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
