import { Avatar } from "native-base";

import { VerticalTimelineElement } from "react-vertical-timeline-component";
import "../../../styles/style.css";
import { epochToDate } from "../../../utils/epochToDate";
import { truncateString } from "../../../utils/trancare-string";
export const VerticleTimelineElement = ({ data }: { data: any }) => {
  const date = epochToDate(data.date.toString());
  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--work timeline-card"
      date={date}
      dateClassName="date-class"
      contentStyle={{
        background: "white",
        color: "#000",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      }}
      contentArrowStyle={{ borderRight: "7px solid" }}
      iconStyle={{
        background: "rgb(109, 40, 217)",
        color: "#fff",
        borderColor: "black",
      }}
      icon={
        <Avatar
          size={10}
          source={{
            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          }}
        ></Avatar>
      }
    >
      <h3 className="vertical-timeline-element-title">{data.name}</h3>
      <h4 className="vertical-timeline-element-subtitle">{data.type}</h4>
      <p>email: {data.email}</p>
      <a className="link" style={{ color: "black" }} href="#">
        #{truncateString(data.id_)}
      </a>
    </VerticalTimelineElement>
  );
};
