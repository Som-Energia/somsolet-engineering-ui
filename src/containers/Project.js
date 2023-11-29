import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProject } from "../actions/campaigns";
import ProjectDetails from "../components/ProjectDetails";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import { useTranslation } from "react-i18next";
import ContactDialog from "../containers/Dialogs/ContactDialog";
import IncidenceDialog from "./Dialogs/IncidenceDialog";
import { sendContact, sendIncidence } from "../utils/api";
import FloatButton from "../components/FloatButton";

const Project = () => {
  const [openContact, setOpenContact] = useState(false);
  const [openIncidence, setOpenIncidence] = useState(false)
  const [isSending, setSending] = useState(false);

  const { id } = useParams();
  const {t} = useTranslation()
  const dispatch = useDispatch();

  //const { project, isLoading } = useSelector((state) => state.campaigns);

  const actions = [
    {
      name: t("CONTACT_INSTALL"),
      icon: <MailOutlinedIcon fontSize="small" />,
      click: () => setOpenContact(true),
    },
    {
      name: t("NOTIFY_INCIDENCE"),
      icon: <ReportProblemOutlinedIcon fontSize="small" />,
      click: () => setOpenIncidence(true),
    },
  ];

  const handleSendContact = async (data) => {
    try {
      setSending(true);
      await sendContact(data);
    } catch (error) {
      // report error
      console.error(error);
    }
    setSending(false);
    setOpenContact(false);
  };

  const handleSendIncidence = async (data) => {
    try {
      setSending(true)
      await sendIncidence(data)
    } catch (error) {
      // report error
      console.error(error)
    }
    setSending(false)
    setOpenIncidence(false)
  }

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
      <FloatButton actions={actions}/>
      <ContactDialog
        open={openContact}
        handleClose={() => setOpenContact(false)}
        isSending={isSending}
        handleSend={handleSendContact}
      />
       <IncidenceDialog
          open={openIncidence}
          handleClose={() => setOpenIncidence(false)}
          isSending={isSending}
          handleSend={handleSendIncidence}
        />
    </div>
  );
};

export default Project;
