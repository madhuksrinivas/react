import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchUsersByEMail = (emailId) =>
  axios.get(`http://localhost:4000/users/${emailId}`).then((res) => res.data);

const fetchCoursesByChannelId = (channelId) =>
  axios
    .get(`http://localhost:4000/channels/${channelId}`)
    .then((res) => res.data);

function RQDependentQueriesPage({ emailId }) {
  const { data: user } = useQuery({
    queryKey: ["user", emailId],
    queryFn: () => fetchUsersByEMail(emailId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const channelId = user?.channelId;
  const { data: courses } = useQuery({
    queryKey: ["courses", channelId],
    queryFn: () => fetchCoursesByChannelId(channelId),
    enabled: !!channelId, // only run this query if channelId is available
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  console.log("user", user);
  console.log("courses", courses);

  return (
    <div>
      <h2>RQDependentQueries</h2>
      <div>
        <h3>User - {user?.id}</h3>
        <h3>Channel - {user?.channelId}</h3>
        <h3>Courses:</h3>
        <ul>
          {courses?.courses.map((course) => (
            <li key={course}>{course}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RQDependentQueriesPage;
