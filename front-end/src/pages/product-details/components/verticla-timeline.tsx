import { Box } from "native-base";

import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import { VerticleTimelineElement } from "./verticle-timeline-element";

export const VerticleTimeline = ({
  productHistory,
}: {
  productHistory: any;
}) => {
  return (
    <Box width="100%" mt={4}>
      <VerticalTimeline lineColor="black" layout="1-column">
        {productHistory &&
          productHistory.map((data: any) => (
            <VerticleTimelineElement data={data} key={data.id} />
          ))}
      </VerticalTimeline>
    </Box>
  );
};
