import "./settings.scss";
import Sidebar from "../../components/SideBar";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { useState } from "react";
import axios from "axios";

function Settings() {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const publicFolder = process.env.REACT_APP_SERVER_URL + "/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START", payload: user });
    const updatedUser = {
      userId: user._id,
      username: username,
      email: email,
      password: password,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      updatedUser.profilePic = fileName;
      try {
        await axios.post(
          process.env.REACT_APP_SERVER_URL + "/api/upload",
          data
        );
        setSuccess(true);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.put(
        process.env.REACT_APP_SERVER_URL + "/api/users/" + user._id,
        updatedUser
      );
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE", payload: user });
    }
  };
  const handleDelete = async () => {
    try {
      await axios
        .delete(process.env.REACT_APP_SERVER_URL + "/api/users/" + user._id)
        .then((res) => console.log(res.data))
        .then(dispatch({ type: "LOGOUT" }));
    } catch (err) {
      console.log("Cannot Delete an Account");
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="updateTitle">Update your account</span>
          <span className="deleteTitle" onClick={handleDelete}>
            Delete account
          </span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="profile">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : publicFolder + user.profilePic
              }
              alt=""
            />
            <label htmlFor="fileInput">
              <i>+</i>
            </label>
            <input
              type="file"
              id="fileInput"
              hidden
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {success && (
            <p
              style={{
                marginTop: "20px",
                textAlign: "center",
                fontSize: "20px",
              }}
            >
              User updated succesfully!
            </p>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}

export default Settings;
