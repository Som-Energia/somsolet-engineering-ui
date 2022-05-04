import { useSelector } from "react-redux";
import DummyRender from "../components/DummyRender";

const Profile = () => {
  const { user, language } = useSelector((state) => state.auth);

  return (
    <div>
      <h1>Profile</h1>
      <div>
        <DummyRender data={user} />
      </div>
    </div>
  );
};

export default Profile;
