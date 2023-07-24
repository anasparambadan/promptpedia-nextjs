"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const myProfile = () => {
  const {data:session} = useSession()
  const [posts, setPosts] = useState([])

    const handleEdit = ()=>{

    }
    const handleDelete = ()=>{

    }
    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();
          console.log(data, "data");
          setPosts(data);
        };
        if(session?.user.id) fetchPosts();
      }, []);
    
  return (
    <Profile
      name="My profile"
      desc="welcome to profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default myProfile;
