import { useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProject } from "../actions/campaigns";
import DummyRender from "../components/DummyRender";
import ProjectDetails from "../components/ProjectDetails";

const Project = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  //const { project, isLoading } = useSelector((state) => state.campaigns);

  const project = true
  const isLoading = false
  
  useEffect(() => {
    if (id) {
      dispatch(fetchProject(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return isLoading || !project ? (
    <p>Loading...</p>
  ) : (
    <div>
      <h1>Project details</h1>
     {/* <DummyRender data={project} />*/}
      <ProjectDetails />
    </div>
  );
};

export default Project;
